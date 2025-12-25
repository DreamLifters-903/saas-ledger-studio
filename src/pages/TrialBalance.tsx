import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Scale, FileSpreadsheet } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          <div className="dashboard-card px-4 py-2 flex items-center gap-2 border-muted">
            <Scale className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">No data available</span>
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

        {/* Trial Balance Table - Empty State */}
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
                <tr>
                  <td colSpan={3}>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
                        <FileSpreadsheet className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">No trial balance data</h3>
                      <p className="text-sm text-muted-foreground">
                        Trial balance will be generated from your transactions.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-primary/10 font-bold">
                  <td className="text-primary">Totals</td>
                  <td className="text-right font-mono text-primary">—</td>
                  <td className="text-right font-mono text-primary">—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Accounts</p>
            <p className="text-2xl font-bold text-foreground">0</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Debit</p>
            <p className="text-2xl font-bold text-foreground">—</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Credit</p>
            <p className="text-2xl font-bold text-foreground">—</p>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default TrialBalance;
