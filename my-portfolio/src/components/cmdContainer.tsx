import { useEffect, useRef, useState } from "react";

const tabs = ["Intro", "Experience", "Projects", "Education", "Certificates"];

export default function CmdWindowPortfolio() {
  const [activeTab, setActiveTab] = useState("Intro");
  const sectionsRef = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = entry.target.getAttribute("data-section");
            setActiveTab(name);
          }
        });
      },
      { threshold: 0.5 }
    );

    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (tab) => {
    const el = sectionsRef.current[tab];
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const renderPrompt = (text) => (
    <div className="mb-4">
      <p className="text-green-400">
        <span className="text-white">C:\Users\Jayesh&gt;</span> {text}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Sticky CMD Window Frame */}
      <div className="sticky top-0 z-50">
        <div className="bg-zinc-900 border-b border-zinc-700 flex justify-between items-center px-4 py-2">
          <div className="w-12"></div>
          <div className="text-white text-sm">CMD.EXE</div>
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="bg-zinc-800 flex space-x-4 px-4 py-2 border-b border-zinc-700">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`px-3 py-1 rounded ${
                activeTab === tab
                  ? "bg-zinc-700 text-white"
                  : "text-green-400 hover:bg-zinc-700"
              }`}
              onClick={() => scrollTo(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-32 px-6 py-8">
        <section
          ref={(el) => (sectionsRef.current["Intro"] = el)}
          data-section="Intro"
          className="min-h-screen flex items-center justify-between border-b border-zinc-700"
        >
          <div className="w-full">
            {renderPrompt("about-me")}
            <div className="flex justify-between">
              <div className="max-w-md">
                <h1 className="text-4xl font-bold">Hi, I'm [Your Name]</h1>
                <p className="mt-4">
                  I’m a full-stack developer who builds terminal-inspired
                  portfolios ✨
                </p>
              </div>
              <img
                src="/your-image.jpg"
                alt="Your face"
                className="w-40 h-40 rounded border border-green-400"
              />
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionsRef.current["Experience"] = el)}
          data-section="Experience"
          className="min-h-screen border-b border-zinc-700"
        >
          {renderPrompt("experience")}
          <h2 className="text-2xl mb-4">Professional Experience</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>
              Software Engineer at{" "}
              <a href="#" className="underline text-blue-400">
                Company A
              </a>
            </li>
            <li>
              Intern at{" "}
              <a href="#" className="underline text-blue-400">
                Company B
              </a>
            </li>
          </ul>
        </section>

        <section
          ref={(el) => (sectionsRef.current["Projects"] = el)}
          data-section="Projects"
          className="min-h-screen border-b border-zinc-700"
        >
          {renderPrompt("projects")}
          <h2 className="text-2xl mb-4">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-zinc-800 border border-zinc-600 p-4 rounded">
              <img
                src="/project1.jpg"
                alt="Project 1"
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="mt-2 text-lg">Project One</h3>
              <p className="text-sm">A cool thing I built with React.</p>
              <a href="#" className="text-blue-400 underline text-sm">
                View Repo
              </a>
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionsRef.current["Education"] = el)}
          data-section="Education"
          className="min-h-screen border-b border-zinc-700"
        >
          {renderPrompt("education")}
          <h2 className="text-2xl mb-4">Education</h2>
          <ul className="list-disc ml-5">
            <li>B.Tech – [University Name]</li>
            <li>12th – [School Name]</li>
            <li>10th – [School Name]</li>
          </ul>
        </section>

        <section
          ref={(el) => (sectionsRef.current["Certificates"] = el)}
          data-section="Certificates"
          className="min-h-screen"
        >
          {renderPrompt("certificates")}
          <h2 className="text-2xl mb-4">Certificates</h2>
          <ul className="list-disc ml-5 space-y-2">
            <li>AWS Certified Solutions Architect</li>
            <li>Full-Stack Developer Bootcamp</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
