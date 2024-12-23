import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { PrismaService } from '@/prisma/prima.service'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
})

type CreateAccountBody = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  @HttpCode(201)
  async handle(@Body() body: CreateAccountBody) {
    const { name, email, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with this e-mail address already exists',
      )
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
