import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AuthModule } from './auth/auth.module'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { EventsModule } from './events/events.module'
import { HttpModule } from './http/http.module'

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    HttpModule,
    EnvModule,
    EventsModule,
  ],
})
export class AppModule {}
