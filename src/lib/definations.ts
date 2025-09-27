// This file will be the single source of truth for your form state types.

// Type for the errors object, based on Zod's flattened errors
export type ProductErrors = {
  name?: string[];
  productId?: string[];
  slug?: string[];
  brand?: string[];
  price?: string[];
  images?: string[];
  metaTitle?: string[];
  metaDescription?: string[];
};

// The complete shape of the state object for your form
export type FormState = {
  message: string;
  errors: ProductErrors;
};
