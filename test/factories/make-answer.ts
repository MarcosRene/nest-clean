import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { PrismaAnswerMapper } from '@/infra/database/mappers/prisma-answer-mapper'
import { PrismaService } from '@/infra/database/prisma/prima.service'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityID,
) {
  const answer = Answer.create(
    {
      content: faker.lorem.text(),
      questionId: new UniqueEntityID(),
      authorId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return answer
}

@Injectable()
export class AnswerFactory {
  constructor(private prismaService: PrismaService) {}

  async makePrismaQuestion(data: Partial<AnswerProps> = {}): Promise<Answer> {
    const question = makeAnswer(data)

    await this.prismaService.answer.create({
      data: PrismaAnswerMapper.toPersistence(question),
    })

    return question
  }
}
