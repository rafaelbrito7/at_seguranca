const database = require("../../infra/orm/mongoose");
const { ObjectId } = require("mongodb");

const collection = "doctors-ms";

async function getAllDoctors() {
  const db = await database.connect();
  return db.collection("doctors-ms").find().toArray();
}

async function getDoctorByID(id) {
  const db = await database.connect();
  return db.collection(collection).findOne({ _id: new ObjectId(id) });
}

async function addDoctor(doctor) {
  const db = await database.connect();
  const result = await db.collection(collection).insertOne(doctor);

  return result.ops[0];
}

async function deleteDoctor(id) {
  const db = await database.connect();
  return db.collection(collection).deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  getAllDoctors,
  getDoctorByID,
  addDoctor,
  deleteDoctor,
};
