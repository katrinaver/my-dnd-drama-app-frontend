import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth, type LoginFormValues } from "./contexts/AuthContext"

const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
})

export const LoginPage = () => {
    const {login} = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        login(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-[380px]">
                <CardHeader>
                    <CardTitle>Login to my dnd app</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="space-y-1">
                            <Input
                                type="email"
                                data-testid="email-input"
                                placeholder="insane@mail.com"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p data-testid="error" className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Input
                                type="password"
                                placeholder="••••••••"
                                data-testid="password-input"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p data-testid="error" className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button
                            data-testid="login-button"
                            type="submit"
                            className="w-full"
                        >
                            Log in
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            No account?{" "}
                            <button
                                type="button"
                                data-testid="open-register-page-button"
                                onClick={() => navigate("/register")}
                                className="underline hover:text-foreground"
                            >
                                Register
                            </button>
                        </p>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
