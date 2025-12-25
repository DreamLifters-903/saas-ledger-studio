import { motion } from "framer-motion";
import { Clock, DollarSign, AlertTriangle, FileText } from "lucide-react";
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

const AmountDue = () => {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Amount Due</h1>
          <p className="text-muted-foreground">Track outstanding payments from retailers</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="glow-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Total Outstanding</span>
            </div>
            <p className="text-2xl font-bold text-foreground">—</p>
          </div>
          <div className="glow-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Overdue Amount</span>
            </div>
            <p className="text-2xl font-bold text-warning">—</p>
          </div>
          <div className="glow-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Overdue Accounts</span>
            </div>
            <p className="text-2xl font-bold text-destructive">0</p>
          </div>
        </motion.div>

        {/* Table - Empty State */}
        <motion.div variants={itemVariants} className="glow-card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="w-20">S.No</th>
                  <th className="w-32">Date</th>
                  <th>Retailer Name</th>
                  <th className="w-36 text-right">Amount ($)</th>
                  <th className="w-32 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
                        <FileText className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">No outstanding amounts</h3>
                      <p className="text-sm text-muted-foreground">
                        Outstanding payments will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-primary/10 font-semibold">
                  <td colSpan={3} className="text-right text-primary">Total Amount Due</td>
                  <td className="text-right font-mono text-primary">—</td>
                  <td></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default AmountDue;
