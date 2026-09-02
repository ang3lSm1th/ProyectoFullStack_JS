'use client';

import { useEffect, useState } from 'react';
import { ApiRequestError } from '@/models/httpClient';
import { createLead } from '@/models/contactApi';
import {
  formatCooldownRemaining,
  getContactSubmitLockedUntil,
  setContactSubmitLock,
} from '@/shared/contactSubmitLock';

type FormState = {
  name: string;
  email: string;
  message: string;
};

const initialForm: FormState = {
  name: '',
  email: '',
  message: '',
};

export function useContactFormVM() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [lockedUntil, setLockedUntil] = useState<number | null>(() =>
    getContactSubmitLockedUntil(),
  );

  useEffect(() => {
    if (!lockedUntil) return;

    const tick = () => {
      const next = getContactSubmitLockedUntil();
      setLockedUntil(next);
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [lockedUntil]);

  const isLocked = lockedUntil !== null;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    if (isLocked || isSubmitting) return;
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
    setSuccess(false);
  }

  async function submit() {
    if (isSubmitting || isLocked) return;

    const activeLock = getContactSubmitLockedUntil();
    if (activeLock) {
      setLockedUntil(activeLock);
      setError(
        `Espera ${formatCooldownRemaining(activeLock)} antes de enviar otro mensaje.`,
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await createLead(form);
      setForm(initialForm);
      setSuccess(true);
      setContactSubmitLock();
      setLockedUntil(getContactSubmitLockedUntil());
    } catch (err) {
      if (err instanceof ApiRequestError && err.status === 429) {
        setContactSubmitLock();
        setLockedUntil(getContactSubmitLockedUntil());
        setError(err.message);
      } else {
        setError('No se pudo enviar el mensaje. Intenta de nuevo en un momento.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    form,
    isSubmitting,
    isLocked,
    cooldownLabel:
      lockedUntil !== null ? formatCooldownRemaining(lockedUntil) : null,
    error,
    success,
    updateField,
    submit,
  };
}
