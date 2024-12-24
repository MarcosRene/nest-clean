import { DomainEvents } from '@/core/events/domain-events'
import { StudentsRepository } from '@/domain/forum/application/repositories/students-repository'
import { Student } from '@/domain/forum/enterprise/entities/student'

export class InMemoryStudentsRepository implements StudentsRepository {
  public students: Student[] = []

  async findByEmail(email: string) {
    const student = this.students.find((item) => item.email === email)

    if (!student) {
      return null
    }

    return student
  }

  async create(student: Student) {
    this.students.push(student)

    DomainEvents.dispatchEventsForAggregate(student.id)
  }
}
