import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ToolFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: { name: string; url: string; description: string }) => void;
  initial?: { name: string; url: string; description: string };
  title: string;
}

export function ToolFormDialog({ open, onOpenChange, onSubmit, initial, title }: ToolFormDialogProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [url, setUrl] = useState(initial?.url ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");

  useEffect(() => {
    if (open) {
      setName(initial?.name ?? "");
      setUrl(initial?.url ?? "");
      setDescription(initial?.description ?? "");
    }
  }, [open, initial]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onSubmit({ name: name.trim(), url: url.trim(), description: description.trim() });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="tool-name">Nombre</Label>
            <Input id="tool-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej: React" required />
          </div>
          <div>
            <Label htmlFor="tool-url">URL</Label>
            <Input id="tool-url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." required />
          </div>
          <div>
            <Label htmlFor="tool-desc">Descripción</Label>
            <Input id="tool-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Breve descripción..." />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancelar</Button>
            <Button type="submit">Guardar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
