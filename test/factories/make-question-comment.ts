import { faker } from '@faker-js/faker'
import { Injectable } from '@nestjs/common'

import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '@/domain/forum/enterprise/entities/question-comment'
import { PrismaQuestionCommentMapper } from '@/infra/database/mappers/prisma-question-comment-mapper'
import { PrismaService } from '@/infra/database/prisma/prima.service'

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityID,
) {
  const question = QuestionComment.create(
    {
      authorId: new UniqueEntityID(),
      questionId: new UniqueEntityID(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}

@Injectable()
export class QuestionCommentFactory {
  constructor(private prismaService: PrismaService) {}

  async makePrismaQuestionCommment(
    data: Partial<QuestionCommentProps> = {},
  ): Promise<QuestionComment> {
    const question = makeQuestionComment(data)

    await this.prismaService.comment.create({
      data: PrismaQuestionCommentMapper.toPersistence(question),
    })

    return question
  }
}
