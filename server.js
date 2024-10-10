const { db } = require("./db");
const app = require("./app");
const configs = require("./configs");
const redis = require("./redis");

async function startServer() {
  try {
    await db.authenticate();
    await redis.ping();

    app.listen(configs.port, () => {
      console.log(`Server running on port ${configs.port}`);
    });
  } catch (error) {
    console.log(error);
    await db.close();
    await redis.disconnect();
  }
}

startServer();
