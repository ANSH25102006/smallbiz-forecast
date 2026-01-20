import { useState } from "react";
import { Store, MapPin, Plus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoreRegistrationForm from "./StoreRegistrationForm";
import NearbyStoresList from "./NearbyStoresList";

const StoreNetworkSection = () => {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <section className="py-12">
      <div className="rounded-2xl gradient-hero border border-primary/10 p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Store className="h-6 w-6 text-primary" />
              Store Network
            </h2>
            <p className="text-muted-foreground mt-1">
              Connect with grocery stores in your area (~5 km radius)
            </p>
          </div>
          
          <Button variant="hero" size="lg" onClick={() => setShowRegistration(true)}>
            <Plus className="h-5 w-5" />
            Register Your Store
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl bg-card p-4 border border-border/50 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">150+</p>
                <p className="text-xs text-muted-foreground">Registered Stores</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-card p-4 border border-border/50 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">25+</p>
                <p className="text-xs text-muted-foreground">Cities Covered</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-card p-4 border border-border/50 shadow-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-chart-3/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">5 km</p>
                <p className="text-xs text-muted-foreground">Network Radius</p>
              </div>
            </div>
          </div>
        </div>

        {/* Nearby Stores List */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Nearby Stores</h3>
          <NearbyStoresList />
        </div>
      </div>

      {/* Registration Modal */}
      <StoreRegistrationForm open={showRegistration} onOpenChange={setShowRegistration} />
    </section>
  );
};

export default StoreNetworkSection;
