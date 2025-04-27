export const ConfigEnvs = {
  postgres: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
  asaas: {
    API_URL: process.env.ASAAS_API_URL,
    API_TOKEN: process.env.ASAAS_API_TOKEN,
    ASAAS_API_WALLET_ID: process.env.ASAAS_API_WALLET_ID,
  },
};
