import { SignUpForm } from "@/components/auth/SignUpForm";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const { user, loading } = useAuth();

  // Redirect to home if already authenticated
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignUpForm />
    </div>
  );
} 