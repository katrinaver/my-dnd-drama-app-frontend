import { useState } from "react"
import { useAuth } from "./contexts/AuthContext"
import { HomePage } from "./HomePage"
import { LoginPage } from "./LoginPage"
import { RegisterPage } from "./RegisterPage"

type Page = "login" | "register"

export const App = () => {
    const { isAuthenticated } = useAuth()
    const [page, setPage] = useState<Page>("login")

    if (isAuthenticated) {
        return <HomePage />
    }

    if (page === "register") {
        return <RegisterPage onGoToLogin={() => setPage("login")} />
    }

    return <LoginPage onGoToRegister={() => setPage("register")} />
}
