const { test, expect, beforeAll, afterAll } = require("@jest/globals");
const server = require("../lib/infra/server/server");
const patients = require("../lib/interfaces/routes/patients");
const request = require("supertest");
const repositoryMock = require("../__mocks__/repository");

let app = null;

beforeAll(async () => {
  process.env.PORT = 4003;
  app = await server.start(patients, repositoryMock);
});

afterAll(async () => {
  await server.stop();
});

test("GET /patients", async () => {
  const response = await request(app).get("/patients");
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toBeTruthy();
});

test("GET /patients/:id", async () => {
  const _patientID = "-1";
  const response = await request(app).get(`/patients/${_patientID}`);
  expect(response.status).toEqual(404);
});

test("POST /patients", async () => {
  const patient = {
    nome: "Patient Test",
    cpf: "222.222.222-22",
    celular: "(22) 22222-2222)",
    email: "patient@teste.com",
    sexo: "Indefinido",
    dt_nasc: new Date()
  };

  const response = await request(app)
    .post("/patients/")
    .set("Content-Type", "application/json")
    .send(patient);

  expect(response.status).toEqual(201);
  expect(response.body).toBeTruthy();
});

test("DELETE /patients/:id", async () => {
  const response = await request(app).delete("/patients/1");
  expect(response.status).toEqual(204);
});
