import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as path from 'path';
import * as cors from 'cors';
import { env } from './Environments/Env';
import Routes from './Routes/Routes';
import { ErrorHandler } from './Helpers/ErrorHandler';
import AuthController from './Controllers/Admin/AuthController';

export class Server {
  public app: express.Application = express();

  constructor() {
    console.log('environment', process.env.NODE_ENV);
    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigurations() {
    this.setMongodb();
    this.enableCors();
    this.configBodyParser();
  }



  setMongodb() {
    mongoose.connect(env().dbUrl, {
    }).then(() => {
      console.log("Database connected");
      this.createAdmin();
    }).catch((e) => {
      console.log(e);
      console.log('failed');
    })
  }

  async createAdmin() {
    await AuthController.createAdmin();
  }

  enableCors() {
    this.app.use(
      cors({
        origin: true,
        credentials: true
      })
    );
  }

  configBodyParser() {
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(express.json({ limit: '10mb' }));
  }

  setRoutes() {
    // this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use((req: any, res, next) => {
      req.startTime = new Date().getTime();
      console.log(`Api ==> ${req.url}  ${req.method}`);
      console.log('request-body', req.body);
      next();
    });
    this.app.use('/api-doc', (req,res, next) => {
      res.sendFile(path.resolve(process.cwd()+'/assets/Apidoc/index.html'));
    });

    this.app.use('/api', Routes)
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: 'Route not found',
        status: 404
      });
    })
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      ErrorHandler.globalErrorHandler(error, req, res, next);
    });
  }
}