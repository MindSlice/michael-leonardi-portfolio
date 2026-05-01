// Deep Signal — Michael Leonardi Portfolio
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import Analytics from "./pages/Analytics";

// Vite injects the base path at build time via import.meta.env.BASE_URL
// In dev: "/"  |  GitHub Pages subdirectory: "/michael-leonardi-portfolio/"
// Custom domain: "/"
const BASE = import.meta.env.BASE_URL ?? "/";

function Routes() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/project/:id"} component={ProjectDetail} />
      <Route path={"/analytics"} component={Analytics} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          {/* WouterRouter with base strips the prefix so routes stay clean ("/", "/project/:id") */}
          <WouterRouter base={BASE.replace(/\/$/, "")}>
            <Routes />
          </WouterRouter>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
