"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/apis/product";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {
  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <Link href={`/product/${product.id}`}>
      <Card className="group h-full py-0 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.01]">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden rounded-t-lg">
            <Image
              src={product.thumbnail}
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
            {product.discountPercentage > 0 && (
              <Badge
                variant="destructive"
                className="absolute left-2 top-2 z-10"
              >
                -{product.discountPercentage.toFixed(0)}%
              </Badge>
            )}
            <Badge
              variant={product.stock > 0 ? "default" : "destructive"}
              className="absolute right-2 top-2 z-10"
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {product.title}
              </h3>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center gap-1">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({product.rating})
              </span>
            </div>

            <Badge variant="outline" className="w-fit">
              {product.category}
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-primary">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <Button size="sm" className="shrink-0">
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add to Cart
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
