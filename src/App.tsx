import { Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { HomePage } from "./HomePage"
import { LoginPage } from "./LoginPage"
import { RegisterPage } from "./RegisterPage"
import { CampaignsPage } from "./pages/CampaignsPage"
import { SettingsPage } from "./pages/SettingsPage"
import { CreateCampaignPage } from "./pages/CreateCampaignPage"
import { DndRulesPage } from "./pages/DndRulesPage"
import {PresetPage} from "@/pages/PresetPage.tsx";

const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole?: 'master' | 'player'}) => {
    const { isAuthenticated, user} = useAuth()
    if (allowedRole && user?.role !== allowedRole) {
        // add fallback page
        return null
    }
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <HomePage />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="campaigns" replace />} />
                <Route path="preset-page" element={
                    <ProtectedRoute allowedRole={"master"}>
                        <PresetPage />
                    </ProtectedRoute>
                } />
                <Route path="campaigns" element={<CampaignsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="create-campaign" element={
                    <ProtectedRoute allowedRole={"master"}>
                        <CreateCampaignPage />
                    </ProtectedRoute>
                } />
                <Route path="dnd-rules" element={<DndRulesPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    )
}
