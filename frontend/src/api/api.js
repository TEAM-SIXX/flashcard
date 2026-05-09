let isGenerating = false;

export const generateAICards = async (tech) => {
  if (isGenerating) return [];
  isGenerating = true;

  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Flashcard App",
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b:free",
        messages: [
          {
            role: "user",
            content: `
Generate 5 flashcards about ${tech}.

Return ONLY valid JSON array (no markdown, no backticks):

[
  {"front":"...","back":"...","difficulty":"Beginner"}
]
            `.trim(),
          },
        ],
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API error:", data);
      return [];
    }

    let text = data?.choices?.[0]?.message?.content || "[]";

    text = text.replace(/```json|```/g, "").trim();

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error("JSON parse error:", text);
      return [];
    }
  } catch (err) {
    console.error("Request failed:", err);
    return [];
  } finally {
    isGenerating = false;
  }
};