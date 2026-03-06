import { Injectable } from '@nestjs/common';
import { Incident } from 'src/core/interfaces/incident.interface';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { EmailService } from 'src/email/email.service';
import { generateIncidentEmailTemplate } from './templates/incident-email.template';
// npm run start:dev
@Injectable()
export class IncidentsService {
    constructor(private readonly emailService : EmailService){}

    async createIncident(incident:Incident) : Promise<Boolean>{
        const template = generateIncidentEmailTemplate(incident);
        const options : EmailOptions = {
            to: "devjdfr@gmail.com",
            subject: incident.title,
            html: template
        }
        const result = await this.emailService.sendEmail(options);
        return result;
    }
}
