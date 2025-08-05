import sectionData from "@/services/getSectionData";
import { getTotalDuration } from "@/services/getTotalYears";
import { useEffect, useRef, useState } from "react";
const tabs = [
  "Intro",
  "Experience",
  "Projects",
  "Education",
  "Certificates",
  "Downlaod CV",
];

export default function CmdWindowPortfolio() {
  type overviewType = {
    title: string;
    description: string;
    image: string;
  };
  const [overviewDetails, setOverviewDetails] = useState<overviewType | null>(
    null
  );
  type companyDetailsType = {
    designation: string;
    company: string;
    duration: string;
    description: string[];
  };
  type experienceType = {
    companies: companyDetailsType[];
  };

  const [experienceDetails, setExperienceDetails] =
    useState<experienceType | null>(null);

  const [totalExperience, setTotalExperience] = useState<string>("");

  const [activeTab, setActiveTab] = useState("Intro");
  const sectionsRef = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = entry.target.getAttribute("data-section");
            if (name) setActiveTab(name);
          }
        });
      },
      { threshold: 0.5 }
    );

    console.log("sectionData", sectionData["data"]);
    setOverviewDetails(sectionData["data"]["overview"]);
    let companies = sectionData["data"]["experience"].map((company: any) => ({
      company: company.company,
      designation: company.designation,
      duration: company.duration,
      description: company.description
        .split("\n")
        .filter((line: string) => line.trim() !== "")
        .map((line: string) => line.trim()),
    }));
    const totalExperienceDuration = getTotalDuration(
      companies.map((company) => company.duration)
    );
    setTotalExperience(totalExperienceDuration);
    setExperienceDetails({ companies });

    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (tab: string) => {
    if (tab === "Downlaod CV") {
      // download CV from a uri
      const cvUrl =
        "https://github.com/JayeshHadke/MyPortfolio/raw/refs/heads/master/my-portfolio/public/Jayesh_Hadke_CV.pdf";
      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "JayeshCV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    const el = sectionsRef.current[tab];
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const renderPromptSticky = (text: string) => (
    <div className="sticky top-20 bg-black z-10 py-2">
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
          <div className="text-white text-sm">My_Fortfolio.exe</div>
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
      <div className="space-y-32 px-16 py-12">
        <section
          ref={(el) => {
            sectionsRef.current["Intro"] = el;
          }}
          data-section="Intro"
          className="min-h-[80vh] flex flex-col border-b border-zinc-700 scroll-mt-32"
        >
          {renderPromptSticky("systeminfo --profile --overview")}
          <div className="flex flex-1 items-center justify-between mr-50">
            <div className="max-w-md">
              <h1 className="text-4xl font-bold">{overviewDetails?.title}</h1>
              <p className="mt-4 text-zinc-200">
                {overviewDetails?.description}
              </p>
            </div>
            <img
              src="./profilePhoto.png"
              alt="Your face"
              className="w-110 h-120 rounded border border-green-400 object-cover"
            />
          </div>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current["Experience"] = el;
          }}
          data-section="Experience"
          className="min-h-[80vh] border-b border-zinc-700 scroll-mt-32"
        >
          {renderPromptSticky("systeminfo --profile --experience")}
          <h2 className="text-2xl mb-4">
            Professional Experience
            <span className="text-white"> ({totalExperience})</span>
          </h2>
          <ul className="list-disc ml-5 space-y-2">
            {experienceDetails?.companies.map((company, index) => (
              <li key={index}>
                <span className="font-bold text-lg">
                  {company.designation}
                  <span className="text-white"> @ </span>
                  <span className="underline text-blue-400">
                    {company.company}
                  </span>
                </span>
                <br />
                <p className="text-sm text-zinc-100">{company.duration}</p>
                {Array.isArray(company.description) &&
                  company.description.map((element, idx) => (
                    <p key={idx} className="text-sm text-zinc-200">
                      {element}
                    </p>
                  ))}
              </li>
            ))}
          </ul>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current["Projects"] = el;
          }}
          data-section="Projects"
          className="min-h-[80vh] border-b border-zinc-700 scroll-mt-32"
        >
          {renderPromptSticky("systeminfo --profile --projects")}
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
          ref={(el) => {
            sectionsRef.current["Education"] = el;
          }}
          data-section="Education"
          className="min-h-[80vh] border-b border-zinc-700 scroll-mt-32"
        >
          {renderPromptSticky("education")}
          <h2 className="text-2xl mb-4">Education</h2>
          <ul className="list-disc ml-5">
            <li>B.Tech – [University Name]</li>
            <li>12th – [School Name]</li>
            <li>10th – [School Name]</li>
          </ul>
        </section>

        <section
          ref={(el) => {
            sectionsRef.current["Certificates"] = el;
          }}
          data-section="Certificates"
          className="min-h-[80vh] border-b border-zinc-700 scroll-mt-32"
        >
          {renderPromptSticky("certificates")}
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
