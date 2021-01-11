export default () => ({
  ENVIROMENT: process.env.NODE_ENV,
  port: parseInt(process.env.PORT, 10) || 3000,
  JWT_SECRET: process.env.jwt,
  EMAIL_TRANSPORT: process.env.email_transport,
  DB_CONFIGURATION: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
