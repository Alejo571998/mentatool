import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Plus, Pencil, Trash2, Settings } from "lucide-react";
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

  // Category dialog state
  const [catDialogOpen, setCatDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Tables<"categories"> | null>(null);

  // Tool dialog state
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
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto py-6 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="Mentatools logo" className="h-8 w-8 rounded-full object-cover" />
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Mentatools</h1>
          </div>
          <Button
            variant={editMode ? "default" : "outline"}
            size="sm"
            onClick={() => setEditMode(!editMode)}
          >
            <Settings className="h-4 w-4 mr-1" />
            {editMode ? "Listo" : "Editar"}
          </Button>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto py-8 px-4">
        <p className="text-muted-foreground mb-8">
          Colección de herramientas útiles para realizar tu sitio web y programar.
        </p>

        {isLoading ? (
          <p className="text-muted-foreground text-center py-12">Cargando herramientas...</p>
        ) : (
          <>
            <Accordion type="multiple" className="space-y-3">
              {categories?.map((category) => (
                <AccordionItem
                  key={category.id}
                  value={category.id}
                  className="border border-border rounded-lg bg-card px-4 overflow-hidden"
                >
                  <div className="flex items-center">
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4 flex-1">
                      {category.title}
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        ({category.tools.length})
                      </span>
                    </AccordionTrigger>
                    {editMode && (
                      <div className="flex gap-1 ml-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingCategory(category);
                            setCatDialogOpen(true);
                          }}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteCategory(category.id);
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <AccordionContent>
                    <ul className="space-y-2 pb-2">
                      {category.tools.map((tool) => (
                        <li key={tool.id} className="flex items-center gap-2">
                          <a
                            href={tool.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors group flex-1"
                          >
                            <div>
                              <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                                {tool.name}
                              </span>
                              <p className="text-sm text-muted-foreground">{tool.description}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 ml-3 transition-colors" />
                          </a>
                          {editMode && (
                            <div className="flex gap-1 shrink-0">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => {
                                  setEditingTool(tool);
                                  setToolDialogOpen(true);
                                }}
                              >
                                <Pencil className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive"
                                onClick={() => handleDeleteTool(tool.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                    {editMode && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mb-2"
                        onClick={() => {
                          setEditingTool(null);
                          setToolCategoryId(category.id);
                          setToolDialogOpen(true);
                        }}
                      >
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        Añadir herramienta
                      </Button>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {editMode && (
              <Button
                variant="outline"
                className="mt-4 w-full"
                onClick={() => {
                  setEditingCategory(null);
                  setCatDialogOpen(true);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Añadir categoría
              </Button>
            )}
          </>
        )}
      </main>

      <footer className="border-t border-border py-6 mt-12">
        <p className="text-center text-sm text-muted-foreground">
          Mentatools — Tu caja de herramientas para desarrollo web
        </p>
      </footer>

      {/* Category Dialog */}
      <CategoryFormDialog
        open={catDialogOpen}
        onOpenChange={setCatDialogOpen}
        onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
        initial={editingCategory?.title}
        title={editingCategory ? "Editar categoría" : "Nueva categoría"}
      />

      {/* Tool Dialog */}
      <ToolFormDialog
        open={toolDialogOpen}
        onOpenChange={setToolDialogOpen}
        onSubmit={editingTool ? handleEditTool : handleAddTool}
        initial={editingTool ? { name: editingTool.name, url: editingTool.url, description: editingTool.description } : undefined}
        title={editingTool ? "Editar herramienta" : "Nueva herramienta"}
      />
    </div>
  );
};

export default Index;
