const chatLog = document.getElementById("chat-log");
const userInput = document.getElementById("user-input");

// Token de Hugging Face (ya incrustado)
const HF_TOKEN = "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";
const MODEL = "facebook/blenderbot-400M-distill";

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage("Tú", text, "user");
  userInput.value = "";

  setTimeout(async () => {
    const response = await getBotResponse(text);
    addMessage("Mu H7 IA", response, "bot");
  }, 500);
}

function addMessage(sender, text, cls) {
  const msg = document.createElement("div");
  msg.classList.add(cls);
  msg.textContent = `${sender}: ${text}`;
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

async function getBotResponse(input) {
  try {
    const res = await fetch(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        headers: { Authorization: `Bearer ${HF_TOKEN}` },
        method: "POST",
        body: JSON.stringify({ inputs: input }),
      }
    );

    const data = await res.json();
    console.log(data);

    if (data.error) {
      return "⚠️ Error con el modelo, intenta más tarde.";
    }

    return data[0]?.generated_text || "🤖 No tengo respuesta.";
  } catch (err) {
    return "❌ No pude conectarme a la IA.";
  }
}
