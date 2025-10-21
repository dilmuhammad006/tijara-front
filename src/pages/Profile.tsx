import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import {
  User,
  Mail,
  ShoppingBag,
  Calendar,
  Shield,
  LogOut,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { usePatchQuery } from "@/hooks";
import toast from "react-hot-toast";

const ProfilePage = () => {
  interface ProfileProps {
    name: string;
    email: string;
  }

  const { user, logout, refetch } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileProps>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  const { mutate, isPending } = usePatchQuery(["update-profile"]);

  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(isPending);

  const onSubmit = async (data: ProfileProps) => {
    setIsLoading(true);
    try {
      mutate(
        {
          url: "auth/update/profile",
          payload: data,
        },
        {
          onSuccess: () => {
            setIsEditing(false)
            refetch();
            toast.success("Profile updated");
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset({
      name: user?.name || "",
      email: user?.email || "",
    });
  };

  const handleLogout = () => {
    logout();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">Tijara</h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
        <div className="space-y-6">
          {/* Profile Header */}
          <Card className="border-slate-200">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-slate-600 flex items-center justify-center text-white text-2xl font-bold">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {user?.name || "User"}
                  </h2>
                  <p className="text-slate-600">
                    {user?.email || "email@example.com"}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      <span className="capitalize">{user?.role || "user"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Joined{" "}
                        {user?.createdAt ? formatDate(user.createdAt) : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-slate-900">
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-slate-600">
                    Update your account details
                  </CardDescription>
                </div>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-slate-600"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </Button>
                ) : (
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-slate-600"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* ID (Read-only) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    User ID
                  </Label>
                  <Input
                    value={user?.id || ""}
                    disabled
                    className="bg-slate-50 text-slate-500"
                  />
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700"
                  >
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="name"
                      type="text"
                      disabled={!isEditing}
                      className="pl-10 disabled:bg-slate-50 disabled:text-slate-500"
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-600">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-slate-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      disabled={!isEditing}
                      className="pl-10 disabled:bg-slate-50 disabled:text-slate-500"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Role (Read-only) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Role
                  </Label>
                  <Input
                    value={user?.role || ""}
                    disabled
                    className="bg-slate-50 text-slate-500 capitalize"
                  />
                </div>

                {/* Created At (Read-only) */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-slate-700">
                    Account Created
                  </Label>
                  <Input
                    value={user?.createdAt ? formatDate(user.createdAt) : ""}
                    disabled
                    className="bg-slate-50 text-slate-500"
                  />
                </div>

                {/* Save Button */}
                {isEditing && (
                  <Button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    className="w-full bg-slate-600 hover:bg-slate-700 text-white"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Save className="w-4 h-4" />
                        Save Changes
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
