import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
const ProductsSection = () => {
  const navigate = useNavigate();
  const {
    data: products,
    isLoading
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from('products').select('*').order('display_order', {
        ascending: true
      });
      if (error) throw error;
      return data;
    }
  });
  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };
  const handleGetAllAccess = () => {
    navigate('/pricing');
  };
  if (isLoading) {
    return <section data-section="products" className="w-full h-full px-4 md:px-16 py-14 md:py-28 bg-black overflow-hidden flex flex-col justify-start items-center gap-12 md:gap-20">
        <div className="self-stretch flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0">
          <div className="w-full md:w-96 flex-col justify-start items-start gap-4 inline-flex">
            <div className="text-[#7D8187] text-sm font-mono font-normal uppercase tracking-[1.4px] leading-5">
              [ Products ]
            </div>
            <div className="self-stretch flex-col justify-start items-center gap-4 flex">
              <div className="self-stretch justify-center flex flex-col text-white text-3xl md:text-5xl font-normal leading-tight md:leading-12">
                Latest releases
              </div>
            </div>
          </div>
          <Button variant="outline" className="px-6 py-3 rounded-full border border-[#404040] justify-center items-center gap-2 flex">
            <div className="text-center justify-center flex flex-col text-white text-sm font-mono font-normal uppercase tracking-[1.4px] leading-5">
              Explore more
            </div>
          </Button>
        </div>
        
        <div className="self-stretch flex-col justify-start items-start gap-9 flex">
          <div className="text-white text-center">Loading our amazing products...</div>
        </div>
      </section>;
  }
  return;
};
export default ProductsSection;