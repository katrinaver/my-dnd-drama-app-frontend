import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SubmitHandler } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const forgotSchema = z.object({
  email: z.string().email("Invalid email"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
    defaultValues: { email: "" },
  });

  const onSubmit: SubmitHandler<ForgotFormValues> = async (data) => {
    setApiError("");
    setApiSuccess("");

    try {
      await forgotPassword(data.email);
      setApiSuccess("Password reset link sent. Check your inbox.");
    } catch (error) {
      setApiError(error instanceof Error ? error.message : "Reset failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle>Forgot password</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Input type="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <Button type="submit" className="w-full">
              Send reset link
            </Button>

            {apiError && <p className="text-sm text-red-500 text-center">{apiError}</p>}
            {apiSuccess && <p className="text-sm text-green-600 text-center">{apiSuccess}</p>}

            <p className="text-center text-sm text-muted-foreground">
              Remembered your password?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="underline hover:text-foreground"
              >
                Back to login
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
