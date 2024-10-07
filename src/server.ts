import db from "./db";
import app from "./app";
import configs from "./configs";
import redis from "./redis";


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
