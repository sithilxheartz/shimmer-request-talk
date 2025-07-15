import { cn } from "@/lib/utils";

export const TypingIndicator = () => {
  return (
    <div className="flex justify-start w-full animate-fade-in">
      <div className="flex flex-col max-w-[70%] space-y-1">
        <div className="px-6 py-4 rounded-2xl backdrop-blur-glass border border-glass-border bg-chat-bubble-agent shadow-glass">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">Agent is typing</span>
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full animate-typing-dot" style={{ animationDelay: '0s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-typing-dot" style={{ animationDelay: '0.2s' }} />
              <div className="w-2 h-2 bg-primary rounded-full animate-typing-dot" style={{ animationDelay: '0.4s' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};