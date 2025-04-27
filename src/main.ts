import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AllExceptionsFilter } from './core/filters/all-exceptions.filter';
import { AppModule } from './app.module';
import env from '@config/index';

async function bootstrap() {
  const port = env.PORT;
  const logger = new Logger('MainApplication');

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.getHttpAdapter().getInstance().disable('x-powered-by');

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(port);
  logger.log(`🚀 Application is running on PORT:${port}🚀`);
}
bootstrap();
