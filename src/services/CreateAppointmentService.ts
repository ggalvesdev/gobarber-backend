import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    if (this.appointmentsRepository.findByDate(appointmentDate)) {
      throw Error("Appointment duplicated");
    }

    const newAppointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
