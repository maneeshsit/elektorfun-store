import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedProducts } from '@/components/FeaturedProducts';
import { CartSidebar } from '@/components/CartSidebar';
import { Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      <Navbar />
      <CartSidebar />
      <main>
        <Hero />
        <FeaturedProducts />
        
        {/* Footer */}
        <footer className="border-t border-border py-12 mt-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="font-display text-lg font-semibold">
                  <span className="text-primary">Elektor</span>
                  <span className="text-foreground">Fun</span>
                </span>
              </div>
              <p className="text-muted-foreground text-sm text-center">
                © 2024 ElektorFun. Premium electronics for makers and hobbyists.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
