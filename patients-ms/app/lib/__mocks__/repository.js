const patients = [
  {
    _id: "606c9f1abb5c011b7ace8f5f",
    nome: "Patient Test",
    cpf: "222.222.222-22",
    celular: "(22) 22222-2222)",
    email: "patient@teste.com",
    sexo: "Indefinido",
    dt_nasc: new Date("2020-02-21T00:00:00Z")
  }
];

function getAllPatients() {
  return patients;
}

function getPatientByID(id) {
  if (id == -1) return null;

  patients[0]._id = id;
  return patients[0];
}

function addPatient(atividade) {
  return patients[0];
}

function deletePatient(id) {
  if (!id) throw new Error("Não foi possivel excluir essa atividade!");
  return true;
}

module.exports = {
  getAllPatients,
  getPatientByID,
  addPatient,
  deletePatient,
};
