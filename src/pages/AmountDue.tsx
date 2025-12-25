import { motion } from "framer-motion";
import { Clock, DollarSign, AlertTriangle } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

interface AmountDueRecord {
  id: number;
  serialNo: number;
  date: string;
  retailerName: string;
  amount: number;
  daysOverdue?: number;
}

const sampleAmountDue: AmountDueRecord[] = [
  { id: 1, serialNo: 1, date: "2024-12-01", retailerName: "ABC Electronics", amount: 12500, daysOverdue: 24 },
  { id: 2, serialNo: 2, date: "2024-12-05", retailerName: "XYZ Supplies Co.", amount: 8750, daysOverdue: 20 },
  { id: 3, serialNo: 3, date: "2024-12-10", retailerName: "Global Tech Ltd.", amount: 23400, daysOverdue: 15 },
  { id: 4, serialNo: 4, date: "2024-12-12", retailerName: "Metro Retailers", amount: 5600 },
  { id: 5, serialNo: 5, date: "2024-12-15", retailerName: "City Distributors", amount: 18900 },
  { id: 6, serialNo: 6, date: "2024-12-18", retailerName: "Prime Wholesale", amount: 7200 },
  { id: 7, serialNo: 7, date: "2024-12-20", retailerName: "Eastern Trading", amount: 15800 },
  { id: 8, serialNo: 8, date: "2024-12-22", retailerName: "Southern Goods Inc.", amount: 9300 },
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

const AmountDue = () => {
  const totalAmount = sampleAmountDue.reduce((sum, r) => sum + r.amount, 0);
  const overdueAmount = sampleAmountDue
    .filter((r) => r.daysOverdue)
    .reduce((sum, r) => sum + r.amount, 0);
  const overdueCount = sampleAmountDue.filter((r) => r.daysOverdue).length;

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
            <p className="text-2xl font-bold text-foreground">${totalAmount.toLocaleString()}</p>
          </div>
          <div className="glow-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              <span className="text-sm text-muted-foreground">Overdue Amount</span>
            </div>
            <p className="text-2xl font-bold text-warning">${overdueAmount.toLocaleString()}</p>
          </div>
          <div className="glow-card p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-destructive" />
              </div>
              <span className="text-sm text-muted-foreground">Overdue Accounts</span>
            </div>
            <p className="text-2xl font-bold text-destructive">{overdueCount}</p>
          </div>
        </motion.div>

        {/* Table */}
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
                {sampleAmountDue.map((record, index) => (
                  <motion.tr
                    key={record.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="font-mono text-muted-foreground">{record.serialNo}</td>
                    <td className="text-muted-foreground">{record.date}</td>
                    <td className="font-medium text-foreground">{record.retailerName}</td>
                    <td className="text-right font-mono font-semibold text-foreground">
                      ${record.amount.toLocaleString()}
                    </td>
                    <td className="text-center">
                      {record.daysOverdue ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-destructive/20 text-destructive border border-destructive/30">
                          <Clock className="w-3 h-3" />
                          {record.daysOverdue} days
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                          Pending
                        </span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bg-primary/10 font-semibold">
                  <td colSpan={3} className="text-right text-primary">Total Amount Due</td>
                  <td className="text-right font-mono text-primary">${totalAmount.toLocaleString()}</td>
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
