import { User as SupabaseUser } from '@supabase/supabase-js'

export interface User extends SupabaseUser {
  userUid: number
  isFetched: boolean
  isSignedIn: boolean
}
