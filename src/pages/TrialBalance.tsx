import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Scale, CheckCircle, XCircle } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TrialBalanceAccount {
  id: number;
  accountName: string;
  debit: number | null;
  credit: number | null;
}

const sampleTrialBalance: TrialBalanceAccount[] = [
  { id: 1, accountName: "Cash Account", debit: 56961, credit: null },
  { id: 2, accountName: "Bank Account", debit: 245000, credit: null },
  { id: 3, accountName: "Accounts Receivable", debit: 78500, credit: null },
  { id: 4, accountName: "Office Supplies", debit: 4500, credit: null },
  { id: 5, accountName: "Furniture & Equipment", debit: 35000, credit: null },
  { id: 6, accountName: "Accounts Payable", debit: null, credit: 42500 },
  { id: 7, accountName: "Loans Payable", debit: null, credit: 120000 },
  { id: 8, accountName: "Owner's Equity", debit: null, credit: 150000 },
  { id: 9, accountName: "Sales Revenue", debit: null, credit: 185200 },
  { id: 10, accountName: "Consulting Revenue", debit: null, credit: 45800 },
  { id: 11, accountName: "Salary Expense", debit: 85000, credit: null },
  { id: 12, accountName: "Rent Expense", debit: 24000, credit: null },
  { id: 13, accountName: "Utility Expense", debit: 8900, credit: null },
  { id: 14, accountName: "Insurance Expense", debit: 5639, credit: null },
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

const TrialBalance = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

  const totalDebit = sampleTrialBalance.reduce((sum, a) => sum + (a.debit || 0), 0);
  const totalCredit = sampleTrialBalance.reduce((sum, a) => sum + (a.credit || 0), 0);
  const isBalanced = totalDebit === totalCredit;

  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Trial Balance</h1>
            <p className="text-muted-foreground">Verify that debits equal credits</p>
          </div>
          <div
            className={`dashboard-card px-4 py-2 flex items-center gap-2 ${
              isBalanced ? "border-success/30" : "border-destructive/30"
            }`}
          >
            {isBalanced ? (
              <>
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="text-sm font-medium text-success">Balanced</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-destructive" />
                <span className="text-sm font-medium text-destructive">Unbalanced</span>
              </>
            )}
          </div>
        </motion.div>

        {/* Date Selector */}
        <motion.div variants={itemVariants} className="glow-card p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <Label className="text-muted-foreground text-xs">Report Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-muted border-border w-40 mt-1"
              />
            </div>
          </div>
          <Button variant="outline" className="sm:ml-auto">
            <Scale className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
        </motion.div>

        {/* Trial Balance Table */}
        <motion.div variants={itemVariants} className="glow-card p-0 overflow-hidden">
          <div className="bg-primary/10 px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-primary">Trial Balance as of {selectedDate}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Account Name</th>
                  <th className="w-40 text-right">Debit ($)</th>
                  <th className="w-40 text-right">Credit ($)</th>
                </tr>
              </thead>
              <tbody>
                {sampleTrialBalance.map((account, index) => (
                  <motion.tr
                    key={account.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="font-medium text-foreground">{account.accountName}</td>
                    <td className="text-right font-mono">
                      {account.debit ? (
                        <span className="text-foreground">${account.debit.toLocaleString()}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="text-right font-mono">
                      {account.credit ? (
                        <span className="text-foreground">${account.credit.toLocaleString()}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-primary/10 font-bold">
                  <td className="text-primary">Totals</td>
                  <td className="text-right font-mono text-primary">${totalDebit.toLocaleString()}</td>
                  <td className="text-right font-mono text-primary">${totalCredit.toLocaleString()}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Accounts</p>
            <p className="text-2xl font-bold text-foreground">{sampleTrialBalance.length}</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Debit</p>
            <p className="text-2xl font-bold text-foreground">${totalDebit.toLocaleString()}</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Credit</p>
            <p className="text-2xl font-bold text-foreground">${totalCredit.toLocaleString()}</p>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default TrialBalance;
