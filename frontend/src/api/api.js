import { MASTER_QUESTIONS } from "../data/masterQuestions";

export const generateDeck = (technologies = []) => {
  const techList = technologies.map(t => t.toLowerCase());

  const filtered = MASTER_QUESTIONS.filter((q) =>
    techList.includes(q.tech.toLowerCase())
  );

  console.log("TECH INPUT:", techList);
  console.log("MATCHED CARDS:", filtered);

  return {
    success: true,
    cards: filtered,
  };
};