import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        role === "user" ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
          role === "user"
            ? "bg-[hsl(var(--chat-user-bg))] text-[hsl(var(--chat-user-fg))]"
            : "bg-[hsl(var(--chat-ai-bg))] text-[hsl(var(--chat-ai-fg))] border border-border"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>
      </div>
    </div>
  );
};
