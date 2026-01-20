import { useState } from "react";
import { Plus, Package, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddProductDialog = ({ open, onOpenChange }: AddProductDialogProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    currentStock: "",
    minStock: "",
    price: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.currentStock) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsAdding(false);
    setIsComplete(true);

    toast({
      title: "Product Added",
      description: `${formData.name} has been added to inventory!`,
    });

    setTimeout(() => {
      setIsComplete(false);
      setFormData({ name: "", category: "", currentStock: "", minStock: "", price: "" });
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Add New Product
          </DialogTitle>
          <DialogDescription>
            Add a new product to your inventory for tracking
          </DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Product Added!</h3>
            <p className="text-muted-foreground text-sm">Now tracking in your inventory</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Organic Rice 5kg"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="bakery">Bakery</SelectItem>
                  <SelectItem value="grains">Grains</SelectItem>
                  <SelectItem value="essentials">Essentials</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="snacks">Snacks</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currentStock">Current Stock *</Label>
                <Input
                  id="currentStock"
                  type="number"
                  placeholder="0"
                  value={formData.currentStock}
                  onChange={(e) => setFormData({ ...formData, currentStock: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minStock">Min Stock Level</Label>
                <Input
                  id="minStock"
                  type="number"
                  placeholder="0"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Unit Price (₹)</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="hero" disabled={isAdding}>
                {isAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Product
                  </>
                )}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
