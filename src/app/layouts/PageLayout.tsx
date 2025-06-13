import { cn } from "@/lib/utils"
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { routesPaths } from "@/types/constants/routes";
import { WalletIcon, ShieldIcon, HomeIcon, MenuIcon, XIcon, LayoutDashboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GlowButton } from "@/components/ui/glow-button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const PageLayout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { ROOT, INSURANCE_PLANS, CONNECT_WALLET, MY_INSURANCE } = routesPaths;

  // Đóng menu di động khi đường dẫn thay đổi
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  // Thêm trình lắng nghe sự kiện cuộn
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: ROOT, label: 'Trang chủ', icon: <HomeIcon className="h-4 w-4" /> },
    { path: INSURANCE_PLANS, label: 'Gói bảo hiểm', icon: <ShieldIcon className="h-4 w-4" /> },
    { path: MY_INSURANCE, label: 'Bảo hiểm của tôi', icon: <LayoutDashboardIcon className="h-4 w-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Thanh điều hướng */}
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled ? 
            "bg-card/80 backdrop-blur-lg shadow-md border-b border-primary/10" : 
            "bg-transparent"
        )}
      >
        {/* Viền gradient ở dưới cùng */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 h-[1px] transition-opacity duration-300",
          isScrolled ? "opacity-100" : "opacity-0"
        )}>
          <div className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-30"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20 px-3 pt-1">
            {/* Logo */}
            <Link to={ROOT} className="flex items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                {/* Hiệu ứng phát sáng logo */}
                <div className="absolute -inset-1 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-cyan-400 to-purple-500 bg-clip-text text-transparent relative z-10">
                  BlockInsure
                </h1>
              </motion.div>
            </Link>

            {/* Điều hướng cho máy tính để bàn */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <NavLink 
                  key={item.path} 
                  to={item.path}
                  className={({ isActive }) => cn(
                    "px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all relative group",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {/* Hiệu ứng phát sáng khi di chuột */}
                  <span className="absolute inset-0 rounded-md bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></span>
                  
                  {item.icon}
                  {item.label}
                </NavLink>
              ))}
              <ThemeToggle />
              <NavLink 
                to={CONNECT_WALLET}
                className={({ isActive }) => cn(
                  "ml-2",
                  isActive ? "opacity-80" : ""
                )}
              >
                <GlowButton size="sm" className="flex items-center gap-1.5">
                  <WalletIcon className="h-4 w-4" />
                  Kết nối ví
                </GlowButton>
              </NavLink>
            </nav>

            {/* Nút menu cho thiết bị di động */}
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Chuyển đổi menu"
                className="relative overflow-hidden group"
              >
                {/* Hiệu ứng khi di chuột qua nút */}
                <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 rounded-full"></span>
                
                {isMobileMenuOpen ? (
                  <XIcon className="h-5 w-5 relative z-10" />
                ) : (
                  <MenuIcon className="h-5 w-5 relative z-10" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Điều hướng cho thiết bị di động */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-card/95 backdrop-blur-lg border-b border-primary/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                >
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => cn(
                      "block px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 transition-all",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
              >
                <NavLink 
                  to={CONNECT_WALLET}
                  className="block px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1.5 bg-gradient-to-r from-primary/20 to-cyan-500/20 text-primary mt-2"
                >
                  <WalletIcon className="h-4 w-4" />
                  Kết nối ví
                </NavLink>
              </motion.div>
            </div>
          </motion.div>
        )}
      </header>

      {/* Nội dung chính */}
      <main 
        className={cn(
          "flex-1 overflow-y-auto pb-4 transition-all duration-300 mt-16",
        )}
      >
        <Outlet />
      </main>
    </div>
  )
}

export default PageLayout