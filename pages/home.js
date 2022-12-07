import { useSession } from "@supabase/auth-helpers-react";
import { useState } from "react";
import ClipList from "../components/ClipList/clipList";
import TaskInput from "../components/Input/taskInput";
import Layout from "../components/layout/layout";

export default function Dashboard() {
  const session = useSession()
  const [render, setRender] = useState(false)
  return <Layout session={session}>
    <div className="mt-2">
      <ClipList session={session} render={render} setRender={setRender}></ClipList>
    </div>
    <div>
      <TaskInput userId={session?.user?.id} render={render} setRender={setRender}></TaskInput>
    </div>
  </Layout>
}