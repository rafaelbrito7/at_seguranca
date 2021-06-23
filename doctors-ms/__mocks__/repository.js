const doctors = [
  {
    _id: "606e09cfd98cdcf90e5e8a7a",
    doctor: "Dr. Teste",
    crm: "230230",
    uf: "TESTING WORLD",
    speciality: "Testing things",
    createdAt: new Date("2020-02-21T00:00:00Z"),
    updatedAt: new Date("2020-02-21T00:00:00Z")
  }
];

function getAllDoctors() {
  return doctors;
}

function getDoctorById(id) {
  if (id == -1) return null;

  doctors[0]._id = id;
  return doctors[0];
}

function addDoctor(doctor) {
  return doctors[0];
}

function deleteDoctor(id) {
  if (!id) throw new Error("Não foi possivel excluir essa atividade!");
  return true;
}

module.exports = {
  getAllDoctors,
  getDoctorById,
  addDoctor,
  deleteDoctor,
};
