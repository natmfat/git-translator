export const fetchCompletions = (userInput: string) =>
  fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userInput,
    }),
  }).then((res) => res.json());
