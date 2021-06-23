const doctors = require("./lib/interfaces/routes/doctors");
const repository = require("./lib/interfaces/controllers/repository");
const server = require("./lib/infra/server/server");

(async () => {
  try {
    await server.start(doctors, repository);
  } catch (error) {
    console.error(error);
  }
})();
