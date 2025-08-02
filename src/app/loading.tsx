import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Loading... | Beyond UI Blog",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
        <p className="text-muted-foreground">Loading content...</p>
      </div>
    </div>
  );
}
