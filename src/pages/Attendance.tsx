import { useState } from "react";
import { motion } from "framer-motion";
import { UserCheck, UserX, Clock, Save, Users } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const statusConfig = {
  present: {
    label: "Present",
    icon: UserCheck,
    buttonActive: "bg-success text-success-foreground",
  },
  absent: {
    label: "Absent",
    icon: UserX,
    buttonActive: "bg-destructive text-destructive-foreground",
  },
  parttime: {
    label: "Part Time",
    icon: Clock,
    buttonActive: "bg-warning text-warning-foreground",
  },
};

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

const Attendance = () => {
  const [selectedStatus, setSelectedStatus] = useState<"present" | "absent" | "parttime">("present");

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
            <h1 className="text-3xl font-bold text-foreground mb-2">Attendance</h1>
            <p className="text-muted-foreground">{today}</p>
          </div>
          <div className="flex gap-3">
            <div className="dashboard-card px-4 py-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-success" />
              <span className="text-sm font-medium">0 Present</span>
            </div>
            <div className="dashboard-card px-4 py-2 flex items-center gap-2">
              <UserX className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">0 Absent</span>
            </div>
            <div className="dashboard-card px-4 py-2 flex items-center gap-2">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium">0 Part Time</span>
            </div>
          </div>
        </motion.div>

        {/* Input Section */}
        <motion.div variants={itemVariants} className="glow-card p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Mark Attendance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Employee Number */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Employee Number</Label>
              <Input
                placeholder="Enter employee ID..."
                className="bg-muted border-border"
              />
            </div>

            {/* Status Selector */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Status</Label>
              <div className="flex gap-2">
                {(["present", "absent", "parttime"] as const).map((status) => {
                  const config = statusConfig[status];
                  const Icon = config.icon;
                  return (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={cn(
                        "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border transition-all duration-200 text-sm",
                        selectedStatus === status
                          ? config.buttonActive
                          : "bg-muted border-border text-muted-foreground hover:bg-muted/80"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:inline">{config.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time (for part time) */}
            <div className="space-y-2">
              <Label className="text-muted-foreground">Hours (Part Time)</Label>
              <select
                className="w-full h-10 px-3 py-2 bg-muted border border-border rounded-lg text-foreground focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all"
                disabled={selectedStatus !== "parttime"}
              >
                <option value="">Select hours</option>
                <option value="2">2 hours</option>
                <option value="4">4 hours</option>
                <option value="6">6 hours</option>
              </select>
            </div>

            {/* Update Button */}
            <div className="space-y-2">
              <Label className="text-muted-foreground opacity-0 hidden sm:block">Action</Label>
              <Button className="w-full gap-2">
                <Save className="w-4 h-4" />
                Update
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Attendance Table - Empty State */}
        <motion.div variants={itemVariants}>
          <h2 className="text-lg font-semibold text-foreground mb-4">Today's Attendance</h2>
          <div className="glow-card p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="w-28">Employee ID</th>
                    <th>Employee Name</th>
                    <th className="w-36">Status</th>
                    <th className="w-28">Hours</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={4}>
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="w-16 h-16 rounded-xl bg-muted flex items-center justify-center mb-4">
                          <Users className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">No attendance records</h3>
                        <p className="text-sm text-muted-foreground">
                          Start marking attendance using the form above.
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </MainLayout>
  );
};

export default Attendance;
