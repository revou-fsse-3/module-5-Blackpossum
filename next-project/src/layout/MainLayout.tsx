import { ReactNode } from "react";
import Navbar from "../component/Navbar"

interface Props {
    children:ReactNode;
}

const Layout = ({children}:Props) => {
    return(
        <div>
            <Navbar/>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout;