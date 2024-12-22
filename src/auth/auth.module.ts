import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: (config: ConfigService<Env, true>) => {
        const privateKey = Buffer.from(config.get('JWT_PRIVATE_KEY'), 'base64')
        const publicKey = Buffer.from(config.get('JWT_PUBLIC_KEY'), 'base64')

        return {
          signOptions: {
            algorithm: 'RS256',
          },
          privateKey,
          publicKey,
        }
      },
    }),
  ],
})
export class AuthModule {}
