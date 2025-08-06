import sectionData from "@/services/getSectionData";
import { getTotalDuration } from "@/services/getTotalYears";
import notifyAuthor from "@/services/notify";
import { useEffect, useRef, useState } from "react";
const tabs = [
  "Intro",
  "Experience",
  "Projects",
  "Skills",
  "Connect",
  "Download CV",
];

export default function CmdWindowPortfolio() {
  // overwiew details
  type overviewType = {
    title: string;
    description: string;
    image: string;
  };
  const [overviewDetails, setOverviewDetails] = useState<overviewType | null>(
    null
  );

  // experience details
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

  // projects details
  
  // skills details
  type skillType = {
    name: string;
    icon: string;
  };
  const [skillsDetails, setSkillsDetails] = useState<skillType[]>([]);

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

    // overview details
    setOverviewDetails(sectionData["data"]["overview"]);

    // experience details
    const companies = (
      sectionData["data"]["experience"] as {
        company: string;
        designation: string;
        duration: string;
        description: string;
      }[]
    ).map((company) => ({
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

    // skills details
    const skills = sectionData["data"]["skills"].map((skill: skillType) => ({
      name: skill.name,
      icon: skill.icon,
    }));
    setSkillsDetails(skills);

    Object.values(sectionsRef.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (tab: string) => {
    if (tab === "Download CV") {
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
          <div className="flex flex-1 items-center justify-between mr-[4vw]">
            <div className="max-w-[50vw]">
              <h1 className="text-4xl font-bold">{overviewDetails?.title}</h1>
              <p className="mt-4 text-zinc-200">
                {overviewDetails?.description}
              </p>
            </div>
            <img
              src="./profilePhoto.png"
              alt="Your face"
              className="w-[25vw] h-[55vh] rounded border border-green-400 object-cover"
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
            sectionsRef.current["Skills"] = el;
          }}
          data-section="Skills"
          className="min-h-[80vh] border-b border-zinc-700 scroll-mt-32"
        >
          {renderPromptSticky("systeminfo --profile --skills")}
          <h2 className="text-2xl mb-4">Skills</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-8">
            {skillsDetails.map((skill) => (
              <div
                key={skill.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 border border-green-400 bg-black text-green-400 rounded-md font-mono text-sm shadow-inner hover:bg-green-950 hover:text-white transition duration-150"
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-4 h-4 object-contain filter brightness-0 invert"
                />
                <span>{skill.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* <section
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
        </section> */}
        <section
          ref={(el) => {
            sectionsRef.current["Connect"] = el;
          }}
          data-section="Connect"
          className="min-h-[80vh] border-b border-zinc-700 scroll-mt-32"
        >
          {renderPromptSticky("connect --network")}
          <h2 className="text-2xl mb-4">Connect with Me</h2>

          <div className="flex space-x-6 text-white text-xl mb-8">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              🐦
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              📸
            </a>
            <a href="mailto:youremail@example.com">✉️</a>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget as HTMLFormElement;
              const data = {
                name: (form.elements.namedItem("name") as HTMLInputElement)?.value || "",
                email: (form.elements.namedItem("email") as HTMLInputElement)?.value || "",
                phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value || "",
                message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
              };
              console.log("Form submitted:", data);
              notifyAuthor(data);
            }}
            className="space-y-4 max-w-md"
          >
            <input
              name="name"
              placeholder="Name"
              required
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600"
            />
            <input
              name="phone"
              type="tel"
              placeholder="Phone (optional)"
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600"
            />
            <textarea
              name="message"
              placeholder="Message"
              required
              className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-600"
            ></textarea>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
