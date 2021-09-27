import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 app.setGlobalPrefix('api');
 app.enableCors({
   origin:'http://localhost:4200'
 });
  await app.listen(3000);
// const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
//   transport: Transport.RMQ,
//   options: {
//     urls: ['amqps://vmuskxok:o--6edpKj21EjKwWbRsBwDoiFcnyUErx@snake.rmq2.cloudamqp.com/vmuskxok'],
//     queue: 'main_queue',
//     queueOptions: {
//       durable: false
//     },
//   },
// });
// console.log("microservices")
}

bootstrap();
