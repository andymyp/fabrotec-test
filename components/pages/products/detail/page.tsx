"use client";

import { useProduct } from "@/hooks/use-products";
import { ImageCarousel } from "../carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ArrowLeft,
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  Shield,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

interface Props {
  productId: number;
}

export function ProductDetail({ productId }: Props) {
  const { data: product, isLoading, error } = useProduct(productId);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load product details. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (isLoading || !product) {
    return <div>Loading...</div>;
  }

  const discountedPrice =
    product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="w-full">
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <ImageCarousel images={product.images} title={product.title} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <Badge variant="outline">{product.category}</Badge>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl font-bold tracking-tight mb-2">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-muted-foreground">• {product.brand}</span>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-primary">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge variant="destructive">
                      Save {product.discountPercentage.toFixed(0)}%
                    </Badge>
                  </>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={product.stock > 0 ? "default" : "destructive"}
                  className="text-sm"
                >
                  {product.availabilityStatus}
                </Badge>
                {product.stock > 0 && (
                  <span className="text-sm text-muted-foreground">
                    {product.stock} units available
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                Buy Now
              </Button>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Product Details</h3>

              <div className="grid gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Truck className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Shipping</h4>
                        <p className="text-sm text-muted-foreground">
                          {product.shippingInformation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <RotateCcw className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium">Returns</h4>
                        <p className="text-sm text-muted-foreground">
                          {product.returnPolicy}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {product.warrantyInformation && (
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <h4 className="font-medium">Warranty</h4>
                          <p className="text-sm text-muted-foreground">
                            {product.warrantyInformation}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {product.tags && product.tags.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
