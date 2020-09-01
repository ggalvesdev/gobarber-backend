import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import { getCustomRepository } from "typeorm";

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({ date, provider }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const appInTheSameDate = await appointmentsRepository.findByDate(appointmentDate);
    if (appInTheSameDate) {
      throw Error("Appointment duplicated");
    }

    const newAppointment = appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    await appointmentsRepository.save(newAppointment);
    
    return newAppointment;
  }
}

export default CreateAppointmentService;
