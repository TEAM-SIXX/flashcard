export default function JDInput(container, onResult) {
  let input = "";
  let loading = false;

  function render() {
    container.innerHTML = `
      <div>
        <h2>Job Description Input</h2>

        <textarea id="jd-textarea" placeholder="Paste job description...">${input}</textarea>
        <br />
        <button id="jd-button" ${loading ? "disabled" : ""}>
          ${loading ? "Processing..." : "Generate"}
        </button>
      </div>
    `;

    const textarea = container.querySelector("#jd-textarea");
    const button = container.querySelector("#jd-button");

    textarea.addEventListener("input", (e) => {
      input = e.target.value;
    });

    button.addEventListener("click", handleSubmit);
  }

  function handleSubmit() {
    if (!input.trim()) return;

    loading = true;
    render();

    try {
      const keywords = [];
      const text = input.toLowerCase();

      if (text.includes("react")) keywords.push("react");
      if (text.includes("javascript")) keywords.push("javascript");
      if (text.includes("node")) keywords.push("node");
      if (text.includes("api")) keywords.push("api");

      if (keywords.length === 0) {
        keywords.push("javascript");
      }

      const result = {
        rawInput: input,
        tech: keywords,
        source: "local"
      };

      onResult(result);

    } catch (error) {
      console.error(error);
    } finally {
      loading = false;
      render();
    }
  }

  render();
}
