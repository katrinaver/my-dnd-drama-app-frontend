import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth, type RegisterFormValues } from "./contexts/AuthContext"

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["player", "master"]),
})

export const RegisterPage = () => {
    const { register: registerUser } = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    })

    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        registerUser(data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-[380px]">
                <CardHeader>
                    <CardTitle>Join the my dnd app</CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <div className="space-y-1">
                            <Input
                                type="text"
                                placeholder="Your name"
                                data-testid="name-input"
                                {...register("name")}
                            />
                            {errors.name && (
                                <p data-testid="name-error" className="text-sm text-red-500">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-1">
                            <Input
                                type="email"
                                placeholder="insane@mail.com"
                                data-testid="email-input"
                                {...register("email")}
                            />
                            {errors.email && (
                                <p data-testid="email-error" className="text-sm text-red-500">
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
                                <p data-testid="password-error" className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <Button data-testid="submit-button" type="submit" className="w-full">
                            Create Hero
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => navigate("/login")}
                                data-testid="open-login-page-button"
                                className="underline hover:text-foreground"
                            >
                                Login
                            </button>
                        </p>

                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
