import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
function MyApp({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient())
  return <SessionContextProvider SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession} >
    <Component {...pageProps} />
    <ToastContainer />
  </SessionContextProvider >
}

export default MyApp
