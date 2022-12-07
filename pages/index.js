import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  const router = useRouter()
  useEffect(() => {
    if (session?.user?.email) {
      router.push('/home');
    } 
  }, [session])
  return (
    <div className="container" >
      {!session ? (
        <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
      ) : (
        <div>Login success fully</div>
      )}
    </div>
  )
}

export default Home