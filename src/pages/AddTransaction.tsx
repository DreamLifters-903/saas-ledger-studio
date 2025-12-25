import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Calendar, Edit2, Trash2, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Transaction {
  id: number;
  date: string;
  particulars: string;
  type: "debit" | "credit";
  amount: number;
}

const sampleTransactions: Transaction[] = [
  { id: 1, date: "2024-12-20", particulars: "Office Supplies", type: "debit", amount: 450 },
  { id: 2, date: "2024-12-19", particulars: "Client Payment - ABC Corp", type: "credit", amount: 5200 },
  { id: 3, date: "2024-12-18", particulars: "Utility Bills", type: "debit", amount: 890 },
  { id: 4, date: "2024-12-17", particulars: "Consulting Fee", type: "credit", amount: 3400 },
  { id: 5, date: "2024-12-16", particulars: "Software Subscription", type: "debit", amount: 299 },
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

const AddTransaction = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(sampleTransactions);
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

        {/* Transactions List */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Transactions</h2>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="dashboard-card p-4 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        transaction.type === "debit"
                          ? "bg-destructive/20 text-destructive"
                          : "bg-success/20 text-success"
                      }`}
                    >
                      {transaction.type === "debit" ? (
                        <ArrowUpRight className="w-5 h-5" />
                      ) : (
                        <ArrowDownLeft className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transaction.particulars}</p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-lg font-semibold ${
                        transaction.type === "debit" ? "text-destructive" : "text-success"
                      }`}
                    >
                      {transaction.type === "debit" ? "-" : "+"}${transaction.amount.toLocaleString()}
                    </span>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="w-8 h-8 text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default AddTransaction;
