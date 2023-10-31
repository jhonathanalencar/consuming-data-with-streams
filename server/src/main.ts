import { buildServer } from './server';

async function bootstrap() {
  const { app } = await buildServer();

  await app.listen({
    port: 3001,
    host: '0.0.0.0',
  });
}

bootstrap();
