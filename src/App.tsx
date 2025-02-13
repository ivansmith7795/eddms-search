import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import { ThemeToggle } from "./components/theme/theme-toggle";
import ThemeProvider from "./components/theme/theme-provider";
import { NavMenu } from "./components/layout/nav-menu";
import Home from "./components/home";
import routes from "tempo-routes";

function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<p>Loading...</p>}>
        <>
          <NavMenu />
          <div className="transition-all duration-300 pl-16 md:pl-64">
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
              <ThemeToggle />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </div>
        </>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
