import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-brand-purple to-brand-blue rounded-lg flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-white">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-white">Page Not Found</h1>
        <p className="text-xl text-gray-400 mb-8">We couldn't find the page you were looking for</p>
        
        {user ? (
          <Button asChild>
            <Link to="/">Return to Dashboard</Link>
          </Button>
        ) : (
          <Button asChild>
            <Link to="/signin">Sign In</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default NotFound;
