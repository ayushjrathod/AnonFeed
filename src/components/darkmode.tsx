// src/components/ui/darkmode.tsx
"use client";

import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme based on localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setIsDark(storedTheme === "dark");
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  // Toggle dark mode and persist preference
  const toggleDarkMode = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      document.documentElement.classList.toggle("dark", newTheme);
      localStorage.setItem("theme", newTheme ? "dark" : "light");
      return newTheme;
    });
  };

  return (
    <div className=" absolute top-4 right-4">
      <label htmlFor="dark-toggle" className="flex items-center cursor-pointer">
        {/* Toggle */}
        <div className="relative">
          <input type="checkbox" id="dark-toggle" className="sr-only" checked={isDark} onChange={toggleDarkMode} />
          <div className="w-14 h-8 bg-gray-300 dark:bg-gray-600 rounded-full shadow-inner transition-colors duration-300"></div>
          <div
            className={`absolute top-1 left-1 w-6 h-6 bg-white dark:bg-gray-800 rounded-full shadow-md transform transition-transform duration-300 ${
              isDark ? "translate-x-6" : ""
            }`}
          ></div>
        </div>
        {/* Label */}
        <div className="ml-3 text-gray-900 dark:text-white font-medium">{isDark ? "Dark Mode" : "Light Mode"}</div>
      </label>
    </div>
  );
};

export default DarkModeToggle;
