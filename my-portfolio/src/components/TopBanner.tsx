import { useEffect, useState } from "react";

export default function AccessWarningBanner() {
  const [userInfo, setUserInfo] = useState("");
  const [visible, setVisible] = useState(true);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    const language = navigator.language;
    const { browser, os } = parseUserAgent();

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const info = `${data.city}, ${data.country_name} • ${browser} on ${os} • ${language} • ${time} ${date}`;
        setUserInfo(info);
      })
      .catch(() => {
        setUserInfo(`${browser} on ${os} • ${language} • ${time} ${date}`);
      });

    const fadeTimer = setTimeout(() => setVisible(false), 3000);
    const removeTimer = setTimeout(() => setShowBanner(false), 3050);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  const parseUserAgent = () => {
    const ua = navigator.userAgent;
    if (ua.includes("Chrome")) return { browser: "Chrome", os: getOS(ua) };
    if (ua.includes("Firefox")) return { browser: "Firefox", os: getOS(ua) };
    if (ua.includes("Safari") && !ua.includes("Chrome"))
      return { browser: "Safari", os: getOS(ua) };
    if (ua.includes("Edg")) return { browser: "Edge", os: getOS(ua) };
    return { browser: "Unknown", os: getOS(ua) };
  };

  const getOS = (ua: string) => {
    if (ua.includes("Windows")) return "Windows";
    if (ua.includes("Mac")) return "macOS";
    if (ua.includes("Linux")) return "Linux";
    if (ua.includes("Android")) return "Android";
    if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
    return "Unknown OS";
  };

  if (!showBanner || !userInfo) return null;

  return (
    <div
      className={`sticky top-0 z-50 w-full bg-red-600 text-white text-sm text-left py-2 px-4 shadow-md whitespace-normal transition-all duration-1000 ${
        visible ? "opacity-100 h-9" : "opacity-0 h-0 overflow-hidden"
      }`}
    >
      <span className="font-mono text-xs">
        ⚠️ Welcome curious developer! We’re logging this visit just for fun (no data saved).
      </span>
    </div>
  );
}
