import {Outlet} from "react-router";
import {ToastContainer} from "react-toastify";

export const Layout: React.FC = () => {
    return (
        <>
            <main style={{margin: "0 auto"}}>
                <Outlet/>
            </main>
            <ToastContainer/>
        </>
    )
}