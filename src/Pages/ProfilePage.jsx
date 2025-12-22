import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { Camera, Mail, User } from "lucide-react";
import avatar from "../assets/images/avatar.jpg";
import toast from "react-hot-toast";
export default function ProfilePage() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  console.log(authUser, "authUser");
  const [selectedImg, setSelectedImg] =useState(null);

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  if (!file) return;

  // ✅ 2MB size check
  if (file.size > 2 * 1024 * 1024) {
    toast.error("Image must be less than 2MB");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = async () => {
    const base64Image = reader.result;
    setSelectedImg(base64Image);
    await updateProfile({ profilePic: base64Image });
  };
};


  return (
    <div>
      <div className="pt-20 ">
        <div className="max-w-2xl mx-auto rounded-xl p-4 py-8 bg-[#422ad50f]">
          <div className="rounded-xl p-6 space-y-8  bg-[#422ad50f] ">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <p className="mt-2">Your Profile Information</p>
            </div>
          </div>
          {/* Update profile image section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative mt-10">
              <img
                src={selectedImg||authUser.profilePic || avatar}
                alt="profile"
                className="size-32 rounded-full object-cover border-2"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-3.5 bg-base-200 rounded-lg border">
                {authUser?.fullName || ""}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-3.5 bg-base-200 rounded-lg border">
                {authUser?.email || ""}
              </p>
            </div>
          </div>

          <div className="mt-6  rounded-xl p-2 bg-[#422ad50f]">
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="flex items-center justify-between py-2 border-b border-zinc-700">
              <span>Member Since</span>
              {/* <span>{authUser?.createdAt.split("T")[0]}</span> */}
            </div>
            <div className="flex items-center justify-between py-2">
              <span>Account Status</span>
              <span className="text-green-500">Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
