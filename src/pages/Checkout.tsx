import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Truck, Package, CheckCircle2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const paymentMethods = [
  { id: 'stripe', name: 'Stripe', icon: CreditCard, description: 'Pay with Card' },
  { id: 'razorpay', name: 'Razorpay', icon: CreditCard, description: 'UPI, Cards, Netbanking' },
  { id: 'paytm', name: 'Paytm', icon: CreditCard, description: 'Wallet & UPI' },
  { id: 'x402', name: 'X402', icon: CreditCard, description: 'Crypto Payment' },
];

const Checkout = () => {
  const { state, totalPrice, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('razorpay');
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const shippingCost = totalPrice > 2000 ? 0 : 150;
  const finalTotal = totalPrice + shippingCost;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(shippingInfo).some((v) => !v.trim())) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all shipping details.',
        variant: 'destructive',
      });
      return;
    }
    setStep(2);
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Login Required',
        description: 'Please login to complete your purchase.',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate success (in real app, integrate with payment gateway)
    toast({
      title: 'Payment Successful! 🎉',
      description: 'Your order has been placed. Check your email for confirmation.',
    });

    clearCart();
    setStep(3);
    setIsProcessing(false);
  };

  if (state.items.length === 0 && step !== 3) {
    return (
      <div className="min-h-screen bg-background dark flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="py-12">
            <Package className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some products before checking out.
            </p>
            <Button asChild>
              <Link to="/products">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark">
      {/* Header */}
      <header className="border-b border-border py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <span className="font-display text-xl font-semibold">
                <span className="text-primary">Elektor</span>
                <span className="text-foreground">Fun</span>
              </span>
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {[
            { num: 1, label: 'Shipping' },
            { num: 2, label: 'Payment' },
            { num: 3, label: 'Complete' },
          ].map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div
                className={cn(
                  'flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm',
                  step >= s.num
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                {step > s.num ? <CheckCircle2 className="h-5 w-5" /> : s.num}
              </div>
              <span
                className={cn(
                  'ml-2 text-sm',
                  step >= s.num ? 'text-foreground' : 'text-muted-foreground'
                )}
              >
                {s.label}
              </span>
              {i < 2 && (
                <div
                  className={cn(
                    'w-12 h-0.5 mx-4',
                    step > s.num ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {step === 3 ? (
          /* Order Complete */
          <Card className="max-w-lg mx-auto text-center">
            <CardContent className="py-12">
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-success" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
              <p className="text-muted-foreground mb-6">
                Thank you for shopping with ElektorFun. A confirmation email has been sent to your registered email address.
              </p>
              <div className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/products">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                /* Shipping Form */
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-primary" />
                      Shipping Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleShippingSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name *</Label>
                          <Input
                            id="fullName"
                            value={shippingInfo.fullName}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                            }
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={shippingInfo.phone}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, phone: e.target.value })
                            }
                            placeholder="+91 98765 43210"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address *</Label>
                        <Textarea
                          id="address"
                          value={shippingInfo.address}
                          onChange={(e) =>
                            setShippingInfo({ ...shippingInfo, address: e.target.value })
                          }
                          placeholder="House No, Building, Street, Area"
                          required
                        />
                      </div>

                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={shippingInfo.city}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, city: e.target.value })
                            }
                            placeholder="Mumbai"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State *</Label>
                          <Input
                            id="state"
                            value={shippingInfo.state}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, state: e.target.value })
                            }
                            placeholder="Maharashtra"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pincode">PIN Code *</Label>
                          <Input
                            id="pincode"
                            value={shippingInfo.pincode}
                            onChange={(e) =>
                              setShippingInfo({ ...shippingInfo, pincode: e.target.value })
                            }
                            placeholder="400001"
                            required
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full glow-primary" size="lg">
                        Continue to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                /* Payment Selection */
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={selectedPayment}
                      onValueChange={setSelectedPayment}
                      className="space-y-3"
                    >
                      {paymentMethods.map((method) => (
                        <div
                          key={method.id}
                          className={cn(
                            'flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer',
                            selectedPayment === method.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          )}
                          onClick={() => setSelectedPayment(method.id)}
                        >
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label
                            htmlFor={method.id}
                            className="flex-1 cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <method.icon className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{method.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {method.description}
                                </p>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        onClick={() => setStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="flex-1 glow-primary"
                      >
                        {isProcessing ? 'Processing...' : `Pay ${formatPrice(finalTotal)}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {state.items.map((item) => (
                      <div key={item.product.id} className="flex gap-3">
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-contain p-1"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">
                            {item.product.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold text-primary">
                            {formatPrice(item.product.priceINR * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Totals */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className={shippingCost === 0 ? 'text-success' : ''}>
                        {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}
                      </span>
                    </div>
                    {shippingCost > 0 && (
                      <p className="text-xs text-muted-foreground">
                        Free shipping on orders above ₹2,000
                      </p>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary font-display">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
