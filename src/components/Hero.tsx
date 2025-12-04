import { ArrowRight, Zap, Cpu, CircuitBoard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32 circuit-pattern">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-slide-up">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Premium Electronics Components
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up [animation-delay:100ms]">
            <span className="text-foreground">Build Your </span>
            <span className="text-gradient">Electronics</span>
            <br />
            <span className="text-foreground">Projects with </span>
            <span className="text-gradient">ElektorFun</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up [animation-delay:200ms]">
            Discover premium electronic modules, displays, power supplies, and testing equipment. 
            Quality components for makers, hobbyists, and professionals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up [animation-delay:300ms]">
            <Button
              size="lg"
              className="glow-primary text-lg px-8 h-14"
              asChild
            >
              <Link to="/products">
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 h-14"
              asChild
            >
              <Link to="/products">Browse Catalog</Link>
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-16 animate-slide-up [animation-delay:400ms]">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Cpu className="h-5 w-5 text-primary" />
              <span>Quality Tested</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CircuitBoard className="h-5 w-5 text-primary" />
              <span>Fast Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Zap className="h-5 w-5 text-primary" />
              <span>Best Prices in INR</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
