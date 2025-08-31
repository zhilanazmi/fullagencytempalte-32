
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import ProductHighlightsForm from './ProductHighlightsForm';
import ImageUpload from './ImageUpload';

interface Product {
  id?: string;
  name: string;
  description?: string;
  thumbnail_url?: string;
  image_1_url?: string;
  image_2_url?: string;
  price_type: string;
  page_type: string;
  remix_url?: string;
  preview_url?: string;
  display_order?: number;
}

interface ProductFormProps {
  product?: Product | null;
  onSave: () => void;
  onCancel: () => void;
}

const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    thumbnail_url: '',
    image_1_url: '',
    image_2_url: '',
    price_type: 'Free',
    page_type: 'Full home page',
    remix_url: '',
    preview_url: '',
    display_order: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (product?.id) {
        // Update existing product
        const { error } = await supabase
          .from('products')
          .update(formData)
          .eq('id', product.id);

        if (error) throw error;
      } else {
        // Create new product
        const { error } = await supabase
          .from('products')
          .insert([formData]);

        if (error) throw error;
      }

      onSave();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">
          {product ? 'Edit Product' : 'Add New Product'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-gray-700">
            <TabsTrigger value="basic" className="text-white">Basic Info</TabsTrigger>
            <TabsTrigger value="highlights" className="text-white" disabled={!product?.id}>
              Highlights {!product?.id && "(Save product first)"}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-white">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description || ''}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price_type" className="text-white">Price Type</Label>
                  <Select
                    value={formData.price_type}
                    onValueChange={(value) => handleInputChange('price_type', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Free">Free</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="page_type" className="text-white">Page Type</Label>
                  <Select
                    value={formData.page_type}
                    onValueChange={(value) => handleInputChange('page_type', value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full home page">Full home page</SelectItem>
                      <SelectItem value="Landing page">Landing page</SelectItem>
                      <SelectItem value="Dashboard">Dashboard</SelectItem>
                      <SelectItem value="Component">Component</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="display_order" className="text-white">Display Order</Label>
                  <Input
                    id="display_order"
                    type="number"
                    min="0"
                    value={formData.display_order || 0}
                    onChange={(e) => handleInputChange('display_order', parseInt(e.target.value) || 0)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="remix_url" className="text-white">Remix Link</Label>
                  <Input
                    id="remix_url"
                    value={formData.remix_url || ''}
                    onChange={(e) => handleInputChange('remix_url', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="https://lovable.dev/..."
                  />
                </div>

                <div>
                  <Label htmlFor="preview_url" className="text-white">Preview Link</Label>
                  <Input
                    id="preview_url"
                    value={formData.preview_url || ''}
                    onChange={(e) => handleInputChange('preview_url', e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <ImageUpload
                id="thumbnail"
                label="Thumbnail Image"
                value={formData.thumbnail_url}
                onChange={(url) => handleInputChange('thumbnail_url', url)}
              />

              <ImageUpload
                id="image1"
                label="Additional Image 1"
                value={formData.image_1_url}
                onChange={(url) => handleInputChange('image_1_url', url)}
              />

              <ImageUpload
                id="image2"
                label="Additional Image 2"
                value={formData.image_2_url}
                onChange={(url) => handleInputChange('image_2_url', url)}
              />

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-black hover:bg-gray-200"
                >
                  {isLoading ? 'Saving...' : 'Save Product'}
                </Button>
                <Button
                  type="button"
                  onClick={onCancel}
                  variant="outline"
                  className="border-gray-600 text-white hover:bg-gray-700"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="highlights">
            {product?.id ? (
              <ProductHighlightsForm productId={product.id} />
            ) : (
              <div className="text-center py-8 text-gray-400">
                Please save the product first to manage highlights.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
