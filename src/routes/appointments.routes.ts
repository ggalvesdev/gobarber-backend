import { Router } from "express";
import { startOfHour, parseISO } from "date-fns";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get("/", (request, response) => {
  response.json(appointmentsRepository.all());
});

appointmentsRouter.post("/", (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));

  if (appointmentsRepository.findByDate(parsedDate)) {
    response.status(400).json({
      message: "Appointment duplicated",
    });
  }

  const newAppointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  response.json(newAppointment);
});

export default appointmentsRouter;
