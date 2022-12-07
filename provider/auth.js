import supabase from "./supabase";
import { useState } from "react";

function userAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser((u) => (u = session.user));
      }
    });
  });

  return user;
}

export async function signInWithEmail({ email, password }) {
  return await supabase.auth.signInWithPassword({
    email, password
  });
}
export async function signUpWithEmail({ email, password }) {
  return await supabase.auth.signUp({
    email, password, phone: '8866378055'
  })
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
}