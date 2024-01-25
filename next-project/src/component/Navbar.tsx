// Navbar.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";


const Navbar= () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    // Check if the token is present in localStorage
    const token = global?.localStorage?.getItem('token');
    setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token
  }, []); // The empty dependency array ensures that this effect runs only once, similar to componentDidMount

  const onLogout = () => {
    navigate.push('/Login');
    global?.localStorage?.removeItem('token');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">News App</div>
        <div className="space-x-4">
          {isLoggedIn ?(
        <div className="space-x-4">
          <Link href="/"className="text-white hover:text-gray-300">
            Dashboard
          </Link>
            <button
              className="text-white hover:text-gray-300"
              onClick={onLogout}>
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
