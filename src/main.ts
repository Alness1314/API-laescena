import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  app.setGlobalPrefix('laescena');

  await app.listen(AppModule.port);
  logger.log(`Server running in ${await app.getUrl()}/laescena`);
}
bootstrap();
