import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function DarkToggle() {
  const [dark, setDark] = useState(localStorage.getItem("theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded hover:bg-blue-500"
    >
      {dark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
