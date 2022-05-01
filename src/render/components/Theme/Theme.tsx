// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useState } from "react";
import "./Theme.css";

// Media Query
const mql = window.matchMedia("(prefers-color-scheme: dark)");

// Import the Themes Via Lazy
const LightTheme = React.lazy(() => import("./light/Light"));
const DarkTheme = React.lazy(() => import("./dark/Dark"));

// Properties
interface ThemeProps {
  children: React.ReactNode;
}

// Component
export default function Theme( { children } : ThemeProps ) {
  // State for theme
  const [isDark, setIsDark] = useState(mql.matches);

  // Handle theme change
  const handleThemeChange = () => {
    setIsDark(!isDark);
  }

  // Handle media query change
  mql.addEventListener("change", handleThemeChange);

  // Return the theme
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      {isDark ? <DarkTheme /> : <LightTheme />}
      {children}
    </React.Suspense>
  );
}
