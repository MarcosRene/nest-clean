import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { EnvService } from './env/env.server'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const configService = app.get<EnvService>(ConfigService)
  const port = configService.get('PORT')

  await app.listen(port)
}
bootstrap()
