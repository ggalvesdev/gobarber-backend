import { Router } from "express";
import { parseISO } from "date-fns";
import { getCustomRepository } from "typeorm";
import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

import ensureAuthenticated  from "../middlewares/ensureAuthenticated";

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get("/", async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  
  const appointments = await appointmentsRepository.find();
  
  response.json(appointments);
});

appointmentsRouter.post("/", async (request, response) => {
    const { provider_id, date } = request.body;
    
    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const newAppointment = await createAppointment.execute({
      date: parsedDate,
      provider_id,
    });

    response.json(newAppointment);    
});

export default appointmentsRouter;
