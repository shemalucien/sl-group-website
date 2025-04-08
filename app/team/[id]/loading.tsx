import { Skeleton } from "@/components/ui/skeleton"

export default function TeamMemberLoading() {
  return (
    <main className="min-h-screen py-16">
      <div className="container">
        <Skeleton className="h-6 w-32 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Skeleton className="aspect-square w-full rounded-lg mb-6" />
            <Skeleton className="h-8 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/2 mb-4" />

            <div className="flex space-x-4 mb-6">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-6" />
            </div>

            <Skeleton className="h-10 w-full" />
          </div>

          <div className="md:col-span-2">
            <div className="border rounded-lg p-6">
              <Skeleton className="h-7 w-48 mb-6" />
              <Skeleton className="h-5 w-full mb-3" />
              <Skeleton className="h-5 w-full mb-3" />
              <Skeleton className="h-5 w-full mb-3" />
              <Skeleton className="h-5 w-3/4 mb-8" />

              <Skeleton className="h-7 w-40 mb-4" />
              <Skeleton className="h-5 w-1/2 mb-2" />
              <Skeleton className="h-5 w-2/3 mb-2" />
              <Skeleton className="h-5 w-1/3 mb-8" />

              <Skeleton className="h-7 w-32 mb-4" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2 mb-2" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
