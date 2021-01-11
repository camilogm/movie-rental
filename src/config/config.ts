export default () => ({
  ENVIROMENT: process.env.NODE_ENV,
  port: Number(process.env.PORT) || 3000,
  JWT_SECRET: process.env.jwt,
  EMAIL_TRANSPORT: process.env.email_transport,
  DB_CONFIGURATION: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
