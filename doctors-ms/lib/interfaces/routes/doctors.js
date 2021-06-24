const Doctor = require('../../domain/Doctor');

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
    const { name, crm, uf, speciality } = req.body;

    const doctorDb = new Doctor(name, crm, uf, speciality)

    const result = await repository.addDoctor({
      doctorDb
    });
    res.status(201).json(result);
  });

  app.delete("/doctors/:id", async (req, res, next) => {
    const id = req.params.id;
    await repository.deleteDoctor(id);
    res.sendStatus(204);
  });
};
