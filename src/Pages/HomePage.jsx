import React from "react";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

export default function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200 pt-2">
      <div className="h-full flex justify-center px-2">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-full">
          <div className="flex h-full overflow-hidden">
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}
