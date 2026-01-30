import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter(expressApp));
  if (process.env.NODE_ENV === 'production') {
    app.useStaticAssets(join(__dirname, '..', 'client/dist'));
  }
  app.enableCors()
  app.useBodyParser('json', { limit: '50mb' });
  app.useBodyParser('urlencoded', { limit: '50mb', extended: true });
  await app.init()

   return expressApp;
}


module.exports = bootstrap()

