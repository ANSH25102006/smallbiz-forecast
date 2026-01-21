import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { fetchStores, Store } from "@/services/storeService";
import { MapPin, Phone, Mail, Store as StoreIcon, CheckCircle, Clock, TrendingUp, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import "leaflet/dist/leaflet.css";

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom store marker icon
const createStoreIcon = (isVerified: boolean) => {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 40px;
        height: 40px;
        background: ${isVerified ? "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(199 89% 48%) 100%)" : "linear-gradient(135deg, hsl(43 96% 56%) 0%, hsl(43 96% 46%) 100%)"};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        border: 3px solid white;
      ">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
          <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
          <path d="M2 7h20" />
          <path d="M22 7v3a2 2 0 0 1-2 2v0a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12v0a2 2 0 0 1-2-2V7" />
        </svg>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

// Component to handle map centering
const MapCenterController = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, 12);
    }
  }, [center, map]);
  
  return null;
};

const StoreMap = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  
  const { data: stores, isLoading, error } = useQuery({
    queryKey: ["stores"],
    queryFn: fetchStores,
  });

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Default to Mumbai if geolocation fails
          setUserLocation([19.076, 72.8777]);
        }
      );
    } else {
      setUserLocation([19.076, 72.8777]);
    }
  }, []);

  if (isLoading || !userLocation) {
    return (
      <div className="rounded-xl overflow-hidden border border-border/50">
        <Skeleton className="w-full h-[500px]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-destructive/10 p-6 text-center h-[500px] flex items-center justify-center">
        <p className="text-destructive">Failed to load map. Please try again.</p>
      </div>
    );
  }

  // Filter stores with valid coordinates
  const storesWithCoords = stores?.filter(
    (store) => store.latitude && store.longitude
  ) || [];

  return (
    <div className="rounded-xl overflow-hidden border border-border/50 shadow-card">
      <MapContainer
        center={userLocation}
        zoom={12}
        style={{ height: "500px", width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapCenterController center={userLocation} />
        
        {/* User location marker */}
        <Marker
          position={userLocation}
          icon={L.divIcon({
            className: "user-marker",
            html: `
              <div style="
                width: 24px;
                height: 24px;
                background: hsl(221 83% 53%);
                border-radius: 50%;
                border: 4px solid white;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                animation: pulse 2s infinite;
              "></div>
            `,
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          })}
        >
          <Popup>
            <div className="text-center p-2">
              <p className="font-semibold">Your Location</p>
            </div>
          </Popup>
        </Marker>

        {/* Store markers */}
        {storesWithCoords.map((store) => (
          <Marker
            key={store.id}
            position={[store.latitude!, store.longitude!]}
            icon={createStoreIcon(store.is_verified || false)}
          >
            <Popup minWidth={300} maxWidth={350}>
              <StorePopupContent store={store} />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map Legend */}
      <div className="bg-card p-4 border-t border-border/50">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full gradient-primary" />
            <span className="text-muted-foreground">Verified Store</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-chart-4" />
            <span className="text-muted-foreground">Pending Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">Your Location</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Popup content component
const StorePopupContent = ({ store }: { store: Store }) => {
  // Mock sales data - in production this would come from the database
  const mockSales = {
    monthlySales: `₹${Math.floor(Math.random() * 50000 + 20000).toLocaleString()}`,
    productsCount: Math.floor(Math.random() * 200 + 50),
    trend: `+${(Math.random() * 20 + 5).toFixed(1)}%`,
  };

  return (
    <div className="p-2 min-w-[280px]">
      {/* Header */}
      <div className="flex items-start gap-3 mb-3">
        <div 
          className="flex h-12 w-12 items-center justify-center rounded-xl flex-shrink-0"
          style={{ background: "linear-gradient(135deg, hsl(221 83% 53%) 0%, hsl(199 89% 48%) 100%)" }}
        >
          <StoreIcon className="h-6 w-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-bold text-foreground text-base">{store.store_name}</h4>
          </div>
          {store.is_verified ? (
            <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200 text-xs">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-600 border-yellow-200 text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Pending
            </Badge>
          )}
        </div>
      </div>

      {/* Owner Info */}
      <div className="bg-gray-50 rounded-lg p-3 mb-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Owner Details</p>
        <p className="text-sm text-gray-600 mb-1">
          <strong>Name:</strong> {store.owner_name}
        </p>
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
          <Phone className="h-3 w-3" />
          <span>+91 {store.phone_number}</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Mail className="h-3 w-3" />
          <span>{store.email}</span>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-start gap-2 mb-3">
        <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-gray-600">
          <p>{store.address}</p>
          <p>{store.city}, {store.pincode}</p>
        </div>
      </div>

      {/* Sales Stats */}
      <div className="border-t border-gray-200 pt-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Store Performance</p>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 bg-blue-50 rounded-lg">
            <TrendingUp className="h-4 w-4 text-blue-500 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Monthly Sales</p>
            <p className="text-sm font-bold text-gray-700">{mockSales.monthlySales}</p>
          </div>
          <div className="text-center p-2 bg-green-50 rounded-lg">
            <Package className="h-4 w-4 text-green-500 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Products</p>
            <p className="text-sm font-bold text-gray-700">{mockSales.productsCount}</p>
          </div>
          <div className="text-center p-2 bg-purple-50 rounded-lg">
            <TrendingUp className="h-4 w-4 text-purple-500 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Growth</p>
            <p className="text-sm font-bold text-green-600">{mockSales.trend}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreMap;
