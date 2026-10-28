import { CheckSquare, Search } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header({ search, setSearch }) {
  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-icon">
          <CheckSquare size={23} />
        </div>

        <div>
          <h1>TaskFlow</h1>
          <p>Task Management Dashboard</p>
        </div>
      </div>

      <div className="header-actions">
        <label className="search-box">
          <Search size={18} />
          <input
            type="search"
            placeholder="Search tasks..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>

        <ThemeToggle />
      </div>
    </header>
  );
}