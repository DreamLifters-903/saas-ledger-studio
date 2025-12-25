import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, ArrowUpRight, ArrowDownLeft, FileText } from "lucide-react";
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

const AddTransaction = () => {
  const [transactionType, setTransactionType] = useState<"debit" | "credit">("debit");

  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-foreground mb-2">Add Transaction</h1>
          <p className="text-muted-foreground">Record new debit or credit transactions</p>
        </motion.div>

        {/* Form Card */}
        <motion.div variants={itemVariants} className="glow-card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Date Picker */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-muted-foreground">Date</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="bg-muted border-border focus:border-primary pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </div>

            {/* Particulars */}
            <div className="space-y-2">
              <Label htmlFor="particulars" className="text-muted-foreground">Particulars</Label>
              <Input
                id="particulars"
                placeholder="Enter description..."
                className="bg-muted border-border focus:border-primary"
              />
            </div>

            {/* Type Selector */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Type</Label>
              <div className="flex gap-2">
                <button
                  onClick={() => setTransactionType("debit")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                    transactionType === "debit"
                      ? "bg-destructive/20 border-destructive text-destructive"
                      : "bg-muted border-border text-muted-foreground hover:border-destructive/50"
                  }`}
                >
                  <ArrowUpRight className="w-4 h-4" />
                  Debit
                </button>
                <button
                  onClick={() => setTransactionType("credit")}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                    transactionType === "credit"
                      ? "bg-success/20 border-success text-success"
                      : "bg-muted border-border text-muted-foreground hover:border-success/50"
                  }`}
                >
                  <ArrowDownLeft className="w-4 h-4" />
                  Credit
                </button>
              </div>
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="text-muted-foreground">Amount</Label>
              <div className="flex gap-2">
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="bg-muted border-border focus:border-primary"
                />
                <Button className="px-6">
                  <Plus className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Transactions List - Empty State */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h2>
          <div className="glow-card">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">No transactions yet</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Start by adding your first transaction using the form above.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default AddTransaction;
