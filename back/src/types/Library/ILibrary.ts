import { LibraryStatus } from '../../enums/Library'

export interface ILibraryPayload {
  bookId: string
  userId: string
  status?: LibraryStatus
}

export interface ILibrary extends ILibraryPayload {
  id: string
  updated_at: Date
  created_at: Date
}
