import { useEffect } from "react";
import emailjs from "emailjs-com";

export default function NotifyAccess() {
  useEffect(() => {
    // Prevent sending again in this session
    if (sessionStorage.getItem("emailSent") === "true") return;

    const now = new Date();
    const time = now.toLocaleTimeString();
    const date = now.toLocaleDateString();
    const language = navigator.language;

    const { browser, os } = parseUserAgent();

    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const message = `
📍 Location: ${data.city}, ${data.country_name}
🧠 IP: ${data.ip}
🌐 Browser: ${browser} on ${os}
🗣️ Language: ${language}
🕒 Time: ${time} on ${date}
        `.trim();

        // Send to EmailJS
        emailjs
          .send(
            "service_h03t7ru",
            "template_4x21o89",
            { message }, // single variable
            "QKMpRVnI3_lJPUYtR"
          )
          .then(() => {
            sessionStorage.setItem("emailSent", "true");
            console.log("✅ Admin notified via email");
          });
      });
  }, []);

  const parseUserAgent = () => {
    const ua = navigator.userAgent;
    const os = ua.includes("Windows")
      ? "Windows"
      : ua.includes("Mac")
      ? "macOS"
      : ua.includes("Linux")
      ? "Linux"
      : ua.includes("Android")
      ? "Android"
      : ua.includes("iPhone") || ua.includes("iPad")
      ? "iOS"
      : "Unknown";

    const browser = ua.includes("Chrome")
      ? "Chrome"
      : ua.includes("Firefox")
      ? "Firefox"
      : ua.includes("Safari")
      ? "Safari"
      : ua.includes("Edg")
      ? "Edge"
      : "Unknown";

    return { browser, os };
  };

  return null;
}
