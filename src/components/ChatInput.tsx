import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ onSend, isLoading }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="sticky bottom-0 p-4 bg-gradient-glass backdrop-blur-glass border-t border-glass-border">
      <div className="flex items-center space-x-3 max-w-4xl mx-auto">
        <div className="flex-1 relative">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            disabled={isLoading}
            className={cn(
              "bg-glass border-glass-border backdrop-blur-glass",
              "placeholder:text-muted-foreground",
              "focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
              "transition-smooth pr-12"
            )}
          />
        </div>
        <Button
          onClick={handleSend}
          disabled={!message.trim() || isLoading}
          size="sm"
          className={cn(
            "bg-primary hover:bg-primary/90 border-primary/20",
            "backdrop-blur-glass shadow-glass",
            "transition-smooth hover:shadow-glow",
            "disabled:opacity-50 disabled:cursor-not-allowed"
          )}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};