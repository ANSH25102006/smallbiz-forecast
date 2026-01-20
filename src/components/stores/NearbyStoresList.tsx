import { useQuery } from "@tanstack/react-query";
import { MapPin, Phone, Mail, Store as StoreIcon, CheckCircle, Clock, Search } from "lucide-react";
import { fetchStores, Store } from "@/services/storeService";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const NearbyStoresList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stores, isLoading, error } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });

  const filteredStores = stores?.filter(store => 
    store.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    store.pincode.includes(searchQuery)
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl bg-card p-4 border border-border/50">
            <div className="flex items-start gap-4">
              <Skeleton className="h-12 w-12 rounded-xl" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-60" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-destructive/10 p-6 text-center">
        <p className="text-destructive">Failed to load stores. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by store name, city, or pincode..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stores List */}
      {filteredStores && filteredStores.length > 0 ? (
        <div className="space-y-3">
          {filteredStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-muted/50 p-8 text-center">
          <StoreIcon className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
          <h4 className="font-medium text-foreground mb-1">No Stores Found</h4>
          <p className="text-sm text-muted-foreground">
            {searchQuery ? "Try a different search term" : "Be the first to register your store!"}
          </p>
        </div>
      )}
    </div>
  );
};

const StoreCard = ({ store }: { store: Store }) => {
  return (
    <div className="group rounded-xl bg-card p-4 border border-border/50 shadow-card hover:shadow-elevated transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground flex-shrink-0">
          <StoreIcon className="h-6 w-6" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground truncate">{store.store_name}</h4>
            {store.is_verified ? (
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 flex-shrink-0">
                <CheckCircle className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-chart-4/10 text-chart-4 border-chart-4/20 flex-shrink-0">
                <Clock className="h-3 w-3 mr-1" />
                Pending
              </Badge>
            )}
          </div>
          
          <p className="text-sm text-muted-foreground mb-2">
            Owner: {store.owner_name}
          </p>
          
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {store.city}, {store.pincode}
            </span>
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              +91 {store.phone_number}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" />
              {store.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearbyStoresList;
