"use client";

import React from "react";
import CommandBlock from "./commandBlock";
import CmdWindowPortfolio from "./cmdContainer";
import { Analytics } from "@vercel/analytics/next";

export default function MainPage() {
  return (
    // <div className="m-4 bg-blue sticky top-16">
    <div>
      <Analytics />
      <CmdWindowPortfolio />
    </div>
    // </div>
  );
}
