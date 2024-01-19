// Navbar.tsx
import Link from "next/link";

interface NavbarProps {
  onLogout?: () => void;
}

const Navbar = ({ onLogout }: NavbarProps) => {
  const isLoggedIn = global?.localStorage?.getItem("token") || "";

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">News App</div>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">
            Dashboard
          </Link>
        </div>
        <div className="space-x-4">
          {isLoggedIn ? (
            <button
              className="text-white hover:text-gray-300"
              onClick={onLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                href="/login"
                className="text-white hover:text-gray-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="text-white hover:text-gray-300"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
