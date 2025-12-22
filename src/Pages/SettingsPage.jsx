import { useThemeStore } from "../store/useThemeStore";
import { Themes } from "../constants";
import { Send } from "lucide-react";
const Preview_Messages = [
  {
    id: 1,
    content: "Hey! How's it going ?",
    isSent: false,
  },
  {
    id: 2,
    content: "I'm doing greate ! just working on some new features.",
    isSent: true,
  },
];
export default function SettingsPage() {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Choose a theme for your chat Interface
          </p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {Themes.map((t) => (
            <button
              key={t}
              className={`group flex flex-col items-center gap-1.5 p-2 rouded-lg transition-colors ${
                theme === t ? "bg-base-200" : "hover:bg-base-200/50"
              }`}
              onClick={() => setTheme(t)}
            >
              <div
                className="relative h-8 w-full rounded-md overflow-hidden"
                data-theme={t}
              >
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Preview Section */}
        {/* Preview Section */}
        <div className="mt-10">
          <h3 className="text-lg font-semibold mb-3">Preview</h3>

          <div
            className="rounded-xl border border-base-300 bg-base-100 shadow-md"
            data-theme={theme}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-base-300">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="avatar">
                    <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center font-semibold">
                      S
                    </div>
                  </div>

                  {/* Online Indicator */}
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-success border-2 border-base-100"></span>
                </div>

                {/* User Info */}
                <div className="flex flex-col">
                  <span className="text-sm font-semibold leading-tight">
                    Smylie
                  </span>
                  <span className="text-xs text-success">Online</span>
                </div>
              </div>

              {/* Theme Name */}
              <span className="text-xs opacity-70">
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </span>
            </div>

            {/* Messages */}
            <div className="p-4 space-y-3 min-h-[200px]">
              {Preview_Messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.isSent ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                      msg.isSent
                        ? "bg-primary text-primary-content"
                        : "bg-base-200 text-base-content"
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="flex items-center gap-2 px-4 py-3 border-t border-base-300">
              <input
                type="text"
                placeholder="Type a message..."
                className="input input-bordered w-full"
                disabled
              />
              <button className="btn btn-primary btn-square">
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
