import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, Store, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoreRegistrationForm from "@/components/stores/StoreRegistrationForm";

const SellerRegistration = () => {
  const navigate = useNavigate();
  const [showRegistration, setShowRegistration] = useState(false);

  const handleSkip = () => {
    localStorage.setItem("seller_registered", "skipped");
    navigate("/dashboard");
  };

  const handleRegistrationSuccess = () => {
    setShowRegistration(false);
    localStorage.setItem("seller_registered", "true");
    navigate("/dashboard");
  };

  const features = [
    "Connect with 150+ grocery stores in your network",
    "Access AI-powered demand forecasting",
    "Manage inventory efficiently",
    "Share insights with nearby sellers",
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-card">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">ForecastPro</h1>
              <p className="text-xs text-muted-foreground">Retail Demand Intelligence</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary shadow-elevated mb-6">
              <Store className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Welcome to the Seller Network
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Register your store to connect with other sellers in your area, access demand forecasts, 
              and grow your business with data-driven insights.
            </p>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-4 mb-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-card"
              >
                <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                <span className="text-foreground">{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="hero"
              size="lg"
              onClick={() => setShowRegistration(true)}
              className="gap-2"
            >
              <Store className="h-5 w-5" />
              Register Your Store
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleSkip}
            >
              Skip for Now
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center text-sm text-muted-foreground mt-6"
          >
            You can always register later from the Store Network section
          </motion.p>
        </div>
      </main>

      {/* Registration Modal */}
      <StoreRegistrationForm 
        open={showRegistration} 
        onOpenChange={setShowRegistration}
        onSuccess={handleRegistrationSuccess}
      />
    </div>
  );
};

export default SellerRegistration;
