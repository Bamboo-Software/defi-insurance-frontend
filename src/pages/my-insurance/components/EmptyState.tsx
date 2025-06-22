import { GlowButton } from "@/components/ui/glow-button";
import { motion } from "framer-motion";
import { PlusIcon, ShieldIcon } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
}

const EmptyState = ({ searchQuery }: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-12"
    >
      <div className="bg-card/50 inline-flex rounded-full p-4 mb-4">
        <ShieldIcon className="h-8 w-8 text-foreground/30" />
      </div>
      <h3 className="text-xl font-medium mb-2">No contracts found</h3>
      <p className="text-foreground/70 mb-6">
        {searchQuery 
          ? "No contracts match your search criteria. Try adjusting your filters."
          : "You don't have any insurance contracts yet."}
      </p>
      <GlowButton>
        <PlusIcon className="mr-2 h-4 w-4" />
        Register Your First Contract
      </GlowButton>
    </motion.div>
  );
};

export default EmptyState;