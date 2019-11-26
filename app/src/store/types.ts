import { AuthState } from './modules/auth/types'
import { BookState } from './modules/book/types'
import { UIState } from './modules/ui/types'
import { UserState } from './modules/user/types'

export interface RootState {
  auth: AuthState
  book: BookState
  ui: UIState,
  user: UserState
}
