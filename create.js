import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  let { user_id, title } = req.body;
  if (!title) title = "Novo Chat";

  const { data: profileExists } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user_id)
    .maybeSingle();

  if (!profileExists) {
    return res.status(400).json({ error: "Usuário não existe na tabela profiles" });
  }

  const { data, error } = await supabase
    .from("chats")
    .insert([{ user_id, title }])
    .select("*")
    .single();

  if (error) return res.status(500).json({ error: error.message });
  return res.status(200).json(data);
}
