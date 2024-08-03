"use strict";
import { Error } from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
import mongoose from "mongoose";
import config from '../configs/config.mongodb'

const connectString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;
class Database {
  constructor() {
    this.connect();
  }
  async connect(type = "mongodb") {
    if (1 == 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }
    await mongoose
      .connect(connectString)
      .then(() => console.log("Connention succesed"))
      .catch((err: Error) => {
        console.log("err");
      });
  }
  static instance: Database | undefined;
  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}
const instanceMongodb = Database.getInstance();
export default instanceMongodb;
