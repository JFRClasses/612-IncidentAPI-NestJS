import { Injectable } from '@nestjs/common';
import { Incident } from 'src/core/interfaces/incident.interface';
import { EmailOptions } from 'src/core/interfaces/mail-options.interface';
import { EmailService } from 'src/email/email.service';
// npm run start:dev
@Injectable()
export class IncidentsService {
    constructor(private readonly emailService : EmailService){}

    async createIncident(incident:Incident) : Promise<Boolean>{
        const options : EmailOptions = {
            to: "devjdfr@gmail.com",
            subject: incident.title,
            html: `
                <h1>${incident.title}</h1>
                <p>${incident.description}</p>
                <p>${incident.lat}</p>
                <p>${incident.lon}</p>
                <p>${incident.type}</p>
            `
        }
        const result = await this.emailService.sendEmail(options);
        return result;
    }
}
