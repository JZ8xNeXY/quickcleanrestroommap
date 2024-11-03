import { User as SupabaseUser } from '@supabase/supabase-js'

export interface User extends SupabaseUser {
  userUid: string
  isFetched: boolean
  isSignedIn: boolean
}
