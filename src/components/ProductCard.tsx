import { ShoppingCart, Check } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden card-hover bg-card border-border/50">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
        />
        <Badge
          variant="secondary"
          className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm"
        >
          {product.category}
        </Badge>
        {product.inStock && (
          <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
            In Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Product Name */}
        <h3 className="font-semibold text-foreground line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Specs */}
        <div className="flex flex-wrap gap-1">
          {product.specs.slice(0, 2).map((spec) => (
            <span
              key={spec}
              className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <div>
            <span className="text-2xl font-bold text-primary font-display">
              {formatPrice(product.priceINR)}
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={isAdded}
            className={cn(
              'transition-all duration-300',
              isAdded && 'bg-success hover:bg-success'
            )}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 mr-1" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-1" />
                Add
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
