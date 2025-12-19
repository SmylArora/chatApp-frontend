import { Link } from "react-router-dom";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

export default function Navbar() {
  const { authUser, logout } = useAuthStore();

  return (
    <div className="navbar bg-[#422ad50f] px-4">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="size-5 text-primary" />
          </div>
          <span className="text-xl font-bold">Chatty</span>
        </Link>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {!authUser ? (
          <>
          
            <Link
              to="/settings"
              className="btn btn-ghost btn-sm gap-2 transition-colors"
            >
              <Settings className="size-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/profile"
              className="btn btn-ghost btn-sm gap-2 transition-colors"
            >
              <User className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            <Link
              to="/settings"
              className="btn btn-ghost btn-sm gap-2 transition-colors"
            >
              <Settings className="size-5" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            <button
              className="btn btn-ghost btn-sm gap-2 transition-colors"
              onClick={logout}
            >
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
