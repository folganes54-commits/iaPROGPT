import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Dashboard() {
  useEffect(()=>{
    async function init() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      await fetch("/api/chats/create", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ user_id: user.id, title:"Chat inicial" })
      });
    }
    init();
  },[]);
  return <h1>Dashboard</h1>;
}
