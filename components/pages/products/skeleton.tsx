import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <Card className="h-full p-0">
      <CardHeader className="p-0">
        <Skeleton className="aspect-square w-full rounded-t-lg" />
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardFooter>
    </Card>
  );
}
