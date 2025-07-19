import React from "react";

interface Props {
  command: string;
  output: string | string[];
  type?: "text" | "list";
}

export default function CommandBlock({ command, output, type = "text" }: Props) {
  return (
    <div className="mb-6">
      <p className="text-blue-400">
        PS C:\Users\you&gt; <span className="text-white">{command}</span>
      </p>

      {type === "list" && Array.isArray(output) ? (
        <ul className="ml-6 text-white list-disc">
          {output.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <p className="ml-6 text-white">{output}</p>
      )}
    </div>
  );
}
