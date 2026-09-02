import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateLeadDto } from './dto/create-lead.dto';

const CONTACT_SUBMIT_COOLDOWN_MS = 15 * 60 * 1000;

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async createLead(dto: CreateLeadDto) {
    const email = dto.email.trim().toLowerCase();
    const cooldownSince = new Date(Date.now() - CONTACT_SUBMIT_COOLDOWN_MS);

    const recentLead = await this.prisma.lead.findFirst({
      where: {
        email,
        createdAt: { gte: cooldownSince },
      },
      select: { id: true },
    });

    if (recentLead) {
      throw new HttpException(
        'Ya recibimos un mensaje reciente con este correo. Intenta de nuevo en unos minutos.',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const lead = await this.prisma.lead.create({
      data: {
        name: dto.name.trim(),
        email,
        message: dto.message.trim(),
        source: 'contact',
      },
      select: {
        id: true,
        createdAt: true,
      },
    });

    return {
      ok: true as const,
      id: lead.id,
      createdAt: lead.createdAt,
    };
  }
}
