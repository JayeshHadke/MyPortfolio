"use client";
import MainPage from "@/components/mainPage";
// import NotifyAccess from "@/services/notify";
import Footers from "@/components/footers";
import AccessWarningBanner from "@/components/TopBanner";
export default function Home() {
  return (
    <div>
      {/* {NotifyAccess()} */}
      {/* <AccessWarningBanner /> */}
      <MainPage />
      <Footers />
    </div>
  );
}
