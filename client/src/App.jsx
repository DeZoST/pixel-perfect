import {BrowserRouter as Router, Route, Routes, useLocation} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "react-query"
import {ProtectedRoute} from "./components/protectedRoute"
import {AuthProvider} from "./hooks/useAuth"
import {AnimatePresence, motion} from "framer-motion"
import {Suspense, lazy} from "react"
import Loader from "./components/loader/Loader" // Assuming your loader is here

const HomePage = lazy(() => import("./pages/home-page/HomePage"))
const LoginPage = lazy(() => import("./pages/login-page/LoginPage"))
const UploadPage = lazy(() => import("./pages/upload-page/UploadPage"))
const GamePage = lazy(() => import("./pages/game-page/GamePage"))
const SwitchTeamPage = lazy(() => import("./pages/switch-team-page/SwitchTeamPage"))
const PanelPage = lazy(() => import("./pages/panel-page/PanelPage"))
const VoteGraphPage = lazy(() => import("./pages/graph-page/VoteGraphPage"))

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
                        <Suspense fallback={<Loader />}>
                            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                <HomePage />
                            </motion.div>
                        </Suspense>
                    }
                />
                <Route
                    exact
                    path="/login"
                    element={
                        <Suspense fallback={<Loader />}>
                            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                <LoginPage />
                            </motion.div>
                        </Suspense>
                    }
                />
                <Route
                    exact
                    path="/upload"
                    element={
                        <ProtectedRoute>
                            <Suspense fallback={<Loader />}>
                                <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                    <UploadPage />
                                </motion.div>
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/vote-graph"
                    element={
                        <Suspense fallback={<Loader />}>
                            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                <VoteGraphPage />
                            </motion.div>
                        </Suspense>
                    }
                />
                <Route
                    exact
                    path="/game"
                    element={
                        <ProtectedRoute>
                            <Suspense fallback={<Loader />}>
                                <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                    <GamePage />
                                </motion.div>
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/panel"
                    element={
                        <ProtectedRoute moderatorOnly>
                            <Suspense fallback={<Loader />}>
                                <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                    <PanelPage />
                                </motion.div>
                            </Suspense>
                        </ProtectedRoute>
                    }
                />
                <Route
                    exact
                    path="/switch-team"
                    element={
                        <Suspense fallback={<Loader />}>
                            <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition}>
                                <SwitchTeamPage />
                            </motion.div>
                        </Suspense>
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
