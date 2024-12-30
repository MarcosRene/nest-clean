import {
  Uploader,
  UploaderParams,
} from '@/domain/forum/application/storage/uploader'

interface Upload {
  fileName: string
  url: string
}

export class FakeUploader implements Uploader {
  public uploads: Upload[] = []

  async upload({ fileName }: UploaderParams): Promise<{ url: string }> {
    this.uploads.push({ fileName, url: 'fake-url' })

    return { url: 'fake-url' }
  }
}
