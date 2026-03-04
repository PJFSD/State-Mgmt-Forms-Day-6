import React from "react";
import Projects from "./pages/Projects";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return <ErrorBoundary>
    <Projects />
  </ErrorBoundary>;
}

export default App;