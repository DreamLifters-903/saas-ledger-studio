import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Filter, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JournalEntry {
  id: number;
  date: string;
  particulars: string;
  type: "debit" | "credit";
  debit: number | null;
  credit: number | null;
}

const sampleJournalEntries: JournalEntry[] = [
  { id: 1, date: "2024-12-20", particulars: "Office Supplies Purchased", type: "debit", debit: 450, credit: null },
  { id: 2, date: "2024-12-20", particulars: "Cash Account", type: "credit", debit: null, credit: 450 },
  { id: 3, date: "2024-12-19", particulars: "Bank Account", type: "debit", debit: 5200, credit: null },
  { id: 4, date: "2024-12-19", particulars: "Sales Revenue - ABC Corp", type: "credit", debit: null, credit: 5200 },
  { id: 5, date: "2024-12-18", particulars: "Utility Expense", type: "debit", debit: 890, credit: null },
  { id: 6, date: "2024-12-18", particulars: "Bank Account", type: "credit", debit: null, credit: 890 },
  { id: 7, date: "2024-12-17", particulars: "Cash Account", type: "debit", debit: 3400, credit: null },
  { id: 8, date: "2024-12-17", particulars: "Consulting Revenue", type: "credit", debit: null, credit: 3400 },
  { id: 9, date: "2024-12-16", particulars: "Software Expense", type: "debit", debit: 299, credit: null },
  { id: 10, date: "2024-12-16", particulars: "Cash Account", type: "credit", debit: null, credit: 299 },
];

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

const JournalBook = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [entries] = useState<JournalEntry[]>(sampleJournalEntries);

  const filteredEntries = entries.filter((entry) =>
    entry.particulars.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalDebit = filteredEntries.reduce((sum, e) => sum + (e.debit || 0), 0);
  const totalCredit = filteredEntries.reduce((sum, e) => sum + (e.credit || 0), 0);

  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Journal Book</h1>
          <p className="text-muted-foreground">View and filter all journal entries</p>
        </motion.div>

        {/* Filters */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search entries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted border-border"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Date Filter
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </motion.div>

        {/* Table */}
        <motion.div variants={itemVariants} className="glow-card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-32">Date</th>
                  <th>Particulars</th>
                  <th className="w-24">Type</th>
                  <th className="w-32 text-right">Debit ($)</th>
                  <th className="w-32 text-right">Credit ($)</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="text-muted-foreground">{entry.date}</td>
                    <td className="font-medium text-foreground">{entry.particulars}</td>
                    <td>
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          entry.type === "debit"
                            ? "bg-destructive/20 text-destructive"
                            : "bg-success/20 text-success"
                        }`}
                      >
                        {entry.type === "debit" ? (
                          <ArrowUpRight className="w-3 h-3" />
                        ) : (
                          <ArrowDownLeft className="w-3 h-3" />
                        )}
                        {entry.type}
                      </span>
                    </td>
                    <td className="text-right font-mono">
                      {entry.debit ? `$${entry.debit.toLocaleString()}` : "-"}
                    </td>
                    <td className="text-right font-mono">
                      {entry.credit ? `$${entry.credit.toLocaleString()}` : "-"}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-primary/10 font-semibold">
                  <td colSpan={3} className="text-right text-primary">Total</td>
                  <td className="text-right font-mono text-primary">${totalDebit.toLocaleString()}</td>
                  <td className="text-right font-mono text-primary">${totalCredit.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Entries</p>
            <p className="text-2xl font-bold text-foreground">{filteredEntries.length}</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Debit</p>
            <p className="text-2xl font-bold text-destructive">${totalDebit.toLocaleString()}</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Credit</p>
            <p className="text-2xl font-bold text-success">${totalCredit.toLocaleString()}</p>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default JournalBook;
