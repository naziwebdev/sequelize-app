module.exports = {
  db: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
    uri: process.env.DB_URI,
    poolSize: process.env.DB_POOL_SIZE,
  },

  port: parseInt(process.env.PORT) || 4007,

  auth: {
    accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
    refreshTokenAccessKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    accessTokenExpireIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refreshTokenExpireIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
  redis: {
    uri: process.env.REDIS_URI,
  },
  domin: process.env.DOMIN,
  isProduction: process.env.NODE_ENV === "production",
};
