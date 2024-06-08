import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom"
import HomePage from "./pages/home-page/HomePage"
import LoginPage from "./pages/login-page/LoginPage"
import UploadPage from "./pages/upload-page/UploadPage"
import GamePage from "./pages/game-page/GamePage"
import {QueryClient, QueryClientProvider} from "react-query"
import {ProtectedRoute} from "./components/protectedRoute"
import {AuthProvider} from "./hooks/useAuth"
import PanelPage from "./pages/panel-page/PanelPage"
import SwitchTeam from "./pages/switch-team-page/SwitchTeamPage"

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
                            path="/game"
                            element={
                                <ProtectedRoute>
                                    <GamePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/panel"
                            element={
                                <ProtectedRoute moderatorOnly>
                                    <PanelPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            exact
                            path="/switch-team"
                            element={
                                <ProtectedRoute>
                                    <SwitchTeam />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </QueryClientProvider>
    )
}

export default App
