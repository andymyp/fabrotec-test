"use client";

import { useProducts } from "@/hooks/use-products";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ShoppingBag } from "lucide-react";
import { ProductFilters } from "./filters";
import { ProductSkeleton } from "./skeleton";
import { ProductCard } from "./product-card";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export function ProductsPage() {
  const [filters, setFilters] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
      category: parseAsString.withDefault(""),
      sortBy: parseAsString.withDefault(""),
      sortOrder: parseAsString.withDefault(""),
      page: parseAsInteger.withDefault(1),
      limit: parseAsInteger.withDefault(12),
    },
    {
      history: "push",
    }
  );

  const { data, isLoading, error, isFetching } = useProducts({
    ...filters,
    skip: filters.page * filters.limit,
    limit: filters.limit,
  });

  const handleSortChange = (newSortBy: string, newOrder: string) => {
    setFilters({
      ...filters,
      sortBy: newSortBy,
      sortOrder: newOrder,
      page: 1,
    });
  };

  const handleCategoryChange = (category: string) => {
    setFilters({
      ...filters,
      category,
      page: 1,
    });
  };

  const handleSearchChange = (search: string) => {
    setFilters({
      ...filters,
      search,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    setFilters(null);
  };

  const loadMore = () => {
    setFilters({
      ...filters,
      page: filters.page + 1,
    });
  };

  const hasMore =
    data && filters.page * filters.limit + filters.limit < data.total;

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load products. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="border-b bg-white/95 backdrop-blur-sm supports-[backdrop-filter]:bg-white/90 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Product Catalog
              </h1>
              <p className="text-muted-foreground">
                Discover amazing products with advanced filtering and sorting
              </p>
            </div>
          </div>

          <ProductFilters
            filters={filters}
            onCategoryChange={handleCategoryChange}
            onSortChange={handleSortChange}
            onSearchChange={handleSearchChange}
            onClear={handleClearFilters}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            {data ? (
              <>
                Showing {data.products.length} of {data.total} products
                {filters.search && ` for "${filters.search}"`}
                {filters.category !== "all" && ` in ${filters.category}`}
              </>
            ) : (
              "Loading products..."
            )}
          </p>

          {isFetching && !isLoading && (
            <div className="text-sm text-muted-foreground">Updating...</div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))
          ) : data?.products ? (
            data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="max-w-md mx-auto">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search terms to find what
                  you&apos;re looking for.
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {hasMore && !filters.search && (
          <div className="text-center mt-8">
            <Button
              onClick={loadMore}
              variant="outline"
              size="lg"
              disabled={isFetching}
            >
              {isFetching ? "Loading..." : "Load More Products"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
