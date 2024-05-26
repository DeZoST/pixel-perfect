import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import HomePage from "./pages/home-page/HomePage"
import LoginPage from "./pages/login-page/LoginPage"
import UploadPage from "./pages/upload-page/UploadPage"
import UserGamePage from "./pages/game-page/UserGamePage"
import AdminGamePage from "./pages/admin-game-page/AdminGamePage"

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<HomePage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/upload" element={<UploadPage />} />
                <Route exact path="/user-game" element={<UserGamePage />} />
                <Route exact path="/admin-game" element={<AdminGamePage />} />
            </Routes>
        </Router>
    )
}

export default App
