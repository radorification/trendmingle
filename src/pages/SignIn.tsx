import { SignInForm } from "@/components/auth/SignInForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function SignIn() {
  const { user, loading } = useAuth();

  // Redirect to home if already authenticated
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignInForm />
    </div>
  );
} 