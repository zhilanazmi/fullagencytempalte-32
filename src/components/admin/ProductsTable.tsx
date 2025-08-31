
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit2, Trash2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface Product {
  id: string;
  name: string;
  description?: string;
  thumbnail_url?: string;
  image_1_url?: string;
  image_2_url?: string;
  price_type: string;
  page_type: string;
  created_at: string;
  updated_at: string;
  display_order?: number;
}

interface ProductsTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

const ProductsTable = ({ products, onEdit, onDelete }: ProductsTableProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-8 text-gray-400">
        No products found. Create your first product using the form above.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-700">
            <TableHead className="text-white">Order</TableHead>
            <TableHead className="text-white">Thumbnail</TableHead>
            <TableHead className="text-white">Name</TableHead>
            <TableHead className="text-white">Price Type</TableHead>
            <TableHead className="text-white">Page Type</TableHead>
            <TableHead className="text-white">Created</TableHead>
            <TableHead className="text-white">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id} className="border-gray-700">
              <TableCell>
                <span className="text-gray-300 font-mono text-sm">
                  {product.display_order || 0}
                </span>
              </TableCell>
              <TableCell>
                {product.thumbnail_url ? (
                  <div className="flex items-center gap-2">
                    <img
                      src={product.thumbnail_url}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <a
                      href={product.thumbnail_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-600 rounded flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </TableCell>
              <TableCell>
                <div>
                  <div className="text-white font-medium">{product.name}</div>
                  {product.description && (
                    <div className="text-gray-400 text-sm mt-1 max-w-xs truncate">
                      {product.description}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    product.price_type === 'Premium'
                      ? 'bg-yellow-900 text-yellow-200'
                      : 'bg-green-900 text-green-200'
                  }`}
                >
                  {product.price_type}
                </span>
              </TableCell>
              <TableCell className="text-gray-300">{product.page_type}</TableCell>
              <TableCell className="text-gray-300">
                {format(new Date(product.created_at), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(product)}
                    className="border-gray-600 text-white hover:bg-gray-700"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this product?')) {
                        onDelete(product.id);
                      }
                    }}
                    className="border-red-600 text-red-400 hover:bg-red-900"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductsTable;
