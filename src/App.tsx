import {BrowserRouter, Navigate, Route, Routes} from "react-router";
import {Layout} from "./layouts/layout.tsx";
import {HomePage} from "./pages/home.tsx";
import ChatApp from "./pages/ChatApp.tsx";
import {Login} from "./components/Login.tsx";
import {Register} from "./components/Register.tsx";
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    <Route index element={<Navigate to={'home'}/>}/>
                    <Route path={'home'} element={<HomePage/>}/>
                    <Route path={'chat'} element={<ChatApp/>}/>

                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'register'} element={<Register/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
