import {ConfigAppType} from './type'
import dotenv from 'dotenv'
dotenv.config()
const dev: ConfigAppType = {
  app: {
    port: process.env.DEV_APP_PORT || 3055,
  },
  db: {
    host: process.env.DEV_DB_HOST || "localhost",
    port: process.env.DEV_DB_PORT || 27017,
    name: process.env.DEV_DB_NAME || "blog",
  },
};
const pro: ConfigAppType = {
  app: {
    port: process.env.PRO_APP_PORT || 3000,
  },
  db: {
    host: process.env.PRO_DB_PORT || "localhost",
    port: process.env.PRO_DB_PORT || 27017,
    name: process.env.PRO_DB_PORT || "blog",
  },
};
const config = {dev,pro}
const env= (process.env.NODE_ENV || 'dev') as keyof (typeof config)
export default config[env]