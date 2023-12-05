import {Skeleton} from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row">
      <Skeleton className="h-[60vh] mb-5 md:mb-0 md:h-screen w-full md:w-1/4" />
      <div className="w-full mb-5 md:mb-0 md:w-2/4 mx-2">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-full h-24 my-5" />
        <Skeleton className="w-full h-24" />
      </div>
      <Skeleton className="h-[60vh] mb-5 md:mb-0 md:h-screen w-full md:w-1/4" />
    </div>
  );
}
