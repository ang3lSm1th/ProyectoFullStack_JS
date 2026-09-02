'use client';

import { useContactFormVM } from '@/viewmodels/useContactFormVM';

export function ContactSection() {
  const {
    form,
    isSubmitting,
    isLocked,
    cooldownLabel,
    error,
    success,
    updateField,
    submit,
  } = useContactFormVM();

  const formDisabled = isSubmitting || isLocked;

  return (
    <section id="contacto" className="scroll-mt-20 py-20 md:py-[var(--spacing-section)]">
      <div className="mx-auto grid w-full max-w-[var(--max-width-container)] gap-12 px-6 sm:px-10 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="label-caps text-primary">Contacto</p>
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            ¿Construimos algo juntos?
          </h2>
          <p className="leading-relaxed text-on-surface-variant">
            Cuéntame tu idea de web, software o datos. Te respondo con una propuesta
            clara y un plan técnico concreto.
          </p>
        </div>

        <form
          className="card-surface space-y-4 p-6 md:p-8"
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
        >
          <label className="block space-y-2 text-sm">
            <span className="label-caps text-on-surface-variant">Nombre</span>
            <input
              required
              minLength={2}
              disabled={formDisabled}
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              className="input-field disabled:cursor-not-allowed disabled:opacity-60"
              autoComplete="name"
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="label-caps text-on-surface-variant">Email</span>
            <input
              required
              type="email"
              disabled={formDisabled}
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              className="input-field disabled:cursor-not-allowed disabled:opacity-60"
              autoComplete="email"
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span className="label-caps text-on-surface-variant">Mensaje</span>
            <textarea
              required
              minLength={10}
              rows={5}
              disabled={formDisabled}
              value={form.message}
              onChange={(e) => updateField('message', e.target.value)}
              className="input-field resize-y disabled:cursor-not-allowed disabled:opacity-60"
            />
          </label>

          <button
            type="submit"
            disabled={formDisabled}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {isSubmitting
              ? 'Enviando…'
              : isLocked
                ? `Disponible en ${cooldownLabel}`
                : 'Enviar mensaje'}
          </button>

          {isLocked && !error ? (
            <p className="text-sm text-on-surface-variant">
              Para evitar envíos repetidos, espera {cooldownLabel} antes de contactar
              de nuevo.
            </p>
          ) : null}

          {error ? <p className="text-sm text-[#ffb4ab]">{error}</p> : null}
          {success ? (
            <p className="text-sm text-primary-container">
              Mensaje enviado. Revisaré tu solicitud pronto.
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
