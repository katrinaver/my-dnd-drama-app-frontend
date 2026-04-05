import { useForm , Controller} from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth, type RegisterFormValues } from "./contexts/AuthContext"
import {Checkbox} from "@/components/ui/checkbox.tsx";
import { cn } from "@/lib/utils"

const registerSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["player", "master"]),
})

const roles = [
    { id: "player", title: "Player", desc: "Join campaigns" },
    { id: "master", title: "Dungeon Master", desc: "Create and manage campaigns" },
]


export const RegisterPage = () => {
    const {register: registerUser} = useAuth()
    const navigate = useNavigate()
    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "player",
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
                                required
                                type="text"
                                placeholder="Your name"
                                data-testid="name-input"
                                {...register("name")}
                            />
                        </div>

                        <div className="space-y-1">
                            <Input
                                required
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
                                required
                                type="password"
                                placeholder="••••••••"
                                data-testid="password-input"
                                {...register("password")}
                            />
                        </div>
                        <div className="space-y-1">
                            <Controller
                                name="role"
                                control={control}
                                render={({ field }) => (
                                    <div className="space-y-4">
                                        {roles.map((role) => {
                                            const checked = field.value === role.id

                                            return (
                                                <Card
                                                    key={role.id}
                                                    onClick={() => field.onChange(role.id)}
                                                    className={cn(
                                                        "cursor-pointer transition",
                                                        checked && "border-primary"
                                                    )}
                                                >
                                                    <div className="flex justify-between items-center gap-4">
                                                            <p className="font-medium">{role.title}</p>
                                                        <Checkbox
                                                            checked={checked}
                                                            onCheckedChange={() => field.onChange(role.id)}
                                                            onClick={(e) => e.stopPropagation()}
                                                        />
                                                    </div>
                                                </Card>
                                            )
                                        })}
                                    </div>
                                )}
                            />
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