// app/admin/products/DeleteProductButton.tsx
'use client';

import { useTransition } from 'react';
import { deleteProduct } from '@/actions/DeleteProductAction';

export function DeleteProductButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (confirm('Are you sure you want to delete this product?')) {
      startTransition(async () => {
        await deleteProduct(productId);
      });
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-red-600 hover:text-red-900 font-semibold disabled:text-gray-400"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}