import Header from "@/components/layout/Header";
import ProductTable from "@/components/dashboard/ProductTable";
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Filter } from "lucide-react";
import { useState } from "react";
import AddProductDialog from "@/components/dashboard/AddProductDialog";
import UploadDataDialog from "@/components/dashboard/UploadDataDialog";

const Products = () => {
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab="products" />
      
      <main className="container py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Products</h2>
            <p className="text-muted-foreground">Manage your product inventory and categories</p>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setUploadOpen(true)}>
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="hero" onClick={() => setAddProductOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-wrap gap-3 mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            All Categories
          </Button>
          <Button variant="outline" size="sm">In Stock</Button>
          <Button variant="outline" size="sm">Low Stock</Button>
          <Button variant="outline" size="sm">Out of Stock</Button>
        </div>
        
        {/* Product Table */}
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <ProductTable />
        </div>
      </main>

      {/* Dialogs */}
      <AddProductDialog open={addProductOpen} onOpenChange={setAddProductOpen} />
      <UploadDataDialog open={uploadOpen} onOpenChange={setUploadOpen} />
    </div>
  );
};

export default Products;
