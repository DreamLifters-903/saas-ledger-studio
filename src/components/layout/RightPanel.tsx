import { motion } from "framer-motion";
import { Banknote, Building2, BarChart3, Users, Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShortcutCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  variant?: "default" | "primary" | "secondary";
}

function ShortcutCard({ icon: Icon, label, value, variant = "default" }: ShortcutCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "glow-card cursor-pointer p-4",
        variant === "primary" && "border-primary/30",
        variant === "secondary" && "border-secondary/30"
      )}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center mb-3",
          variant === "default" && "bg-muted",
          variant === "primary" && "bg-primary/20 text-primary",
          variant === "secondary" && "bg-secondary/20 text-secondary"
        )}
      >
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </motion.div>
  );
}

export function RightPanel() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="hidden xl:block w-72 border-l border-border bg-card/50 p-4 space-y-4"
    >
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider px-1">
        Quick Summary
      </h3>

      <div className="space-y-3">
        <ShortcutCard
          icon={Banknote}
          label="Total Cash"
          value="—"
          variant="primary"
        />
        <ShortcutCard
          icon={Building2}
          label="Total Bank Amount"
          value="—"
          variant="secondary"
        />
        <ShortcutCard
          icon={BarChart3}
          label="Analytics"
          value="View Report"
        />
        <ShortcutCard
          icon={Users}
          label="Employee Details"
          value="0 Active"
        />
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-3">
          Recent Activity
        </h4>
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-2">
            <Inbox className="w-5 h-5 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No recent activity</p>
        </div>
      </div>
    </motion.aside>
  );
}
