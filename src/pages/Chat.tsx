import { useState, useRef, useEffect } from "react";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useToast } from "@/hooks/use-toast";
import { MessageCircle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const addMessage = (content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = async (message: string) => {
    // Add user message immediately
    addMessage(message, true);
    setIsLoading(true);

    try {
      const response = await fetch("https://sithilx.app.n8n.cloud/webhook-test/agents-to-apps-testing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: message,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      
      // Add agent response
      addMessage(data || "I received your message!", false);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
      
      // Add error message
      addMessage("Sorry, I'm having trouble connecting right now. Please try again.", false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="sticky top-0 z-50 p-4 bg-gradient-glass backdrop-blur-glass border-b border-glass-border">
        <div className="flex items-center justify-center space-x-3 max-w-4xl mx-auto">
          <div className="p-2 rounded-full bg-primary/10 backdrop-blur-glass border border-primary/20">
            <MessageCircle className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Agent Chat</h1>
        </div>
      </header>

      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-4xl mx-auto p-4">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
              <div className="p-4 rounded-full bg-gradient-glass backdrop-blur-glass border border-glass-border shadow-glass">
                <MessageCircle className="h-12 w-12 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-foreground">
                  Start a conversation
                </h2>
                <p className="text-muted-foreground">
                  Send a message to begin chatting with your agent
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.content}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <ChatInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}