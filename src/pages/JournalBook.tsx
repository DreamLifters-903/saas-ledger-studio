import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, Filter, BookOpen } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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

        {/* Table - Empty State */}
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
                <tr>
                  <td colSpan={5}>
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
                        <BookOpen className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">No journal entries</h3>
                      <p className="text-sm text-muted-foreground">
                        Journal entries will appear here once transactions are recorded.
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-primary/10 font-semibold">
                  <td colSpan={3} className="text-right text-primary">Total</td>
                  <td className="text-right font-mono text-primary">—</td>
                  <td className="text-right font-mono text-primary">—</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Entries</p>
            <p className="text-2xl font-bold text-foreground">0</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Debit</p>
            <p className="text-2xl font-bold text-destructive">—</p>
          </div>
          <div className="dashboard-card">
            <p className="text-sm text-muted-foreground mb-1">Total Credit</p>
            <p className="text-2xl font-bold text-success">—</p>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default JournalBook;
