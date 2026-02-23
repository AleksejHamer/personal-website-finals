import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS so your React frontend doesn't get blocked
  app.enableCors(); 

  // Use the port Render assigns, or 3000 as a backup
  await app.listen(process.env.PORT || 3000);
}
bootstrap();