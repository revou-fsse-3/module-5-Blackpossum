// Navbar.tsx
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

const Navbar = () => {
  const { isLoggedIn, onLogout } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-xl">News App</h1>
        </div>
        <div className="space-x-4">
          {isLoggedIn ? (
            <div className="space-x-4">
              <Link href="/" className="text-white hover:text-gray-300">
                Dashboard
              </Link>
              <button
                className="text-white hover:text-gray-300"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <Link href="/Login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link href="/signup" className="text-white hover:text-gray-300">
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
