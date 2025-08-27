import { useEffect, useRef, useState } from "react";
import { startChat } from "./ai";

type Msg = { role: "user" | "model"; text: string };

export default function App() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "model", text: "Oi! Sou sua IA. Em que posso ajudar?" },
  ]);
  const [input, setInput] = useState("");
  const [fatal, setFatal] = useState<string | null>(null);
  const chatRef = useRef<ReturnType<typeof startChat> | null>(null);

  useEffect(() => {
    chatRef.current = startChat();
  }, []);

  async function onSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || !chatRef.current) return;

    const userText = input.trim();
    setInput("");
    setMessages((m) => [...m, { role: "user", text: userText }]);

    try {
      // 👇 1) manda a mensagem
      const result = await chatRef.current.sendMessage(userText);

      // 👇 2) espera o objeto de resposta
      const response = await result.response;

      // 👇 3) extrai o texto gerado
      const text = response.text();

      setMessages((m) => [...m, { role: "model", text }]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        { role: "model", text: "Erro ao responder: " + (e?.message ?? String(e)) },
      ]);
    }
  }


  return (
    <div style={{ maxWidth: 720, margin: "40px auto" }}>
      <h1>Chat IA (Firebase + Gemini)</h1>

      {fatal && (
        <div style={{
          color: "#fff", background: "#7f1d1d", border: "1px solid #b91c1c",
          padding: 12, borderRadius: 8, marginBottom: 12
        }}>
          {fatal}
        </div>
      )}

      <div style={{
        border: "1px solid #222",        // borda escura
        borderRadius: 12,
        padding: 16,
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        background: "#0a0a0a"            // cartão escuro
      }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#0ea5e9" : "#111", // user = azul, IA = cinza escuro
              color: m.role === "user" ? "#001018" : "#fff",      // texto visível em ambos
              border: "1px solid #222",
              borderRadius: 12,
              padding: "8px 12px",
              maxWidth: "80%",
              whiteSpace: "pre-wrap"
            }}
          >
            <strong>{m.role === "user" ? "Você" : "IA"}:</strong> {m.text}
          </div>
        ))}
      </div>

      <form onSubmit={onSend} style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite sua mensagem…"
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            border: "1px solid #333",
            background: "#111",
            color: "#fff"
          }}
        />
        <button
          type="submit"
          style={{
            padding: "12px 16px",
            borderRadius: 8,
            border: "1px solid #0284c7",
            background: "#0ea5e9",
            color: "#fff"
          }}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
