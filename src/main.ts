import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function boombaby() {
  const app = await NestFactory.create(AppModule);
   app.enableCors();
  await app.listen(3030);
}
boombaby();
