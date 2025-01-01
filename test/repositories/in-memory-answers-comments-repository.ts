import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'
import { CommentWithAuthor } from '@/domain/forum/enterprise/entities/value-objects/comment-with-author'

import { InMemoryStudentsRepository } from './in-memory-students-repository'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public answers: AnswerComment[] = []

  constructor(private studentsRepository: InMemoryStudentsRepository) {}

  async findById(id: string) {
    const answerComment = this.answers.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerId(answerId: string, { page }: PaginationParams) {
    const answerComments = this.answers
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
    return answerComments
  }

  async findManyByAnswerIdWithAuthor(
    answerId: string,
    { page }: PaginationParams,
  ) {
    const answerComments = this.answers
      .filter((item) => item.answerId.toString() === answerId)
      .slice((page - 1) * 20, page * 20)
      .map((comment) => {
        const author = this.studentsRepository.students.find((student) =>
          student.id.equals(comment.authorId),
        )

        if (!author) {
          throw new Error(
            `Author with ID "${comment.authorId.toString()}" does not exist.`,
          )
        }

        return CommentWithAuthor.create({
          authorId: comment.authorId,
          commentId: comment.id,
          content: comment.content,
          author: author.name,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
        })
      })

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
