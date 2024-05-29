import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import HomePage from "./pages/home-page/HomePage"
import LoginPage from "./pages/login-page/LoginPage"
import UploadPage from "./pages/upload-page/UploadPage"
import UserGamePage from "./pages/game-page/UserGamePage"
import AdminGamePage from "./pages/admin-game-page/AdminGamePage"
import {QueryClient, QueryClientProvider} from "react-query"
import {ProtectedRoute} from "./components/protectedRoute"
import {AuthProvider} from "./hooks/useAuth"

function App() {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AuthProvider>
                    <Routes>
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/login" element={<LoginPage />} />
                        <Route
                            exact
                            path="/upload"
                            element={
                                <ProtectedRoute>
                                    <UploadPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/user-game"
                            element={
                                <ProtectedRoute>
                                    <UserGamePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/admin-game"
                            element={
                                <ProtectedRoute>
                                    <AdminGamePage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </AuthProvider>
            </Router>
        </QueryClientProvider>
    )
}

export default App
