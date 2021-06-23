const { test, expect, beforeAll } = require("@jest/globals");
const repository = require("../lib/interfaces/controllers/repository");

let _doctorID = null;

beforeAll(async () => {
  const _doctors = await repository.getAllDoctors();
  _doctorID = _doctors[0]._id;
});

test("getAllDoctors", async () => {
  const _doctors = await repository.getAllDoctors();
  expect(Array.isArray(_doctors)).toBeTruthy();
  expect(_doctors.length).toBeTruthy();
});

test("getDoctorByID", async () => {
  const _doctor = await repository.getDoctorByID(_doctorID);
  expect(_doctor).toBeTruthy();
});

test("addDoctor", async () => {
  const _doctor = {
    doctor: "Dr. Teste",
    crm: "230230",
    uf: "TESTING WORLD",
    speciality: "Testing things",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  let result;

  try {
    result = await repository.addDoctor(_doctor);
    expect(result).toBeTruthy();
  } finally {
    if (result) await repository.deleteDoctor(result._id);
  }
});

test("deleteDoctor", async () => {
  const _doctor = {
    doctor: "Dr. Teste",
    crm: "230230",
    uf: "TESTING WORLD",
    speciality: "Testing things",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const result = await repository.addDoctor(_doctor);
  const result2 = await repository.deleteDoctor(result._id);
  expect(result2).toBeTruthy();
});
