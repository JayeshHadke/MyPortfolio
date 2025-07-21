// import { useEffect } from "react";
// import emailjs from "emailjs-com";
// import { error } from "console";

// export default function NotifyAccess() {
//   useEffect(() => {
//     // Prevent sending again in this session
//     if (sessionStorage.getItem("emailSent") === "true") return;

//     const now = new Date();
//     const time = now.toLocaleTimeString();
//     const date = now.toLocaleDateString();
//     const language = navigator.language;

//     const { browser, os } = parseUserAgent();

//     fetch("https://ipapi.co/json/")
//       .then((res) => res.json())
//       .then((data) => {
//         navigator.geolocation.getCurrentPosition(
//           (pos) => {
//             fetch(
//               `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json`
//             )
//               .then((res) => res.json())
//               .then((locationData) => {
//                 const message = `📍 Location: ${data.city}, ${data.country_name}
//                         🧠 IP: ${data.ip}
//                         🌐 Browser: ${browser} on ${os}
//                         🗣️ Language: ${language}
//                         🕒 Time: ${time} on ${date}
//                           Network ORG: ${data.org}
//                           Region: ${data.region}  
//                           Location: ${locationData.display_name || "N/A"}
//                           latitude: ${locationData.lat || "N/A"},
//                           longitude: ${locationData.lon || "N/A"}`.trim();

//                 emailjs
//                   .send(
//                     process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
//                     process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
//                     { message }, // single variable
//                     process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
//                   )
//                   .then(() => {
//                     sessionStorage.setItem("emailSent", "true");
//                     console.log(
//                       "✅ Admin notified via email with accurate location"
//                     );
//                   });
//               });
//           },
//           (error) => {
//             const message = `📍 Location: ${data.city}, ${data.country_name}
//                         🧠 IP: ${data.ip}
//                         🌐 Browser: ${browser} on ${os}
//                         🗣️ Language: ${language}
//                         🕒 Time: ${time} on ${date}
//                           Network ORG: ${data.org}
//                           Postal: ${data.postal}
//                           Region: ${data.region}  `.trim();

//             emailjs
//               .send(
//                 "service_h03t7ru",
//                 "template_4x21o89",
//                 { message }, // single variable
//                 "QKMpRVnI3_lJPUYtR"
//               )
//               .then(() => {
//                 sessionStorage.setItem("emailSent", "true");
//                 console.log("✅ Admin notified via email partial location");
//               });
//           }
//         );
//       });
//   }, []);

//   const parseUserAgent = () => {
//     const ua = navigator.userAgent;
//     const os = ua.includes("Windows")
//       ? "Windows"
//       : ua.includes("Mac")
//       ? "macOS"
//       : ua.includes("Linux")
//       ? "Linux"
//       : ua.includes("Android")
//       ? "Android"
//       : ua.includes("iPhone") || ua.includes("iPad")
//       ? "iOS"
//       : "Unknown";

//     const browser = ua.includes("Chrome")
//       ? "Chrome"
//       : ua.includes("Firefox")
//       ? "Firefox"
//       : ua.includes("Safari")
//       ? "Safari"
//       : ua.includes("Edg")
//       ? "Edge"
//       : "Unknown";

//     return { browser, os };
//   };

//   return null;
// }
