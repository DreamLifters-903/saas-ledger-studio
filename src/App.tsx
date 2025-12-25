import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import JournalBook from "./pages/JournalBook";
import LedgerAccounts from "./pages/LedgerAccounts";
import Attendance from "./pages/Attendance";
import AmountDue from "./pages/AmountDue";
import TrialBalance from "./pages/TrialBalance";
import BalanceSheet from "./pages/BalanceSheet";
import ProfitLoss from "./pages/ProfitLoss";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/journal" element={<JournalBook />} />
          <Route path="/ledger" element={<LedgerAccounts />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/amount-due" element={<AmountDue />} />
          <Route path="/trial-balance" element={<TrialBalance />} />
          <Route path="/balance-sheet" element={<BalanceSheet />} />
          <Route path="/profit-loss" element={<ProfitLoss />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
