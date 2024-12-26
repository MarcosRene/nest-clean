import { Module } from '@nestjs/common'

import { EnvService } from './env.server'

@Module({
  providers: [EnvService],
  exports: [EnvService],
})
export class EnvModule {}
