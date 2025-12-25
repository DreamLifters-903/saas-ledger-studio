import { motion } from "framer-motion";
import { Bell, Clock, TrendingUp, ArrowUpRight, Wallet, CreditCard, Users, FileText } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

function StatCard({ icon: Icon, label, value, change, positive = true }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -4 }}
      className="glow-card p-6"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        {change && (
          <span
            className={`text-sm font-medium ${positive ? "text-success" : "text-destructive"}`}
          >
            {change}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground mb-1">{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </motion.div>
  );
}

interface NotificationCardProps {
  title: string;
  message: string;
  time: string;
  type: "info" | "warning" | "success";
}

function NotificationCard({ title, message, time, type }: NotificationCardProps) {
  const colors = {
    info: "border-l-info",
    warning: "border-l-warning",
    success: "border-l-success",
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`dashboard-card border-l-4 ${colors[type]}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h4 className="font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{time}</span>
      </div>
    </motion.div>
  );
}

interface ReminderCardProps {
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
}

function ReminderCard({ title, dueDate, priority }: ReminderCardProps) {
  const priorityColors = {
    high: "bg-destructive/20 text-destructive",
    medium: "bg-warning/20 text-warning",
    low: "bg-muted text-muted-foreground",
  };

  return (
    <motion.div
      variants={itemVariants}
      className="dashboard-card flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <div>
          <h4 className="font-medium text-foreground">{title}</h4>
          <p className="text-xs text-muted-foreground">{dueDate}</p>
        </div>
      </div>
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[priority]}`}>
        {priority}
      </span>
    </motion.div>
  );
}

interface QuickActionProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

function QuickAction({ icon: Icon, label, onClick }: QuickActionProps) {
  return (
    <motion.button
      variants={itemVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="glow-card p-4 flex flex-col items-center gap-3 cursor-pointer group"
    >
      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center group-hover:from-primary/30 group-hover:to-secondary/20 transition-all duration-300">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <span className="text-sm font-medium text-foreground">{label}</span>
    </motion.button>
  );
}

const Dashboard = () => {
  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Welcome Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, <span className="text-gradient-primary">John</span>
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your accounts today.
            </p>
          </div>
          <Button className="hidden sm:flex gap-2">
            <TrendingUp className="w-4 h-4" />
            View Reports
            <ArrowUpRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            icon={Wallet}
            label="Total Revenue"
            value="$284,590"
            change="+12.5%"
            positive
          />
          <StatCard
            icon={CreditCard}
            label="Total Expenses"
            value="$142,320"
            change="+3.2%"
            positive={false}
          />
          <StatCard
            icon={Users}
            label="Active Employees"
            value="24"
            change="+2"
            positive
          />
          <StatCard
            icon={FileText}
            label="Pending Invoices"
            value="18"
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            <QuickAction icon={FileText} label="Add Transaction" />
            <QuickAction icon={Users} label="Mark Attendance" />
            <QuickAction icon={Wallet} label="View Ledger" />
            <QuickAction icon={CreditCard} label="Amount Due" />
            <QuickAction icon={TrendingUp} label="Trial Balance" />
            <QuickAction icon={Bell} label="Reminders" />
          </div>
        </motion.div>

        {/* Notifications & Reminders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notifications */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              <NotificationCard
                title="Payment Received"
                message="Invoice #1234 has been paid - $2,450"
                time="2 min ago"
                type="success"
              />
              <NotificationCard
                title="New Employee Added"
                message="Sarah Johnson joined the accounting team"
                time="1 hour ago"
                type="info"
              />
              <NotificationCard
                title="Expense Approval Needed"
                message="Travel expense report requires your approval"
                time="3 hours ago"
                type="warning"
              />
            </div>
          </motion.div>

          {/* Reminders */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                Upcoming Reminders
              </h2>
              <Button variant="ghost" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              <ReminderCard
                title="Quarterly Tax Filing"
                dueDate="Due in 3 days"
                priority="high"
              />
              <ReminderCard
                title="Payroll Processing"
                dueDate="Due in 5 days"
                priority="medium"
              />
              <ReminderCard
                title="Annual Audit Preparation"
                dueDate="Due in 2 weeks"
                priority="low"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default Dashboard;
