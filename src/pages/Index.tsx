import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Plus, Pencil, Trash2, Settings, Sparkles } from "lucide-react";
import linkedinLogo from "@/assets/linkedin.png";
import cafecitoLogo from "@/assets/cafecito.png";
import paypalLogo from "@/assets/paypal.png";
import logo from "@/assets/logo.png";
import { useCategories, useAddCategory, useUpdateCategory, useDeleteCategory, useAddTool, useUpdateTool, useDeleteTool } from "@/hooks/useCategories";
import { ToolFormDialog } from "@/components/ToolFormDialog";
import { CategoryFormDialog } from "@/components/CategoryFormDialog";
import type { Tables } from "@/integrations/supabase/types";
import { toast } from "sonner";

const Index = () => {
  const { data: categories, isLoading } = useCategories();
  const addCategory = useAddCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const addTool = useAddTool();
  const updateTool = useUpdateTool();
  const deleteTool = useDeleteTool();

  const [editMode, setEditMode] = useState(false);
  const [catDialogOpen, setCatDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Tables<"categories"> | null>(null);
  const [toolDialogOpen, setToolDialogOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tables<"tools"> | null>(null);
  const [toolCategoryId, setToolCategoryId] = useState<string>("");

  const handleAddCategory = (title: string) => {
    const maxOrder = Math.max(0, ...(categories?.map((c) => c.sort_order) ?? []));
    addCategory.mutate({ title, sort_order: maxOrder + 1 }, {
      onSuccess: () => toast.success("Categoría añadida"),
    });
  };

  const handleEditCategory = (title: string) => {
    if (!editingCategory) return;
    updateCategory.mutate({ id: editingCategory.id, title }, {
      onSuccess: () => toast.success("Categoría actualizada"),
    });
    setEditingCategory(null);
  };

  const handleDeleteCategory = (id: string) => {
    if (!confirm("¿Eliminar esta categoría y todas sus herramientas?")) return;
    deleteCategory.mutate(id, {
      onSuccess: () => toast.success("Categoría eliminada"),
    });
  };

  const handleAddTool = (data: { name: string; url: string; description: string }) => {
    const cat = categories?.find((c) => c.id === toolCategoryId);
    const maxOrder = Math.max(0, ...(cat?.tools.map((t) => t.sort_order) ?? []));
    addTool.mutate({ ...data, category_id: toolCategoryId, sort_order: maxOrder + 1 }, {
      onSuccess: () => toast.success("Herramienta añadida"),
    });
  };

  const handleEditTool = (data: { name: string; url: string; description: string }) => {
    if (!editingTool) return;
    updateTool.mutate({ id: editingTool.id, ...data }, {
      onSuccess: () => toast.success("Herramienta actualizada"),
    });
    setEditingTool(null);
  };

  const handleDeleteTool = (id: string) => {
    if (!confirm("¿Eliminar esta herramienta?")) return;
    deleteTool.mutate(id, {
      onSuccess: () => toast.success("Herramienta eliminada"),
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/60 bg-card/70 backdrop-blur-xl">
        <div className="container max-w-3xl mx-auto py-5 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md" />
              <img src={logo} alt="Mentatools logo" className="relative h-9 w-9 rounded-full object-cover ring-2 ring-primary/30" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                Mentatools
              </h1>
              <p className="text-[11px] text-muted-foreground -mt-0.5 tracking-wide uppercase">Dev Toolkit</p>
            </div>
          </div>
          <Button
            variant={editMode ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setEditMode(!editMode)}
          >
            <Settings className="h-4 w-4 mr-1" />
            {editMode ? "Listo" : "Editar"}
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/5" />
        <div className="container max-w-3xl mx-auto pt-12 pb-8 px-4 relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Recursos curados</span>
          </div>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
            Colección de herramientas útiles para realizar tu sitio web y programar.
          </p>
        </div>
      </section>

      {/* Content */}
      <main className="container max-w-3xl mx-auto py-6 px-4">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Cargando herramientas...
            </div>
          </div>
        ) : (
          <>
            <Accordion type="multiple" className="space-y-3">
              {categories?.map((category) => (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border border-border/60 rounded-2xl bg-card shadow-sm shadow-primary/5 px-5 overflow-hidden transition-shadow hover:shadow-md hover:shadow-primary/10"
                >
                  <div className="flex items-center">
                    <AccordionTrigger className="text-base font-semibold hover:no-underline py-4 flex-1">
                      {category.title}
                      <span className="ml-2 inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {category.tools.length}
                      </span>
                    </AccordionTrigger>
                    {editMode && (
                      <div className="flex gap-1 ml-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full"
                          onClick={(e) => { e.stopPropagation(); setEditingCategory(category); setCatDialogOpen(true); }}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-destructive"
                          onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id); }}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <AccordionContent>
                    <ul className="space-y-1.5 pb-2">
                      {category.tools.map((tool) => (
                        <li key={tool.id} className="flex items-center gap-2">
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-all group flex-1"
                          >
                            <div>
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {tool.name}
                              </span>
                              <p className="text-sm text-muted-foreground mt-0.5">{tool.description}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary shrink-0 ml-3 transition-colors" />
                          </a>
                          {editMode && (
                            <div className="flex gap-1 shrink-0">
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full"
                                onClick={() => { setEditingTool(tool); setToolDialogOpen(true); }}>
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full text-destructive"
                                onClick={() => handleDeleteTool(tool.id)}>
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                    {editMode && (
                      <Button variant="outline" size="sm" className="mb-2 rounded-full"
                        onClick={() => { setEditingTool(null); setToolCategoryId(category.id); setToolDialogOpen(true); }}>
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Añadir herramienta
                      </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {editMode && (
              <Button variant="outline" className="mt-4 w-full rounded-full border-dashed"
                onClick={() => { setEditingCategory(null); setCatDialogOpen(true); }}>
                <Plus className="h-4 w-4 mr-2" />
                Añadir categoría
              </Button>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/60 py-10 mt-16 bg-card/40">
        <div className="container max-w-3xl mx-auto px-4 space-y-5">
          <div className="gap-3 flex-wrap text-center flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Aporte realizado por Alejo Morales</p>
            <a href="https://www.linkedin.com/jobs/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <img src={linkedinLogo} alt="LinkedIn" className="h-5 w-5 object-contain" loading="lazy" width={512} height={512} />
              </Button>
            </a>
          </div>
          <div className="gap-3 flex-wrap flex items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">Si te sirvió el contenido de esta página podés invitarme un cafecito</p>
            <a href="https://cafecito.app/mentacafecito" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <img src={cafecitoLogo} alt="Cafecito" className="h-5 w-5 object-contain" loading="lazy" width={512} height={512} />
              </Button>
            </a>
          </div>
          <div className="gap-3 flex-wrap flex items-center justify-center text-center">
            <p className="text-sm text-muted-foreground">Si estás fuera de Argentina y querés colaborar con un aporte, podés hacerlo por medio de PayPal</p>
            <a href="https://paypal.me/AlejoMenta" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="icon" className="h-8 w-8 rounded-full">
                <img src={paypalLogo} alt="PayPal" className="h-5 w-5 object-contain" loading="lazy" width={512} height={512} />
              </Button>
            </a>
          </div>
          <p className="text-center text-xs text-muted-foreground pt-4 opacity-60">
            Mentatools — Tu caja de herramientas para desarrollo web
          </p>
        </div>
      </footer>

      <CategoryFormDialog open={catDialogOpen} onOpenChange={setCatDialogOpen}
        onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
        initial={editingCategory?.title} title={editingCategory ? "Editar categoría" : "Nueva categoría"} />

      <ToolFormDialog open={toolDialogOpen} onOpenChange={setToolDialogOpen}
        onSubmit={editingTool ? handleEditTool : handleAddTool}
        initial={editingTool ? { name: editingTool.name, url: editingTool.url, description: editingTool.description } : undefined}
        title={editingTool ? "Editar herramienta" : "Nueva herramienta"} />
    </div>
  );
};

export default Index;
