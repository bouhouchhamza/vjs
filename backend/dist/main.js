"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const requestCounts = new Map();
    app.use((_request, response, next) => {
        response.setHeader('X-Content-Type-Options', 'nosniff');
        response.setHeader('X-Frame-Options', 'DENY');
        response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        response.setHeader('Cross-Origin-Resource-Policy', 'same-site');
        next();
    });
    app.use((request, response, next) => {
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
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    await app.listen(Number(process.env.PORT ?? 3000));
}
void bootstrap();
//# sourceMappingURL=main.js.map