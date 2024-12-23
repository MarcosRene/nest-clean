import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answers: AnswerComment[] = []

  async findById(id: string) {
    const questionComment = this.answers.find(
      (item) => item.id.toString() === id,
    )

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.answers
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
    return answerComments
  }

  async create(answerComment: AnswerComment) {
    this.answers.push(answerComment)
  }

  async delete(answerComment: AnswerComment) {
    const itemIndex = this.answers.findIndex(
      (item) => item.id === answerComment.id,
    )

    this.answers.splice(itemIndex, 1)
  }
}
