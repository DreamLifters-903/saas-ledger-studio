import { motion } from "framer-motion";
import { FileSpreadsheet } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

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
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground text-sm">No liabilities recorded</p>
                </div>
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-destructive">Total Liabilities</span>
                    <span className="font-mono text-destructive">—</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Equity */}
            <div className="glow-card p-0 overflow-hidden">
              <div className="bg-primary/10 px-4 py-3 border-b border-border">
                <h3 className="font-semibold text-primary">Owner's Equity</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground text-sm">No equity recorded</p>
                </div>
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-primary">Total Equity</span>
                    <span className="font-mono text-primary">—</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Liabilities + Equity Total */}
            <div className="dashboard-card border-secondary/30">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total Liabilities & Equity</span>
                <span className="text-xl font-bold text-secondary">—</span>
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
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-muted-foreground text-sm">No assets recorded</p>
                </div>
                <div className="border-t border-border pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-success">Total Assets</span>
                    <span className="font-mono text-success">—</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Assets Total */}
            <div className="dashboard-card border-success/30">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">Total Assets</span>
                <span className="text-xl font-bold text-success">—</span>
              </div>
            </div>

            {/* Balance Check */}
            <div className="dashboard-card flex items-center justify-center gap-3 py-4 border-muted">
              <span className="text-muted-foreground text-sm">Balance status will appear when data is available</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default BalanceSheet;
