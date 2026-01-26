import { useState, useRef, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, X, FileText, Image, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: FileAttachment[];
}

interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url?: string;
}

export default function Intake() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const studioName = searchParams.get("studio") || "Studio Legale";
  const lawyerName = searchParams.get("avvocato") || "";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `Benvenuto! Sono l'assistente AI di ${studioName}${lawyerName ? `, studio dell'Avv. ${lawyerName}` : ""}. Sono qui per raccogliere le informazioni sul tuo caso legale.\n\nPer iniziare, potresti descrivermi brevemente la tua situazione?`,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setAttachments([]);
    setIsLoading(true);

    // Simulate AI response (will be replaced with actual Lovable AI integration)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Grazie per le informazioni. Sto analizzando il tuo caso. Potresti fornirmi ulteriori dettagli su quando è avvenuto questo fatto e se ci sono documenti o prove a supporto?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newAttachments: FileAttachment[] = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      type: file.type,
      size: file.size,
    }));

    setAttachments((prev) => [...prev, ...newAttachments]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Voice recording will be implemented later
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    return FileText;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
      {/* iOS-style blur overlay */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-[100px]" />
      </div>

      {/* Header - iOS style */}
      <header className="relative z-10 safe-area-top">
        <div className="mx-4 mt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="ios-glass-header rounded-2xl px-5 py-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amber-600 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary-foreground">
                    {studioName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="font-semibold text-foreground text-sm">
                    {studioName}
                  </h1>
                  {lawyerName && (
                    <p className="text-xs text-muted-foreground">
                      Avv. {lawyerName}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Chat Messages */}
      <ScrollArea className="flex-1 relative z-10 px-4 py-4" ref={scrollRef}>
        <div className="space-y-4 pb-4">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3",
                    message.role === "user"
                      ? "ios-glass-user-message"
                      : "ios-glass-ai-message"
                  )}
                >
                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                      {message.attachments.map((file) => {
                        const FileIcon = getFileIcon(file.type);
                        return (
                          <div
                            key={file.id}
                            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm"
                          >
                            <FileIcon className="w-4 h-4 text-primary" />
                            <span className="text-xs text-foreground truncate max-w-[120px]">
                              {file.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  
                  <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-1.5 opacity-70">
                    {message.timestamp.toLocaleTimeString("it-IT", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="ios-glass-ai-message rounded-2xl px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <motion.span
                    className="w-2 h-2 bg-primary/60 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-primary/60 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.span
                    className="w-2 h-2 bg-primary/60 rounded-full"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </ScrollArea>

      {/* Attachments Preview */}
      <AnimatePresence>
        {attachments.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="relative z-10 px-4"
          >
            <div className="ios-glass-input rounded-t-2xl rounded-b-none px-3 py-2 border-b-0">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {attachments.map((file) => {
                  const FileIcon = getFileIcon(file.type);
                  return (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="flex-shrink-0 relative group"
                    >
                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                        <FileIcon className="w-4 h-4 text-primary" />
                        <div className="flex flex-col">
                          <span className="text-xs text-foreground truncate max-w-[100px]">
                            {file.name}
                          </span>
                          <span className="text-[10px] text-muted-foreground">
                            {formatFileSize(file.size)}
                          </span>
                        </div>
                        <button
                          onClick={() => removeAttachment(file.id)}
                          className="ml-1 p-1 rounded-full hover:bg-white/10 transition-colors"
                        >
                          <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area - iOS style */}
      <div className="relative z-10 px-4 pb-4 safe-area-bottom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "ios-glass-input flex items-center gap-2 px-3 py-2",
            attachments.length > 0 ? "rounded-t-none rounded-b-2xl" : "rounded-2xl"
          )}
        >
          {/* File upload button */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.txt"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="w-5 h-5" />
          </Button>

          {/* Text input */}
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            placeholder="Scrivi un messaggio..."
            className="flex-1 bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-foreground placeholder:text-muted-foreground/60 text-sm"
          />

          {/* Voice recording button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "h-9 w-9 rounded-full transition-colors",
              isRecording
                ? "text-red-500 bg-red-500/20"
                : "text-muted-foreground hover:text-foreground hover:bg-white/10"
            )}
            onClick={toggleRecording}
          >
            {isRecording ? (
              <MicOff className="w-5 h-5" />
            ) : (
              <Mic className="w-5 h-5" />
            )}
          </Button>

          {/* Send button */}
          <Button
            size="icon"
            className={cn(
              "h-9 w-9 rounded-full transition-all",
              inputValue.trim() || attachments.length > 0
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-white/10 text-muted-foreground cursor-not-allowed"
            )}
            onClick={handleSendMessage}
            disabled={!inputValue.trim() && attachments.length === 0}
          >
            <Send className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
