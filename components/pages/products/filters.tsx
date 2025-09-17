"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useCategories } from "@/hooks/use-products";
import { Skeleton } from "@/components/ui/skeleton";
import { Params } from "@/lib/apis/product";

interface Props {
  filters: Omit<Params, "skip">;
  onCategoryChange: (category: string) => void;
  onSortChange: (sortBy: string, order: string) => void;
  onSearchChange: (term: string) => void;
  onClear: () => void;
}

export function ProductFilters({
  filters,
  onCategoryChange,
  onSortChange,
  onSearchChange,
  onClear,
}: Props) {
  const { data: categories, isLoading } = useCategories();
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters =
    filters.category !== "all" || filters.search || filters.sortBy;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between lg:hidden">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onClear} className="gap-2">
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      <div className={`space-y-4 ${showFilters ? "block" : "hidden"} lg:block`}>
        <div className="flex w-full gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={filters.search ?? ""}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select
            value={filters.category ?? ""}
            onValueChange={onCategoryChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {isLoading ? (
                <div className="p-2">
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : (
                categories?.map((category) => (
                  <SelectItem key={category.slug} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>

          <Select
            value={filters.sortBy || "none"}
            onValueChange={(value) => {
              if (value === "none") {
                onSortChange("", "asc");
              } else {
                onSortChange(value, filters.sortOrder ?? "asc");
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">No Sorting</SelectItem>
              <SelectItem value="title">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          {filters.sortBy && (
            <Select
              value={filters.sortOrder ?? "asc"}
              onValueChange={(value) =>
                onSortChange(filters.sortBy ?? "", value as "asc" | "desc")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asc">Ascending</SelectItem>
                <SelectItem value="desc">Descending</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        {hasActiveFilters && (
          <div className="hidden lg:block">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
