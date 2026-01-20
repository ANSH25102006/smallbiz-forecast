-- Create table for registered grocery stores
CREATE TABLE public.stores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  owner_name TEXT NOT NULL,
  store_name TEXT NOT NULL,
  aadhaar_number TEXT NOT NULL,
  pan_number TEXT,
  phone_number TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  pincode TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  store_type TEXT DEFAULT 'grocery',
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view stores (for nearby stores feature)
CREATE POLICY "Anyone can view stores"
ON public.stores
FOR SELECT
USING (true);

-- Create policy to allow anyone to register a store (public registration)
CREATE POLICY "Anyone can register a store"
ON public.stores
FOR INSERT
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stores_updated_at
BEFORE UPDATE ON public.stores
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for location-based queries
CREATE INDEX idx_stores_location ON public.stores (latitude, longitude);
CREATE INDEX idx_stores_pincode ON public.stores (pincode);