"use client";

import React from "react";
import CommandBlock from "./commandBlock";
import Footers from "./footers";
("./footers");

export default function Terminal() {
  return (
    <div className="bg-zinc-900 text-green-400 font-mono text-sm min-h-screen pt-4 p-0 border-0">
      <div className="max-w-4xl mx-auto">
        <CommandBlock
          command="whoami"
          output="You are John Doe, a full-stack developer."
        />
        <div>lorem*1231231</div>
        <CommandBlock
          command="Get-Projects"
          output={["ChatGPT Assistant", "Portfolio Website", "API CLI"]}
          type="list"
        />

        <CommandBlock
          command="Contact"
          output="📧 john@example.com | 🔗 linkedin.com/in/john"
        />
      </div>
      <Footers />
    </div>
  );
}
