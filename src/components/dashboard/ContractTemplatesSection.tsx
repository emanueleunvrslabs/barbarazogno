import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  FileText, 
  Pencil, 
  Trash2, 
  Star,
  Euro,
  Eye,
  EyeOff,
  GripVertical,
  Upload
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import type { ContractTemplate } from "@/types/database";

export function ContractTemplatesSection() {
  const { studio, userRole } = useAuth();
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ContractTemplate | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [isBestseller, setIsBestseller] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const canManage = userRole?.role === "owner" || userRole?.role === "admin";

  useEffect(() => {
    if (studio?.id) {
      fetchTemplates();
    }
  }, [studio?.id]);

  const fetchTemplates = async () => {
    if (!studio?.id) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("contract_templates")
      .select("*")
      .eq("studio_id", studio.id)
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching templates:", error);
      toast.error("Errore nel caricamento dei contratti");
    } else {
      setTemplates((data as unknown as ContractTemplate[]) || []);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategory("");
    setIsBestseller(false);
    setIsActive(true);
    setEditingTemplate(null);
  };

  const openEditDialog = (template: ContractTemplate) => {
    setEditingTemplate(template);
    setName(template.name);
    setDescription(template.description || "");
    setPrice(template.price.toString());
    setCategory(template.category || "");
    setIsBestseller(template.is_bestseller);
    setIsActive(template.is_active);
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!studio?.id || !name.trim()) {
      toast.error("Il nome è obbligatorio");
      return;
    }

    setSaving(true);

    const templateData = {
      studio_id: studio.id,
      name: name.trim(),
      description: description.trim() || null,
      price: parseFloat(price) || 0,
      category: category.trim() || null,
      is_bestseller: isBestseller,
      is_active: isActive,
      display_order: editingTemplate?.display_order ?? templates.length,
    };

    let error;

    if (editingTemplate) {
      const result = await supabase
        .from("contract_templates")
        .update(templateData)
        .eq("id", editingTemplate.id);
      error = result.error;
    } else {
      const result = await supabase
        .from("contract_templates")
        .insert(templateData);
      error = result.error;
    }

    if (error) {
      console.error("Error saving template:", error);
      toast.error("Errore nel salvataggio");
    } else {
      toast.success(editingTemplate ? "Contratto aggiornato" : "Contratto creato");
      setDialogOpen(false);
      resetForm();
      fetchTemplates();
    }

    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Sei sicuro di voler eliminare questo contratto?")) return;

    const { error } = await supabase
      .from("contract_templates")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Errore nell'eliminazione");
    } else {
      toast.success("Contratto eliminato");
      fetchTemplates();
    }
  };

  const toggleActive = async (template: ContractTemplate) => {
    const { error } = await supabase
      .from("contract_templates")
      .update({ is_active: !template.is_active })
      .eq("id", template.id);

    if (error) {
      toast.error("Errore nell'aggiornamento");
    } else {
      fetchTemplates();
    }
  };

  const toggleBestseller = async (template: ContractTemplate) => {
    const { error } = await supabase
      .from("contract_templates")
      .update({ is_bestseller: !template.is_bestseller })
      .eq("id", template.id);

    if (error) {
      toast.error("Errore nell'aggiornamento");
    } else {
      fetchTemplates();
    }
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Gestisci i contratti in vendita sul tuo sito
        </p>
        {canManage && (
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Nuovo contratto
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card border-border max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl">
                  {editingTemplate ? "Modifica contratto" : "Nuovo contratto"}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Nome *</Label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="es. Contratto NDA"
                    className="bg-muted/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Descrizione</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrizione del contratto..."
                    className="bg-muted/30 min-h-[80px]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Prezzo (€)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="0.00"
                      className="bg-muted/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="es. NDA, Lavoro, Fornitura"
                      className="bg-muted/30"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Switch
                      id="bestseller"
                      checked={isBestseller}
                      onCheckedChange={setIsBestseller}
                    />
                    <Label htmlFor="bestseller" className="flex items-center gap-2 cursor-pointer">
                      <Star className="w-4 h-4 text-primary" />
                      Più venduto
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      id="active"
                      checked={isActive}
                      onCheckedChange={setIsActive}
                    />
                    <Label htmlFor="active" className="cursor-pointer">
                      Attivo
                    </Label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-border">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDialogOpen(false);
                      resetForm();
                    }}
                  >
                    Annulla
                  </Button>
                  <Button onClick={handleSave} disabled={saving}>
                    {saving ? "Salvataggio..." : editingTemplate ? "Aggiorna" : "Crea"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Templates Grid */}
      {templates.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Nessun contratto ancora</p>
          {canManage && (
            <p className="text-sm mt-2">Clicca "Nuovo contratto" per iniziare</p>
          )}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-5 rounded-xl liquid-glass-card ${
                !template.is_active ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {canManage && (
                    <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                  )}
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="flex items-center gap-1">
                  {template.is_bestseller && (
                    <Badge className="bg-primary/20 text-primary border-primary/30 border gap-1">
                      <Star className="w-3 h-3" />
                      Best
                    </Badge>
                  )}
                  {!template.is_active && (
                    <Badge variant="secondary" className="gap-1">
                      <EyeOff className="w-3 h-3" />
                      Nascosto
                    </Badge>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-foreground mb-1">{template.name}</h3>
              
              {template.category && (
                <Badge variant="outline" className="mb-2 text-xs">
                  {template.category}
                </Badge>
              )}
              
              {template.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {template.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-lg font-semibold text-primary">
                  <Euro className="w-4 h-4" />
                  {template.price.toFixed(2)}
                </div>

                {canManage && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleActive(template)}
                      title={template.is_active ? "Nascondi" : "Mostra"}
                    >
                      {template.is_active ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleBestseller(template)}
                      title={template.is_bestseller ? "Rimuovi badge" : "Aggiungi badge bestseller"}
                    >
                      <Star className={`w-4 h-4 ${template.is_bestseller ? "fill-primary text-primary" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(template)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(template.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
