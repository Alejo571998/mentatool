import { auth, defineMcp } from "@lovable.dev/mcp-js";
import listCategoriesTool from "./tools/list-categories";
import createCategoryTool from "./tools/create-category";
import createToolTool from "./tools/create-tool";
import deleteToolTool from "./tools/delete-tool";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "mentatools-mcp",
  title: "Mentatools MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Mentatools directory. Use `list_categories` to browse the catalog. Admin users can also create categories, create tools, and delete tools.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [listCategoriesTool, createCategoryTool, createToolTool, deleteToolTool],
});
