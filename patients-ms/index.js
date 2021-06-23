const patients = require("./src/api/patients");
const repository = require("./src/repository/repository");
const server = require("./src/server/server");

(async () => {
  try {
    await server.start(patients, repository);
  } catch (error) {
    console.error(error);
  }
})();
