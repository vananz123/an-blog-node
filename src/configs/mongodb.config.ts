import {ConfigAppType} from './type'
import dotenv from 'dotenv'
dotenv.config()
//mongodb+srv://vananz:mn112233@cluster0.blog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
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

export const connectString = `mongodb://${config[env].db.host}:${config[env].db.port}/${config[env].db.name}`;
export const connectStringDbCloud = `mongodb+srv://vananz:mn112233@cluster0.shsiivx.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0`;
export const configDb= config[env]