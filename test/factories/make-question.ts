import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'
import { PrismaQuestionMapper } from '@/infra/database/mappers/prisma-question-mapper'
import { PrismaService } from '@/infra/database/prisma/prima.service'

export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      authorId: new UniqueEntityID(),
      ...override,
    },
    id,
  )

  return question
}

@Injectable()
export class QuestionFactory {
  constructor(private prismaService: PrismaService) {}

  async makePrismaQuestion(
    data: Partial<QuestionProps> = {},
  ): Promise<Question> {
    const question = makeQuestion(data)

    await this.prismaService.question.create({
      data: PrismaQuestionMapper.toPersistence(question),
    })

    return question
  }
}
