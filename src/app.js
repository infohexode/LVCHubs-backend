import dotenv from 'dotenv';
import express from 'express';
import { urlencoded, json } from "body-parser";
import cors from 'cors';
import path from 'path';
import { promisifyAll } from 'bluebird';
import mongoose from 'mongoose';
import cluster from 'cluster';

import logger from './config/logger';
import testRouter from './test/route';
import userRouter from './user/route';
import myWalletRouter from './myWallet/route';
import activitiesRouter from './activities/route';
import vacationActivitiesRouter from './vacationActivities/route';
import flightActivitiesRouter from './flightActivities/route';
import enlistPartnerRouter from './enlistPartner/route';
import profileRouter from './profile/route';
import loyaltyRewardRouter from './loyaltyReward/route';
import paymentProofRouter from './paymentProof/route';
import savingsWalletRouter from './savingsWallet/route';
import adminWalletRouter from './adminWallet/route';




import userController from './user/controller';

const enviroment = process.argv[2] || 'development'
dotenv.config({
  path: `${__dirname}/config/.env.${enviroment}`,
  node_env: process.argv[2] || 'development'
});
const PORT = process.env.PORT
const SSLPORT = process.env.SSLPORT;

const dbOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
  useUnifiedTopology: true
};

promisifyAll(mongoose);
mongoose.connect(process.env.DB_HOST, dbOptions);
userController.addAdmin();

const app = express();

app.use(cors());
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/static', { dotfiles: 'allow' }));
app.use('/test', testRouter);

app.use('/user', userRouter);



app.use('/myWallet', myWalletRouter);
app.use('/activities', activitiesRouter);
app.use('/vacationActivities',vacationActivitiesRouter);
app.use('/flightActivities',flightActivitiesRouter);
app.use('/enlistPartner' ,enlistPartnerRouter);
app.use('/profile' ,profileRouter);
app.use('/loyaltyReward' ,loyaltyRewardRouter);
app.use('/paymentProof' ,paymentProofRouter);

app.use('/savingsWallet' ,savingsWalletRouter); 
app.use('/adminWallet' ,adminWalletRouter);



app.use((err, req, res, next) => {
  logger.saveError(err.stack);
  return res.status(err.status || err.statusCode || 500).send(err.message);
});

const numCPUs = require('os').cpus().length;
if (cluster.isMaster && process.env.NODE_ENV === 'production') {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  app.listen(PORT, () => {
    console.info(`App listening on port ${PORT}`)
  })
}
