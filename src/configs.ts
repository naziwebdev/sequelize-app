export default {
    db: {
      uri:process.env.DB_URI,
      poolSize: process.env.DB_POOL_SIZE,
    },
  
    port: parseInt(process.env.PORT as any) || 4007,
  
    auth: {
      accessTokenSecretKey: process.env.ACCESS_TOKEN_SECRET_KEY,
      refreshTokenAccessKey: process.env.REFRESH_TOKEN_SECRET_KEY,
      accessTokenExpireIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
      refreshTokenExpireIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    },
    google:{},
    redis:{},
    domin:process.env.DOMIN,
    isProduction : process.env.NODE_ENV === 'production' 
  };
  