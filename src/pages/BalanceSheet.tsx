import { motion } from "framer-motion";
import { FileSpreadsheet, ArrowRight } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

interface BalanceItem {
  id: number;
  name: string;
  amount: number;
}

const liabilities: BalanceItem[] = [
  { id: 1, name: "Accounts Payable", amount: 42500 },
  { id: 2, name: "Notes Payable", amount: 25000 },
  { id: 3, name: "Accrued Expenses", amount: 8750 },
  { id: 4, name: "Loans Payable", amount: 120000 },
  { id: 5, name: "Unearned Revenue", amount: 15000 },
];

const equity: BalanceItem[] = [
  { id: 6, name: "Owner's Capital", amount: 150000 },
  { id: 7, name: "Retained Earnings", amount: 85400 },
];

const assets: BalanceItem[] = [
  { id: 8, name: "Cash", amount: 56961 },
  { id: 9, name: "Bank Accounts", amount: 245000 },
  { id: 10, name: "Accounts Receivable", amount: 78500 },
  { id: 11, name: "Inventory", amount: 45000 },
  { id: 12, name: "Prepaid Expenses", amount: 12000 },
  { id: 13, name: "Office Equipment", amount: 35000 },
  { id: 14, name: "Furniture & Fixtures", amount: 18189 },
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

const BalanceSheet = () => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.amount, 0);
  const totalEquity = equity.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = assets.reduce((sum, item) => sum + item.amount, 0);
  const liabilitiesAndEquity = totalLiabilities + totalEquity;

  return (
    <MainLayout showRightPanel={false}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Balance Sheet</h1>
            <p className="text-muted-foreground">Financial position as of {currentDate}</p>
          </div>
          <div className="dashboard-card px-4 py-2 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">Statement of Financial Position</span>
          </div>
        </motion.div>

        {/* Two Column Layout */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Liabilities & Equity Column */}
          <div className="space-y-4">
            {/* Liabilities */}
            <div className="glow-card p-0 overflow-hidden">
              <div className="bg-destructive/10 px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-destructive">Liabilities</h3>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <tbody>
                    {liabilities.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td className="py-3 text-foreground">{item.name}</td>
                        <td className="py-3 text-right font-mono text-foreground">
                          ${item.amount.toLocaleString()}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold">
                      <td className="py-3 text-destructive">Total Liabilities</td>
                      <td className="py-3 text-right font-mono text-destructive">
                        ${totalLiabilities.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Equity */}
            <div className="glow-card p-0 overflow-hidden">
              <div className="bg-primary/10 px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-primary">Owner's Equity</h3>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <tbody>
                    {equity.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td className="py-3 text-foreground">{item.name}</td>
                        <td className="py-3 text-right font-mono text-foreground">
                          ${item.amount.toLocaleString()}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold">
                      <td className="py-3 text-primary">Total Equity</td>
                      <td className="py-3 text-right font-mono text-primary">
                        ${totalEquity.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Liabilities + Equity Total */}
            <div className="dashboard-card border-secondary/30">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total Liabilities & Equity</span>
                <span className="text-xl font-bold text-secondary">
                  ${liabilitiesAndEquity.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Assets Column */}
          <div className="space-y-4">
            <div className="glow-card p-0 overflow-hidden">
              <div className="bg-success/10 px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-success">Assets</h3>
              </div>
              <div className="p-4">
                <table className="w-full">
                  <tbody>
                    {assets.map((item, index) => (
                      <motion.tr
                        key={item.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="border-b border-border/50 last:border-0"
                      >
                        <td className="py-3 text-foreground">{item.name}</td>
                        <td className="py-3 text-right font-mono text-foreground">
                          ${item.amount.toLocaleString()}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-semibold">
                      <td className="py-3 text-success">Total Assets</td>
                      <td className="py-3 text-right font-mono text-success">
                        ${totalAssets.toLocaleString()}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Assets Total */}
            <div className="dashboard-card border-success/30">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total Assets</span>
                <span className="text-xl font-bold text-success">
                  ${totalAssets.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Balance Check */}
            <div
              className={`dashboard-card flex items-center justify-center gap-3 py-4 ${
                totalAssets === liabilitiesAndEquity
                  ? "border-success/30 bg-success/5"
                  : "border-destructive/30 bg-destructive/5"
              }`}
            >
              <span className="text-lg text-muted-foreground">Liabilities + Equity</span>
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
              <span className="text-lg text-muted-foreground">Assets</span>
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                  totalAssets === liabilitiesAndEquity
                    ? "bg-success/20 text-success"
                    : "bg-destructive/20 text-destructive"
                }`}
              >
                {totalAssets === liabilitiesAndEquity ? "Balanced ✓" : "Unbalanced ✗"}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default BalanceSheet;
