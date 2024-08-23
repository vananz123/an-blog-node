'use strict';
import { ConnectOptions, Error } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';
import { connectStringDbCloud } from '@/configs/mongodb.config';
const clientOptions: ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
class Database {
  constructor() {
    this.connect();
  }
  async connect(type = 'mongodb') {
    if (1 == 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }
    await mongoose
      .connect(connectStringDbCloud, clientOptions)
      .then(() => console.log('Connention succesed'))
      .catch((err: Error) => {
        console.log('err');
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
