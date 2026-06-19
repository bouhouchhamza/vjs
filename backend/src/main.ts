import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NextFunction, Request, Response } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const requestCounts = new Map<string, { count: number; resetAt: number }>();

  app.use((_request: Request, response: Response, next: NextFunction) => {
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('X-Frame-Options', 'DENY');
    response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    response.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    next();
  });

  app.use((request: Request, response: Response, next: NextFunction) => {
    const key = request.ip ?? 'unknown';
    const now = Date.now();
    const bucket = requestCounts.get(key);

    if (!bucket || bucket.resetAt <= now) {
      requestCounts.set(key, { count: 1, resetAt: now + 60_000 });
      next();
      return;
    }

    bucket.count += 1;
    if (bucket.count > Number(process.env.RATE_LIMIT_PER_MINUTE ?? 120)) {
      response.status(429).json({ message: 'Too many requests' });
      return;
    }

    next();
  });

  app.setGlobalPrefix('api');
  app.enableCors({
    origin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
    credentials: true
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );
  await app.listen(Number(process.env.PORT ?? 3000));
}

void bootstrap();
