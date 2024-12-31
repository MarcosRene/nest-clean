import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public answerAttachments: AnswerAttachment[] = []

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachments.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    this.answerAttachments.push(...attachments)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    const questionAttachments = this.answerAttachments.filter((item) => {
      return !attachments.some(
        (attachment) => attachment.id.toString() === item.id.toString(),
      )
    })

    this.answerAttachments = questionAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.answerAttachments.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.answerAttachments = answerAttachments
  }
}
