import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateSiteSetting, type SiteSettings } from "@/hooks/useSiteSettings";
import { toast } from "sonner";
import { Palette } from "lucide-react";

interface CustomizationPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: SiteSettings;
}

const COLOR_FIELDS = [
  { key: "color_background", label: "Color de fondo", defaultValue: "#0f0d15" },
  { key: "color_card", label: "Color de tarjetas", defaultValue: "#1a1625" },
  { key: "color_primary", label: "Color primario", defaultValue: "#8b5cf6" },
  { key: "color_accent", label: "Color de acento", defaultValue: "#6d28d9" },
  { key: "color_border", label: "Color de bordes", defaultValue: "#2d2640" },
];

export function CustomizationPanel({ open, onOpenChange, settings }: CustomizationPanelProps) {
  const updateSetting = useUpdateSiteSetting();
  const [localColors, setLocalColors] = useState<Record<string, string>>({});

  useEffect(() => {
    const initial: Record<string, string> = {};
    COLOR_FIELDS.forEach((f) => {
      initial[f.key] = settings[f.key] || f.defaultValue;
    });
    setLocalColors(initial);
  }, [settings, open]);

  const handleSave = async () => {
    try {
      for (const field of COLOR_FIELDS) {
        const value = localColors[field.key];
        if (value && value !== (settings[field.key] || field.defaultValue)) {
          await updateSetting.mutateAsync({ key: field.key, value });
        }
      }
      toast.success("Colores actualizados");
      onOpenChange(false);
    } catch {
      toast.error("Error al guardar los colores");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Personalizar colores
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {COLOR_FIELDS.map((field) => (
            <div key={field.key} className="flex items-center gap-3">
              <Label className="w-36 text-sm shrink-0">{field.label}</Label>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="color"
                  value={localColors[field.key] || field.defaultValue}
                  onChange={(e) =>
                    setLocalColors((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  className="h-9 w-9 rounded-md border border-border cursor-pointer shrink-0"
                />
                <Input
                  value={localColors[field.key] || field.defaultValue}
                  onChange={(e) =>
                    setLocalColors((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                  className="font-mono text-xs"
                />
              </div>
            </div>
          ))}
          <Button onClick={handleSave} className="w-full" disabled={updateSetting.isPending}>
            {updateSetting.isPending ? "Guardando..." : "Guardar colores"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
