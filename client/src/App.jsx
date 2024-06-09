import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom"
import HomePage from "./pages/home-page/HomePage"
import LoginPage from "./pages/login-page/LoginPage"
import UploadPage from "./pages/upload-page/UploadPage"
import GamePage from "./pages/game-page/GamePage"
import SwitchTeamPage from "./pages/switch-team-page/SwitchTeamPage"
import {QueryClient, QueryClientProvider} from "react-query"
import {ProtectedRoute} from "./components/protectedRoute"
import {AuthProvider} from "./hooks/useAuth"
import PanelPage from "./pages/panel-page/PanelPage"
import {AnimatePresence, motion} from "framer-motion"

const queryClient = new QueryClient()

const pageTransition = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {duration: 0.5}},
    exit: {opacity: 0, transition: {duration: 0.5}},
}

function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    exact
                    path="/"
                    element={
                        <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                            <HomePage />
                        </motion.div>
                    }
                />
                <Route
                    exact
                    path="/login"
                    element={
                        <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                            <LoginPage />
                        </motion.div>
                    }
                />
                <Route
                    exact
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                <UploadPage />
                            </motion.div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/game"
                    element={
                        <ProtectedRoute>
                            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                <GamePage />
                            </motion.div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/panel"
                    element={
                        <ProtectedRoute moderatorOnly>
                            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                <PanelPage />
                            </motion.div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/switch-team"
                    element={
                        <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                            <SwitchTeamPage />
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    )
}

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <AuthProvider>
                    <AnimatedRoutes />
                </AuthProvider>
            </Router>
        </QueryClientProvider>
    )
}

export default App
