const database = require("../../infra/orm/mongoose");
const { ObjectId } = require("mongodb");

const collection = "patients-ms";

async function getAllPatients() {
  const db = await database.connect();
  return db.collection(collection).find().toArray();
}

async function getPatientByID(id) {
  const db = await database.connect();
  return db.collection(collection).findOne({ _id: new ObjectId(id) });
}

async function addPatient(patient) {
  const db = await database.connect();
  const result = await db.collection(collection).insertOne(patient);
  return result.ops[0];
}

async function deletePatient(id) {
  const db = await database.connect();
  return db.collection(collection).deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  getAllPatients,
  getPatientByID,
  addPatient,
  deletePatient,
};
