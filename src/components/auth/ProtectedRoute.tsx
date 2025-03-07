import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

interface ProtectedRouteProps {
  children: ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  redirectTo = "/signin",
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  // Show loading state while authentication state is being determined
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  // Redirect to sign-in page if not authenticated
  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  // Render the protected content if authenticated
  return <>{children}</>;
} 