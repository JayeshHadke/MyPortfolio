import { Wifi, Volume2, BatteryFull } from "lucide-react";
import { useEffect, useState } from "react";
import AppButton from "@/components/AppButton";

export default function Taskbar() {
  const [time, setTime] = useState("--:--");
  const [date, setDate] = useState("--/--/----");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
      setDate(now.toLocaleDateString());
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  function WindowsButton() {
    const handleClick = () => {
      alert("😂 Please install Windows to try this feature yourself!");
    };

    return (
      <div className="relative group">
        <button
          onClick={handleClick}
          className="w-6 h-6 grid grid-cols-2 grid-rows-2 gap-[2px] bg-white p-[2px] rounded-sm shadow border border-zinc-700"
        >
          <div className="bg-blue-600"></div>
          <div className="bg-blue-600"></div>
          <div className="bg-blue-600"></div>
          <div className="bg-blue-600"></div>
        </button>

        <div className="absolute bottom-[110%] left-2 right-2 mx-auto max-w-[220px] bg-white text-black text-xs px-3 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition z-50 whitespace-normal text-center border border-zinc-300 w-max break-words">
          <p className="font-semibold mb-1 block">⚠️ Not Supported</p>
          <p className="block">
            Try installing Windows and running this from there 😜
          </p>
        </div>
      </div>
    );
  }

  function TaskbarClock() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [fullTime, setFullTime] = useState("");
    const [weekday, setWeekday] = useState("");
    const [timezone, setTimezone] = useState("");

    useEffect(() => {
      const updateClock = () => {
        const now = new Date();
        setTime(
          now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
        setDate(now.toLocaleDateString());
        setFullTime(now.toLocaleTimeString());
        setWeekday(
          now.toLocaleDateString(undefined, {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        );
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      };

      updateClock();
      const interval = setInterval(updateClock, 1000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div className="relative group">
        {/* Clock UI */}
        <div className="text-right leading-tight text-xs cursor-default">
          <div>{time}</div>
          <div>{date}</div>
        </div>

        {/* Tooltip on hover */}
        <div className="absolute bottom-[110%] right-0 max-w-[250px] bg-white text-black px-4 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition z-50 text-left border border-zinc-300 whitespace-normal w-max break-words">
          <p className="font-semibold">{weekday}</p>
          <p>Time: {fullTime}</p>
          <p>Timezone: {timezone}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-white h-10 flex items-center justify-between px-2 shadow-lg text-xs font-sans z-50 bt-1 bt-red">
      {/* Left section */}
      <div className="flex items-center space-x-2">
        {WindowsButton()}

        <div className="flex space-x-2">
          <AppButton
            label="VS Code"
            iconUrl="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg"
            description="Open VS Code website"
            link="https://code.visualstudio.com/"
            selected={true}
          />
          <AppButton
            label="Visual Studio"
            iconUrl="https://visualstudio.microsoft.com/wp-content/uploads/2021/10/Product-Icon.svg"
          />
          <AppButton
            label="Android Studio"
            iconUrl="https://upload.wikimedia.org/wikipedia/commons/5/51/Android_Studio_Logo_2024.svg"
          />
          <AppButton
            label="SSMS"
            iconUrl="https://upload.wikimedia.org/wikipedia/en/b/bc/MSSQL_SSMS_21_icon.png"
          />
          <AppButton
            label="MongoDB"
            iconUrl="https://th.bing.com/th/id/ODF.w5r18xkM0KdGrXesKXdLTg?w=32&h=32&qlt=90&pcl=fffffa&o=6&cb=thwsc4&pid=1.2"
          />
          <AppButton
            label="LINQPad"
            iconUrl="https://www.linqpad.net/images/LINQPad.png"
          />
          <AppButton
            label="Chrome"
            iconUrl="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-3 text-black">
        <div className="relative group">
          <Wifi className="w-4 h-4" />
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
            Wi-Fi
          </span>
        </div>
        <div className="relative group">
          <Volume2 className="w-4 h-4" />
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
            System Output 100%
          </span>
        </div>
        <div className="relative group">
          <BatteryFull className="w-4 h-4" />
          <span className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition">
            Charging Full
          </span>
        </div>

        <div className="text-right leading-tight ">{TaskbarClock()}</div>
      </div>
    </div>
  );
}
