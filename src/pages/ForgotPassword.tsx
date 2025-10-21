import { Button } from "@/components";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostQuery } from "@/hooks";
import { Eye, EyeOff, Keyboard, Lock, Mail } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSended, setOtpSended] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: forgot, isPending: isSending } = usePostQuery([
    "forgot-password",
  ]);
  const { mutate: reset, isPending: isReseting } = usePostQuery([
    "reset-password",
  ]);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    forgot(
      {
        url: "auth/forgot-password",
        payload: {
          email,
        },
      },
      {
        onSuccess: () => {
          toast.success("OTP sended to your email");
          setOtpSended(!otpSended);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleResetPassword = () => {
    reset(
      {
        url: "auth/reset-password",
        payload: {
          email,
          otp,
          newPassword: password,
        },
      },
      {
        onSuccess: () => {
          toast.success("Your password changed");
          setOtp("");
          setPassword("");
          setEmail("");
          navigate("/auth/login");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-gray-900">
              Forgot password
            </CardTitle>
            <CardDescription className="text-center text-gray-600">
              Enter your email address to reset your password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  {otpSended ? "Email" : "Entet current email"}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    disabled={otpSended}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="pl-10 h-11 border-gray-300 focus:border-slate-600 focus:ring-slate-600"
                  />
                </div>
              </div>

              {otpSended ? (
                <>
                  {/* OTP Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="otp"
                      className="text-sm font-medium text-gray-700"
                    >
                      Enter OTP sended to your email
                    </Label>
                    <div className="relative">
                      <Keyboard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="otp"
                        type="string"
                        placeholder="123456"
                        onChange={(e) => setOtp(e.target.value)}
                        className="pl-10 h-11 border-gray-300 focus:border-slate-600 focus:ring-slate-600"
                      />
                    </div>
                  </div>
                  {/* Password Input */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-700"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 pr-10 h-11 border-gray-300 focus:border-slate-600 focus:ring-slate-600"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </>
              ) : null}

              {otpSended ? (
                <Button
                  onClick={handleResetPassword}
                  type="submit"
                  disabled={isReseting}
                  className="w-full h-11 bg-slate-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isReseting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
                    </div>
                  ) : (
                    "Resest password"
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleSendOtp}
                  type="submit"
                  disabled={isSending}
                  className="w-full h-11 bg-slate-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {isSending ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;
