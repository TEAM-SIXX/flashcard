console.log("FILE LOADED");
import { useState } from "react";

export default function JDInput({ onResult }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!input.trim()) return;

    setLoading(true);

    try {
      const keywords = [];
      const text = input.toLowerCase();

      if (text.includes("react")) keywords.push("react");
      if (text.includes("javascript")) keywords.push("javascript");
      if (text.includes("node")) keywords.push("node");
      if (text.includes("api")) keywords.push("api");
      if (text.includes("python")) keywords.push("python");

      if (keywords.length === 0) {
        keywords.push("javascript");
      }

      const result = {
        rawInput: input,
        tech: keywords,
        source: "local",
      };

      onResult(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="jd-input">
      <h2>Job Description Input</h2>

      <textarea
        placeholder="Paste job description..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Processing..." : "Generate"}
      </button>
    </div>
  );
}