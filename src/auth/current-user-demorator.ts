import { createParamDecorator, type ExecutionContext } from '@nestjs/common'
import type { UserPayload } from './jwt.strategy'

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.user as UserPayload
  },
)
