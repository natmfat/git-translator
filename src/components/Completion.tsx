export const Completion = ({
  completion,
  english,
}: {
  completion: string;
  english: string;
}) => {
  return (
    <div className="p-4 rounded-lg border mt-4">
      <p>{english}</p>
      <code className="font-mono p-4 bg-gray-50 border rounded-lg mt-2 w-full block">
        <pre className="break-words whitespace-pre-wrap">{completion}</pre>
      </code>
    </div>
  );
};
