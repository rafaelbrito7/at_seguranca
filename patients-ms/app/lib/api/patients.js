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
    const name = req.body.name;
    const cpf = req.body.cpf;
    const cell = req.body.cell;
    const email = req.body.email;
    const sexo = req.body.sexo;
    const dt_nasc = new Date();

    const result = await repository.addPatient({
      name,
      cpf,
      cell,
      email,
      sexo,
      dt_nasc
    });
    res.status(201).json(result);
  });

  app.delete("/patients/:id", async (req, res, next) => {
    const id = req.params.id;
    await repository.deletePatient(id);
    res.sendStatus(204);
  });
};
