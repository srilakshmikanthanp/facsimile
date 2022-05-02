// Copyright (c) 2022 Sri Lakshmi Kanthan P
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import React, { useState } from "react";
import ReactLoading from "react-loading";
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

// Fallback for theme
function Loading() {
  // State for theme
  const [isDark, setIsDark] = useState(mql.matches);

  // Handle theme change
  const handleThemeChange = () => {
    setIsDark(!isDark);
  }

  // bg color
  const bgColor = isDark ? "#303030" : "#fff";

  // fg color
  const fgColor = isDark ? "#fff" : "#00a2ed";

  // Handle media query change
  mql.addEventListener("change", handleThemeChange);

  // Loading Component
  return (
    <div 
      className={`w-100 h-100 d-flex align-items-center justify-content-center ${bgColor}`}>
      <ReactLoading type="spinningBubbles" color={fgColor} height={40} width={40}/>
    </div>
  );
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
    <React.Suspense fallback={Loading()}>
      {isDark ? <DarkTheme /> : <LightTheme />}
      {children}
    </React.Suspense>
  );
}
