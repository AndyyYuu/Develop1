import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import GameIntro from "./pages/GameIntro";
import ParentForm from "./pages/ParentForm";
import ChildForm from "./pages/ChildForm";
import Comparison from "./pages/Comparison";
import Sharing from "./pages/Sharing";
import Summary from "./pages/Summary";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/intro"} component={GameIntro} />
      <Route path={"/parent"} component={ParentForm} />
      <Route path={"/child"} component={ChildForm} />
      <Route path={"/comparison"} component={Comparison} />
      <Route path={"/sharing"} component={Sharing} />
      <Route path={"/summary"} component={Summary} />
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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
