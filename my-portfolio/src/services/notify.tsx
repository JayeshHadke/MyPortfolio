import { useEffect } from "react";
import emailjs from "emailjs-com";

export default function notifyAuthor(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
}) {
  const message = ` 📧 Name: ${data.name}
                    📧 Email: ${data.email}
                    📞 Phone: ${data.phone}
                    📝 Message: ${data.message}`;

  emailjs
    .send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      { message }, // single variable
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    )
    .then(() => {
      sessionStorage.setItem("emailSent", "true");
      console.log("✅ Email sent successfully!");
    });
  return null;
}
