import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  Archive, 
  ChevronDown,
  Mail,
  Phone,
  FileText,
  StickyNote,
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import type { ConsultationRequest, ConsultationStatus } from "@/types/database";

const statusConfig: Record<ConsultationStatus, { label: string; icon: React.ElementType; color: string }> = {
  new: { label: "Nuovo", icon: MessageSquare, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  in_progress: { label: "In corso", icon: Clock, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  completed: { label: "Completato", icon: CheckCircle, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  archived: { label: "Archiviato", icon: Archive, color: "bg-muted text-muted-foreground border-muted" },
};

export function ConsultationRequestsSection() {
  const { studio } = useAuth();
  const [requests, setRequests] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<ConsultationStatus | "all">("all");
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  useEffect(() => {
    if (studio?.id) {
      fetchRequests();
    }
  }, [studio?.id]);

  const fetchRequests = async () => {
    if (!studio?.id) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("consultation_requests")
      .select("*")
      .eq("studio_id", studio.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching requests:", error);
      toast.error("Errore nel caricamento delle richieste");
    } else {
      setRequests((data as unknown as ConsultationRequest[]) || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: ConsultationStatus) => {
    const { error } = await supabase
      .from("consultation_requests")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast.error("Errore nell'aggiornamento dello stato");
    } else {
      toast.success("Stato aggiornato");
      fetchRequests();
      if (selectedRequest?.id === id) {
        setSelectedRequest(prev => prev ? { ...prev, status } : null);
      }
    }
  };

  const saveNotes = async () => {
    if (!selectedRequest) return;
    
    setSavingNotes(true);
    const { error } = await supabase
      .from("consultation_requests")
      .update({ notes })
      .eq("id", selectedRequest.id);

    if (error) {
      toast.error("Errore nel salvataggio delle note");
    } else {
      toast.success("Note salvate");
      setSelectedRequest(prev => prev ? { ...prev, notes } : null);
      fetchRequests();
    }
    setSavingNotes(false);
  };

  const filteredRequests = filter === "all" 
    ? requests 
    : requests.filter(r => r.status === filter);

  const counts = {
    all: requests.length,
    new: requests.filter(r => r.status === "new").length,
    in_progress: requests.filter(r => r.status === "in_progress").length,
    completed: requests.filter(r => r.status === "completed").length,
    archived: requests.filter(r => r.status === "archived").length,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "new", "in_progress", "completed", "archived"] as const).map((status) => {
          const config = status === "all" 
            ? { label: "Tutti", icon: FileText, color: "" } 
            : statusConfig[status];
          const Icon = config.icon;
          const count = counts[status];
          
          return (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
              className={`gap-2 ${filter !== status ? "bg-card/50 border-border hover:bg-card" : ""}`}
            >
              <Icon className="w-4 h-4" />
              {config.label}
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 text-xs">
                {count}
              </Badge>
            </Button>
          );
        })}
      </div>

      {/* Requests List */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* List */}
        <div className="space-y-3">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nessuna richiesta {filter !== "all" ? `con stato "${statusConfig[filter].label}"` : ""}</p>
            </div>
          ) : (
            filteredRequests.map((request) => {
              const config = statusConfig[request.status];
              const Icon = config.icon;
              
              return (
                <motion.div
                  key={request.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    setSelectedRequest(request);
                    setNotes(request.notes || "");
                  }}
                  className={`p-4 rounded-xl liquid-glass-card cursor-pointer transition-all hover:scale-[1.01] ${
                    selectedRequest?.id === request.id ? "ring-2 ring-primary" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground truncate">
                          {request.client_name}
                        </h4>
                        <Badge className={`${config.color} border text-xs`}>
                          <Icon className="w-3 h-3 mr-1" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {request.service_type}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(request.created_at).toLocaleDateString("it-IT", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <ChevronDown className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-popover border-border">
                        {(Object.keys(statusConfig) as ConsultationStatus[]).map((status) => {
                          const cfg = statusConfig[status];
                          const StatusIcon = cfg.icon;
                          return (
                            <DropdownMenuItem
                              key={status}
                              onClick={(e) => {
                                e.stopPropagation();
                                updateStatus(request.id, status);
                              }}
                              className="gap-2"
                            >
                              <StatusIcon className="w-4 h-4" />
                              {cfg.label}
                            </DropdownMenuItem>
                          );
                        })}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Detail Panel */}
        <AnimatePresence mode="wait">
          {selectedRequest && (
            <motion.div
              key={selectedRequest.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6 rounded-xl liquid-glass-card sticky top-24"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground font-serif">
                    {selectedRequest.client_name}
                  </h3>
                  <Badge className={`${statusConfig[selectedRequest.status].color} border mt-2`}>
                    {statusConfig[selectedRequest.status].label}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedRequest(null)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${selectedRequest.client_email}`} className="text-foreground hover:text-primary transition-colors">
                    {selectedRequest.client_email}
                  </a>
                </div>
                
                {selectedRequest.client_phone && (
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href={`tel:${selectedRequest.client_phone}`} className="text-foreground hover:text-primary transition-colors">
                      {selectedRequest.client_phone}
                    </a>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Servizio richiesto</h4>
                  <p className="text-foreground">{selectedRequest.service_type}</p>
                </div>

                {selectedRequest.message && (
                  <div className="pt-4 border-t border-border">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Messaggio</h4>
                    <p className="text-foreground text-sm whitespace-pre-wrap">{selectedRequest.message}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <StickyNote className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-medium text-muted-foreground">Note interne</h4>
                  </div>
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Aggiungi note private su questa richiesta..."
                    className="min-h-[100px] bg-muted/30 border-border"
                  />
                  <Button
                    onClick={saveNotes}
                    disabled={savingNotes || notes === (selectedRequest.notes || "")}
                    className="mt-2"
                    size="sm"
                  >
                    {savingNotes ? "Salvataggio..." : "Salva note"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
