import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import request from 'supertest'

import { AppModule } from '@/infra/app.module'
import { PrismaService } from '@/infra/database/prisma/prima.service'

describe('Fetch Recent Questions Controller (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()

    prisma = moduleRef.get(PrismaService)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  it('[GET] /questions', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '12345678',
      },
    })

    const accessToken = jwt.sign({ sub: user.id })

    await prisma.question.createMany({
      data: [
        {
          authorId: user.id,
          title: 'New question',
          content: 'New question content',
          slug: 'new-question',
        },
        {
          authorId: user.id,
          title: 'New question 2',
          content: 'New question 2 content',
          slug: 'new-question-2',
        },
      ],
    })

    const response = await request(app.getHttpServer())
      .get('/questions')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body).toEqual({
      questions: [
        expect.objectContaining({
          title: 'New question',
        }),
        expect.objectContaining({
          title: 'New question 2',
        }),
      ],
    })
  })
})
