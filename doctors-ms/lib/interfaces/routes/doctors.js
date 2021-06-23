module.exports = (app, repository) => {

  app.get("/doctors", async (req, res, next) => {
    const doctors = await repository.getAllDoctors();
    res.json(doctors);
  });

  app.get("/doctors/:id", async (req, res, next) => {
    const doctor = await repository.getDoctorById(req.params.id);
    if (!doctor) return res.sendStatus(404);
    res.json(doctor);
  });

  app.post("/doctors", async (req, res, next) => {
    const name = req.body.name;
    const crm = req.body.crm;
    const uf = req.body.uf;
    const speciality = req.body.speciality;
    const createdAt = req.body.createdAt;
    const updatedAt = req.body.updatedAt;

    const result = await repository.addDoctor({
      name,
      crm,
      uf,
      speciality,
      createdAt,
      updatedAt
    });

    res.status(201).json(result);
  });

  app.delete("/doctors/:id", async (req, res, next) => {
    const id = req.params.id;
    await repository.deleteDoctor(id);
    res.sendStatus(204);
  });
};
