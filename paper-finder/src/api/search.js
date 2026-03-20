const API_KEY = "b3ef4a14-01e6-46fe-8988-919cae37bd21";

export async function searchPapers({ query, mode = "neural", numResults = 6 }) {
  const res = await fetch("https://api.exa.ai/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      query,
      type: mode,
      numResults,
      useAutoprompt: true,
      category: "research paper",
      contents: { summary: { query } },
    }),
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  const data = await res.json();
  return data.results;
}
