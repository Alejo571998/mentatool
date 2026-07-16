import { createClient } from "@supabase/supabase-js";
import { defineTool, type ToolContext } from "@lovable.dev/mcp-js";

function supabaseForUser(ctx: ToolContext) {
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    global: { headers: { Authorization: `Bearer ${ctx.getToken()}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default defineTool({
  name: "list_categories",
  title: "List categories with tools",
  description: "Returns every Mentatools category with its nested tools, ordered by sort_order.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: async (_input, ctx) => {
    if (!ctx.isAuthenticated()) {
      return { content: [{ type: "text", text: "Not authenticated" }], isError: true };
    }
    const sb = supabaseForUser(ctx);
    const { data: categories, error: cErr } = await sb
      .from("categories").select("*").order("sort_order");
    if (cErr) return { content: [{ type: "text", text: cErr.message }], isError: true };
    const { data: tools, error: tErr } = await sb
      .from("tools").select("*").order("sort_order");
    if (tErr) return { content: [{ type: "text", text: tErr.message }], isError: true };
    const result = (categories ?? []).map((c) => ({
      ...c,
      tools: (tools ?? []).filter((t) => t.category_id === c.id),
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: { categories: result },
    };
  },
});
