const { test, expect, beforeAll } = require("@jest/globals");
const repository = require("./repository");

let _patientID = null;

beforeAll(async () => {
  const _patients = await repository.getAllPatients();
  _patientID = _patients[0]._id;
});

test("getAllPatients", async () => {
  const _patients = await repository.getAllPatients();
  expect(Array.isArray(_patients)).toBeTruthy();
  expect(_patients.length).toBeTruthy();
});

test("getPatientByID", async () => {
  const _patient = await repository.getPatientByID(_patientID);
  expect(_patient).toBeTruthy();
});

test("addPatient", async () => {
  const patient = {
    nome: "Patient Test",
    cpf: "222.222.222-22",
    celular: "(22) 22222-2222)",
    email: "patient@teste.com",
    sexo: "Indefinido",
    dt_nasc: new Date() 
  };

  let result;

  try {
    result = await repository.addPatient(patient);
    expect(result).toBeTruthy();
  } finally {
    if (result) await repository.deletePatient(result._id);
  }
});

test("deletePatient", async () => {
  const patient = {
    nome: "Patient Test",
    cpf: "222.222.222-22",
    celular: "(22) 22222-2222)",
    email: "patient@teste.com",
    sexo: "Indefinido",
    dt_nasc: new Date()
  };

  const result = await repository.addPatient(patient);
  const result2 = await repository.deletePatient(result._id);
  expect(result2).toBeTruthy();
});
