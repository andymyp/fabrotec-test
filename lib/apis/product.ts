export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

const API_BASE = "https://dummyjson.com";

export interface Params {
  search: string | null;
  category: string | null;
  sortBy: string | null;
  sortOrder: string | null;
  skip: number;
  limit: number;
}

export async function fetchProducts(params: Params): Promise<ProductsResponse> {
  const { search, category, sortBy, sortOrder, skip, limit } = params;

  let url = `${API_BASE}/products`;

  if (search && search !== "") {
    url = `${API_BASE}/products/search?q=${search}`;
  }

  if (category && category !== "all") {
    url = `${API_BASE}/products/category/${category}`;
  }

  const newParams = new URLSearchParams({
    skip: skip.toString(),
    limit: limit.toString(),
  });

  if (sortBy) {
    newParams.append("sortBy", sortBy);
    newParams.append("order", sortOrder || "asc");
  }

  const response = await fetch(`${url}?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}

export async function fetchProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_BASE}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE}/products/categories`);

  if (!response.ok) {
    throw new Error("Failed to fetch categories");
  }

  return response.json();
}
