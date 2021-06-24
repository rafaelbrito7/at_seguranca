const Patient = require("../../domain/Patient");

module.exports = (app, repository) => {
  app.get("/patients", async (req, res, next) => {
    const _patients = await repository.getAllPatients();
    res.json(_patients);
  });

  app.get("/patients/:id", async (req, res, next) => {
    const _patient = await repository.getPatientByID(req.params.id);
    if (!_patient) return res.sendStatus(404);

    res.json(_patient);
  });

  app.post("/patients", async (req, res, next) => {
    const { name, cpf, cell, email, gender } = req.body;
    const birthDate = new Date();

    const patientDb = new Patient(name, cpf, cell, email, gender, birthDate)

    const result = await repository.addPatient(patientDb);
    res.status(201).json(result);
  });

  app.delete("/patients/:id", async (req, res, next) => {
    const id = req.params.id;
    await repository.deletePatient(id);
    res.sendStatus(204);
  });
};
