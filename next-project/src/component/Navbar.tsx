// Navbar.tsx
import Link from "next/link";
import { useRouter } from "next/router";

const Navbar = () => {
  const isLoggedIn = global?.localStorage?.getItem("token")

  const navigate=useRouter();

  const onLogout = () =>{
    navigate.push('/Login')
    global?.localStorage?.removeItem('token')
  }

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
              <Link href="/Login" className="text-white hover:text-gray-300">
                Login
              </Link>
              <Link href="/signup" className="text-white hover:text-gray-300">
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
