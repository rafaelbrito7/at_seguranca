const { test, expect, beforeAll, afterAll } = require("@jest/globals");
const server = require("../lib/infra/server/server");
const doctors = require("../lib/interfaces/routes/doctors");
const request = require("supertest");
const repositoryMock = require("../__mocks__/repository");

let app = null;

beforeAll(async () => {
  process.env.PORT = 4007;
  app = await server.start(doctors, repositoryMock);
});

afterAll(async () => {
  await server.stop();
});

test("GET /doctors", async () => {
  const response = await request(app).get("/doctors");
  expect(response.status).toEqual(200);
  expect(Array.isArray(response.body)).toBeTruthy();
  expect(response.body.length).toBeTruthy();
});

test("GET /doctors/:id", async () => {
  const _doctorID = "1";
  const response = await request(app).get(`/doctors/${_doctorID}`);
  expect(response.status).toEqual(200);
  expect(response.body).toBeTruthy();
});

test("POST /doctors", async () => {
  const _doctor = {
    doctor: "Dr. Teste",
    crm: "230230",
    uf: "TESTING WORLD",
    speciality: "Testing things",
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const response = await request(app)
    .post("/doctors")
    .set("Content-Type", "application/json")
    .send(_doctor);

  expect(response.status).toEqual(201);
  expect(response.body).toBeTruthy();
});

test("DELETE /doctors/:id", async () => {
  const response = await request(app).delete("/doctors/1");
  expect(response.status).toEqual(204);
});
