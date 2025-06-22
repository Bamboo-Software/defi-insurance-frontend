import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { FilterIcon, SearchIcon } from "lucide-react";

type StatusType = 'all' | 'active' | 'expired' | 'pending' | 'claimed';

interface FilterBarProps {
  activeTab: StatusType;
  setActiveTab: (tab: StatusType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const FilterBar = ({ activeTab, setActiveTab, searchQuery, setSearchQuery }: FilterBarProps) => {
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="border border-primary/10">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search contracts by name or ID..."
                  className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
              <span className="text-sm text-foreground/70 flex items-center gap-1">
                <FilterIcon className="h-4 w-4" /> Filter:
              </span>
              <Button 
                variant={activeTab === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('all')}
                className="whitespace-nowrap"
              >
                All
              </Button>
              <Button 
                variant={activeTab === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('active')}
                className="whitespace-nowrap"
              >
                Active
              </Button>
              <Button 
                variant={activeTab === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('pending')}
                className="whitespace-nowrap"
              >
                Pending
              </Button>
              <Button 
                variant={activeTab === 'claimed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('claimed')}
                className="whitespace-nowrap"
              >
                Claimed
              </Button>
              <Button 
                variant={activeTab === 'expired' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('expired')}
                className="whitespace-nowrap"
              >
                Expired
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default FilterBar;