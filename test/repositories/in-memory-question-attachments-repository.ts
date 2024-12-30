import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public questionAttachments: QuestionAttachment[] = []

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.questionAttachments.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.questionAttachments.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.questionAttachments = questionAttachments
  }

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
    this.questionAttachments.push(...attachments)
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    const questionAttachments = this.questionAttachments.filter((item) => {
      return !attachments.some(
        (attachment) => attachment.id.toString() === item.id.toString(),
      )
    })

    this.questionAttachments = questionAttachments
  }
}
