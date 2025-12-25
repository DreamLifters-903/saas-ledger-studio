import { Bell, Clock, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function TopBar() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-16 bg-card/80 backdrop-blur-sm border-b border-border flex items-center justify-between px-6 sticky top-0 z-30"
    >
      {/* Left Section - Date */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">{currentDate}</span>
        </div>
      </div>

      {/* Right Section - Actions */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full animate-pulse" />
        </Button>

        {/* Reminders */}
        <Button variant="ghost" size="icon" className="relative">
          <Clock className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full" />
        </Button>

        {/* Divider */}
        <div className="w-px h-8 bg-border mx-2" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-foreground">John Smith</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-semibold shadow-glow-sm">
            <User className="w-5 h-5" />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
