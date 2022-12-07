import logout from '../../assets/img/logout-com.svg'
import Image from "next/image";
import { useRouter } from "next/router";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export default function Navbar() {
  const router = useRouter();
  const supabase = useSupabaseClient()
  function signOut() {
    supabase.auth.signOut()
    router.push('/')
  }
  return <nav className="navbar navbar-light bg-light fixed-top">
    <div className="container-fluid">
      <div className="navbar-brand">
        ClipBoard
      </div>
      <div>
        <div className="btn " onClick={signOut}>
          <Image className="p-0" src={logout} height={20} width={30} alt="logout"></Image>
        </div>
      </div>
    </div>
  </nav>
}