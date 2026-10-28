import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="icon-button theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      title="Toggle theme"
    >
      {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
      <span>{theme === "light" ? "Dark mode" : "Light mode"}</span>
    </button>
  );
}