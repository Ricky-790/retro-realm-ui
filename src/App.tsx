import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateCharacter from "./pages/CreateCharacter";
import Leaderboard from "./pages/Leaderboard";
import Battle from "./pages/Battle";
import BattleCreate from "./pages/BattleCreate";
import BattleJoin from "./pages/BattleJoin";
import BattleRoom from "./pages/BattleRoom";
import BattleArea from "./pages/BattleArea"; // Removed because module not found
import NotFound from "./pages/NotFound";
import { GlobalContextProvider } from "./context";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GlobalContextProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-character" element={<CreateCharacter />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/battle" element={<Battle />} />
            <Route path="/battle/create" element={<BattleCreate />} />
            <Route path="/battle/join" element={<BattleJoin />} />
            <Route path="/battle/:battleId" element={<BattleRoom />} />
            <Route path="/battlearea" element={<BattleArea />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </GlobalContextProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
