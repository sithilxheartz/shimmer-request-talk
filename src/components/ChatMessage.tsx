import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatMessage = ({ message, isUser, timestamp }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className="flex flex-col max-w-[70%] space-y-1">
        <div
          className={cn(
            "px-6 py-3 rounded-2xl backdrop-blur-glass border shadow-glass transition-smooth",
            isUser
              ? "bg-chat-bubble-user border-primary/20 text-primary-foreground"
              : "bg-chat-bubble-agent border-glass-border text-foreground"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>
        <span
          className={cn(
            "text-xs text-muted-foreground px-2",
            isUser ? "text-right" : "text-left"
          )}
        >
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};