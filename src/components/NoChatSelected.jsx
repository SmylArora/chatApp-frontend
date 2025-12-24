import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex h-full w-full flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      {/* Icon */}
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
              <MessageSquare size={32} className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>
         {/* Text */}
      <h2 className="text-2xl font-bold">Welcone to AText</h2>
      <p className="mt-1 text-sm text-base-content/70 max-w-xs">
        Select a conversation from the sidebar to start chatting
      </p>
      </div>

     
    </div>
  );
};

export default NoChatSelected;
