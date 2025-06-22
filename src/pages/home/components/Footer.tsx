
const Footer = () => {
  return (
          <footer className="py-12 px-4 bg-card/30 backdrop-blur-sm border-t border-green-300/20 dark:border-green-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-300 dark:from-green-300 dark:to-cyan-200 bg-clip-text text-transparent">
              BlockInsure
              </h3>
              <p className="text-foreground/70 mb-4 max-w-md">
                Revolutionizing the agricultural insurance industry with blockchain technology, providing transparent, secure, and efficient insurance solutions for Vietnamese farmers.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/70 hover:text-green-400 dark:hover:text-green-300 transition-colors">About Us</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-green-400 dark:hover:text-green-300 transition-colors">Insurance Products</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-green-400 dark:hover:text-green-300 transition-colors">Whitepaper</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-green-400 dark:hover:text-green-300 transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/70 hover:text-green-400 dark:hover:text-green-300 transition-colors">Twitter</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-green-400 dark:hover:text-green-300 transition-colors">Facebook</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-green-400 dark:hover:text-green-300 transition-colors">Telegram</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-green-400 dark:hover:text-green-300 transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-green-300/20 dark:border-green-500/20 text-center text-foreground/50 text-sm">
            <p>© {new Date().getFullYear()} . Protecting crops, protecting the future.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer