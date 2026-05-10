import { MASTER_QUESTIONS } from "../data/masterQuestions";

let isGenerating = false;

export const generateAICards = async (tech) => {
  if (isGenerating) {
    return {
      cards: [],
      fallback: false,
    };
  }

  isGenerating = true;

  try {
    const res = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",

          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_KEY}`,

          "HTTP-Referer":
            "http://localhost:5173",

          "X-Title": "Flashcard App",
        },

        body: JSON.stringify({
          model: "openai/gpt-oss-120b:free",

          messages: [
            {
              role: "user",

              content: `Generate 5 flashcards about ${tech}.

Return ONLY a valid JSON array.

Format:
[
  {
    "front":"question",
    "back":"answer",
    "difficulty":"Beginner"
  }
]`,
            },
          ],
        }),
      }
    );

    if (!res.ok) {
      throw new Error(
        `API request failed: ${res.status}`
      );
    }

    const data = await res.json();

    let text =
      data?.choices?.[0]?.message?.content ||
      "[]";

    // remove markdown wrappers
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(text);

    return {
      cards: parsed,
      fallback: false,
    };

  } catch (err) {
    console.error(
      "AI failed, using fallback:",
      err
    );

    // -----------------------------
    // LOCAL FALLBACK
    // -----------------------------
    const fallback = MASTER_QUESTIONS
      .filter(
        (q) =>
          q.tech?.toLowerCase() ===
          tech.toLowerCase()
      )
      .slice(0, 5)
      .map((q, i) => ({
        id: `fallback_${tech}_${i}`,
        front: q.question,
        back: q.answer,
        difficulty:
          q.difficulty || "Beginner",
      }));

    return {
      cards: fallback,
      fallback: true,
    };

  } finally {
    isGenerating = false;
  }
};