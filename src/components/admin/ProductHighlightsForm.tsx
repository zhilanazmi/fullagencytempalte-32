
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Plus, GripVertical } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProductHighlight {
  id?: string;
  product_id: string;
  title: string;
  icon_type: string;
  display_order: number;
}

interface ProductHighlightsFormProps {
  productId: string;
}

const ProductHighlightsForm = ({ productId }: ProductHighlightsFormProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [highlights, setHighlights] = useState<ProductHighlight[]>([]);

  const { data: existingHighlights, isLoading } = useQuery({
    queryKey: ['product-highlights', productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('product_highlights')
        .select('*')
        .eq('product_id', productId)
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data;
    }
  });

  useEffect(() => {
    if (existingHighlights && existingHighlights.length > 0) {
      setHighlights(existingHighlights);
    } else {
      // Initialize with default highlights if none exist
      setHighlights([
        { product_id: productId, title: 'Modern Design', icon_type: 'checkmark', display_order: 0 },
        { product_id: productId, title: 'Easy to Use', icon_type: 'checkmark', display_order: 1 },
        { product_id: productId, title: 'Responsive', icon_type: 'checkmark', display_order: 2 }
      ]);
    }
  }, [existingHighlights, productId]);

  const saveHighlightsMutation = useMutation({
    mutationFn: async (highlightsToSave: ProductHighlight[]) => {
      // First, delete existing highlights for this product
      await supabase
        .from('product_highlights')
        .delete()
        .eq('product_id', productId);

      // Then insert the new highlights
      if (highlightsToSave.length > 0) {
        const { error } = await supabase
          .from('product_highlights')
          .insert(highlightsToSave.map((highlight, index) => ({
            product_id: productId,
            title: highlight.title,
            icon_type: highlight.icon_type,
            display_order: index
          })));
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Product highlights saved successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ['product-highlights', productId] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const addHighlight = () => {
    setHighlights([
      ...highlights,
      {
        product_id: productId,
        title: '',
        icon_type: 'checkmark',
        display_order: highlights.length
      }
    ]);
  };

  const removeHighlight = (index: number) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  const updateHighlight = (index: number, field: keyof ProductHighlight, value: string) => {
    const updated = [...highlights];
    updated[index] = { ...updated[index], [field]: value };
    setHighlights(updated);
  };

  const handleSave = () => {
    const validHighlights = highlights.filter(h => h.title.trim() !== '');
    saveHighlightsMutation.mutate(validHighlights);
  };

  if (isLoading) {
    return <div className="text-white">Loading highlights...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-white">Product Highlights</h3>
        <Button
          type="button"
          onClick={addHighlight}
          variant="outline"
          size="sm"
          className="border-gray-600 text-white hover:bg-gray-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Highlight
        </Button>
      </div>

      <div className="space-y-3">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
            <GripVertical className="w-4 h-4 text-gray-400" />
            <div className="flex-1">
              <Label htmlFor={`highlight-${index}`} className="text-white text-sm">
                Highlight {index + 1}
              </Label>
              <Input
                id={`highlight-${index}`}
                value={highlight.title}
                onChange={(e) => updateHighlight(index, 'title', e.target.value)}
                placeholder={"Enter highlight text"}
                className="mt-1 bg-gray-700 border-gray-600 text-white"
              />
            </div>
            <Button
              type="button"
              onClick={() => removeHighlight(index)}
              variant="outline"
              size="sm"
              className="border-red-600 text-red-400 hover:bg-red-900"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      {highlights.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          No highlights added yet. Click "Add Highlight" to get started.
        </div>
      )}

      <Button
        onClick={handleSave}
        disabled={saveHighlightsMutation.isPending}
        className="bg-white text-black hover:bg-gray-200"
      >
        {saveHighlightsMutation.isPending ? 'Saving...' : 'Save Highlights'}
      </Button>
    </div>
  );
};

export default ProductHighlightsForm;
