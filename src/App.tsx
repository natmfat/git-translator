import { FormEventHandler, useState } from "react";

import { Completion } from "./components/Completion";
import { Footer } from "./components/Footer";
import { LoadingIcon } from "./components/LoadingIcon";
import { fetchCompletions } from "./fetchCompletions";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [fetching, setFetching] = useState(false);
  const [completions, setCompletions] = useState<[string, string][]>([]);

  const submitForm: FormEventHandler = async (e) => {
    e.preventDefault();

    const formattedUserInput = userInput.trim();
    if (!formattedUserInput) return;

    setFetching(true);

    const completion = await fetchCompletions(formattedUserInput);

    setFetching(false);
    setUserInput("");
    setCompletions([
      [formattedUserInput, completion.output.text.trim()],
      ...completions,
    ]);
  };

  return (
    <>
      <main className="w-full flex items-center justify-center">
        <div className="max-w-2xl mt-20">
          <h1 className="font-bold text-6xl">Git Translator</h1>
          <p className="mt-4 text-lg text-gray-800">
            Learn how to efficiently manage your codebase and master the power
            of version control by translating plain English into Git commands.
          </p>
          <form className="mt-12" onSubmit={submitForm}>
            <textarea
              className="w-full h-36 resize-y border rounded-xl p-4 outline-none shadow-md"
              placeholder="Initialize a git repository"
              value={userInput}
              onInput={(e) =>
                setUserInput((e.target as HTMLTextAreaElement).value)
              }
            ></textarea>
            <button
              className="mt-4 px-9 py-3 bg-gradient-to-tr from-blue-500 to-purple-500 text-white rounded-full float-right relative before:absolute before:-z-10 before:bg-gradient-to-r before:from-blue-500 before:to-purple-500 before:rounded-full before:inset-0 before:blur-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              disabled={fetching}
            >
              {fetching && <LoadingIcon />}
              Git fluent!
            </button>
          </form>

          <div className="mt-28">
            {completions.map(([english, completion], i) => (
              <Completion completion={completion} english={english} key={i} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
