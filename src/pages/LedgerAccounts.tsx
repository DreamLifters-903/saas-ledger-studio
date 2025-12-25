import { useState } from "react";
import { motion } from "framer-motion";
import { Search, BookOpen } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LedgerAccount {
  id: number;
  name: string;
  type: "asset" | "liability" | "equity" | "revenue" | "expense";
}

interface LedgerEntry {
  id: number;
  date: string;
  particulars: string;
  debit: number | null;
  credit: number | null;
  balance: number;
}

const sampleLedgerAccounts: LedgerAccount[] = [
  { id: 1, name: "Cash Account", type: "asset" },
  { id: 2, name: "Bank Account", type: "asset" },
  { id: 3, name: "Accounts Receivable", type: "asset" },
  { id: 4, name: "Office Supplies", type: "expense" },
  { id: 5, name: "Accounts Payable", type: "liability" },
  { id: 6, name: "Sales Revenue", type: "revenue" },
  { id: 7, name: "Consulting Revenue", type: "revenue" },
  { id: 8, name: "Utility Expense", type: "expense" },
  { id: 9, name: "Software Expense", type: "expense" },
  { id: 10, name: "Owner's Equity", type: "equity" },
];

const sampleLedgerEntries: LedgerEntry[] = [
  { id: 1, date: "2024-12-15", particulars: "Opening Balance", debit: 50000, credit: null, balance: 50000 },
  { id: 2, date: "2024-12-16", particulars: "Software Purchase", debit: null, credit: 299, balance: 49701 },
  { id: 3, date: "2024-12-17", particulars: "Consulting Fee Received", debit: 3400, credit: null, balance: 53101 },
  { id: 4, date: "2024-12-18", particulars: "Utility Bills Payment", debit: null, credit: 890, balance: 52211 },
  { id: 5, date: "2024-12-19", particulars: "Client Payment - ABC Corp", debit: 5200, credit: null, balance: 57411 },
  { id: 6, date: "2024-12-20", particulars: "Office Supplies", debit: null, credit: 450, balance: 56961 },
];

const accountTypeColors = {
  asset: "text-success",
  liability: "text-destructive",
  equity: "text-primary",
  revenue: "text-success",
  expense: "text-warning",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const LedgerAccounts = () => {
  const [selectedAccount, setSelectedAccount] = useState<LedgerAccount>(sampleLedgerAccounts[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAccounts = sampleLedgerAccounts.filter((account) =>
    account.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout showRightPanel={false}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Ledger Accounts</h1>
          <p className="text-muted-foreground">View individual account ledgers and balances</p>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Account List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search accounts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
            <div className="glow-card p-2 max-h-[600px] overflow-y-auto">
              <div className="space-y-1">
                {filteredAccounts.map((account) => (
                  <motion.button
                    key={account.id}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedAccount(account)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200",
                      selectedAccount.id === account.id
                        ? "bg-primary/15 border-l-2 border-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <BookOpen
                      className={cn(
                        "w-5 h-5",
                        selectedAccount.id === account.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "font-medium truncate",
                          selectedAccount.id === account.id
                            ? "text-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        {account.name}
                      </p>
                      <p className={cn("text-xs capitalize", accountTypeColors[account.type])}>
                        {account.type}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Ledger Table */}
          <div className="lg:col-span-2">
            <div className="glow-card p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{selectedAccount.name}</h2>
                  <p className={cn("text-sm capitalize", accountTypeColors[selectedAccount.type])}>
                    {selectedAccount.type} Account
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="text-2xl font-bold text-primary">
                    ${sampleLedgerEntries[sampleLedgerEntries.length - 1].balance.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="glow-card p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th className="w-28">Date</th>
                      <th>Particulars</th>
                      <th className="w-28 text-right">Debit ($)</th>
                      <th className="w-28 text-right">Credit ($)</th>
                      <th className="w-32 text-right">Balance ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sampleLedgerEntries.map((entry, index) => (
                      <motion.tr
                        key={entry.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <td className="text-muted-foreground">{entry.date}</td>
                        <td className="font-medium text-foreground">{entry.particulars}</td>
                        <td className="text-right font-mono text-destructive">
                          {entry.debit ? `$${entry.debit.toLocaleString()}` : "-"}
                        </td>
                        <td className="text-right font-mono text-success">
                          {entry.credit ? `$${entry.credit.toLocaleString()}` : "-"}
                        </td>
                        <td className="text-right font-mono font-semibold text-foreground">
                          ${entry.balance.toLocaleString()}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default LedgerAccounts;
