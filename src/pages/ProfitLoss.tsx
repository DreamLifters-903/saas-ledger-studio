import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, DollarSign, Percent, Calculator } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ProfitLoss = () => {
  const [revenue, setRevenue] = useState(285000);
  const [expenses, setExpenses] = useState(142000);
  const [taxRate, setTaxRate] = useState(25);

  const grossProfit = revenue - expenses;
  const taxAmount = (grossProfit * taxRate) / 100;
  const netProfit = grossProfit - taxAmount;
  const profitMargin = ((netProfit / revenue) * 100).toFixed(1);

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
          <h1 className="text-3xl font-bold text-foreground mb-2">Profit & Loss</h1>
          <p className="text-muted-foreground">Calculate and analyze your profit margins</p>
        </motion.div>

        {/* Input Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Revenue */}
          <div className="glow-card p-6 border-success/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-success/20 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Total Revenue</Label>
                <p className="text-sm text-success font-medium">Income</p>
              </div>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(Number(e.target.value))}
                className="pl-9 bg-muted border-border text-lg font-semibold"
              />
            </div>
          </div>

          {/* Expenses */}
          <div className="glow-card p-6 border-destructive/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-destructive/20 flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Total Expenses</Label>
                <p className="text-sm text-destructive font-medium">Outgoing</p>
              </div>
            </div>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="number"
                value={expenses}
                onChange={(e) => setExpenses(Number(e.target.value))}
                className="pl-9 bg-muted border-border text-lg font-semibold"
              />
            </div>
          </div>

          {/* Tax Rate */}
          <div className="glow-card p-6 border-warning/20">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-warning/20 flex items-center justify-center">
                <Percent className="w-6 h-6 text-warning" />
              </div>
              <div>
                <Label className="text-muted-foreground text-xs">Tax Rate</Label>
                <p className="text-sm text-warning font-medium">Percentage</p>
              </div>
            </div>
            <div className="relative">
              <Input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="pr-9 bg-muted border-border text-lg font-semibold"
                min={0}
                max={100}
              />
              <Percent className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
          </div>
        </motion.div>

        {/* Calculate Button */}
        <motion.div variants={itemVariants} className="flex justify-center">
          <Button size="lg" className="gap-2 px-8">
            <Calculator className="w-5 h-5" />
            Calculate Profit
          </Button>
        </motion.div>

        {/* Results */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Gross Profit */}
          <motion.div
            whileHover={{ y: -4 }}
            className="glow-card p-6 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
            <div className="relative">
              <p className="text-sm text-muted-foreground mb-2">Gross Profit</p>
              <p className="text-3xl font-bold text-foreground mb-1">
                ${grossProfit.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Revenue - Expenses
              </p>
            </div>
          </motion.div>

          {/* Tax Amount */}
          <motion.div
            whileHover={{ y: -4 }}
            className="glow-card p-6 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warning/5 via-transparent to-warning/5" />
            <div className="relative">
              <p className="text-sm text-muted-foreground mb-2">Tax Amount</p>
              <p className="text-3xl font-bold text-warning mb-1">
                ${taxAmount.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                {taxRate}% of Gross Profit
              </p>
            </div>
          </motion.div>

          {/* Net Profit */}
          <motion.div
            whileHover={{ y: -4 }}
            className="glow-card p-6 text-center relative overflow-hidden border-success/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-success/10 via-transparent to-success/5" />
            <div className="relative">
              <p className="text-sm text-muted-foreground mb-2">Net Profit</p>
              <p
                className={`text-3xl font-bold mb-1 ${
                  netProfit >= 0 ? "text-success" : "text-destructive"
                }`}
              >
                ${netProfit.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Gross Profit - Tax
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Profit Margin Card */}
        <motion.div variants={itemVariants}>
          <div className="glow-card p-6 max-w-md mx-auto text-center">
            <p className="text-sm text-muted-foreground mb-2">Profit Margin</p>
            <div className="flex items-center justify-center gap-2">
              <span
                className={`text-5xl font-bold ${
                  Number(profitMargin) >= 0 ? "text-gradient-primary" : "text-destructive"
                }`}
              >
                {profitMargin}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Net Profit / Revenue × 100
            </p>
            
            {/* Visual Progress Bar */}
            <div className="mt-4 h-3 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(Math.max(Number(profitMargin), 0), 100)}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Summary Table */}
        <motion.div variants={itemVariants} className="glow-card p-0 overflow-hidden">
          <div className="bg-primary/10 px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-primary">Income Statement Summary</h3>
          </div>
          <div className="p-4">
            <table className="w-full">
              <tbody>
                <tr className="border-b border-border/50">
                  <td className="py-3 text-foreground font-medium">Total Revenue</td>
                  <td className="py-3 text-right font-mono text-success">
                    + ${revenue.toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 text-foreground font-medium">Total Expenses</td>
                  <td className="py-3 text-right font-mono text-destructive">
                    - ${expenses.toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 text-foreground font-medium">Gross Profit</td>
                  <td className="py-3 text-right font-mono text-foreground">
                    ${grossProfit.toLocaleString()}
                  </td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 text-foreground font-medium">Tax ({taxRate}%)</td>
                  <td className="py-3 text-right font-mono text-warning">
                    - ${taxAmount.toLocaleString()}
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <td className="py-3 text-primary text-lg">Net Profit</td>
                  <td
                    className={`py-3 text-right font-mono text-lg ${
                      netProfit >= 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    ${netProfit.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default ProfitLoss;
