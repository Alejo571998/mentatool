import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, Wrench } from "lucide-react";

interface Tool {
  name: string;
  url: string;
  description: string;
}

interface ToolCategory {
  title: string;
  tools: Tool[];
}

const categories: ToolCategory[] = [
  {
    title: "🎨 Diseño y CSS",
    tools: [
      { name: "Tailwind CSS", url: "https://tailwindcss.com", description: "Framework CSS utility-first" },
      { name: "CSS Gradient Generator", url: "https://cssgradient.io", description: "Generador visual de gradientes CSS" },
      { name: "Coolors", url: "https://coolors.co", description: "Generador de paletas de colores" },
      { name: "Google Fonts", url: "https://fonts.google.com", description: "Tipografías gratuitas" },
      { name: "Animate.css", url: "https://animate.style", description: "Animaciones CSS listas para usar" },
      { name: "Neumorphism.io", url: "https://neumorphism.io", description: "Generador de sombras neumórficas" },
    ],
  },
  {
    title: "⚡ Frameworks y Librerías",
    tools: [
      { name: "React", url: "https://react.dev", description: "Librería para construir interfaces de usuario" },
      { name: "Vue.js", url: "https://vuejs.org", description: "Framework progresivo de JavaScript" },
      { name: "Next.js", url: "https://nextjs.org", description: "Framework React para producción" },
      { name: "Astro", url: "https://astro.build", description: "Framework para sitios orientados a contenido" },
      { name: "Svelte", url: "https://svelte.dev", description: "Framework compilado de UI" },
    ],
  },
  {
    title: "🖼️ Iconos e Imágenes",
    tools: [
      { name: "Lucide Icons", url: "https://lucide.dev", description: "Iconos SVG open source" },
      { name: "Heroicons", url: "https://heroicons.com", description: "Iconos por el equipo de Tailwind" },
      { name: "Unsplash", url: "https://unsplash.com", description: "Fotos gratuitas de alta calidad" },
      { name: "SVG Repo", url: "https://www.svgrepo.com", description: "Repositorio de SVGs gratuitos" },
      { name: "Squoosh", url: "https://squoosh.app", description: "Compresor de imágenes online" },
    ],
  },
  {
    title: "🛠️ Herramientas de Desarrollo",
    tools: [
      { name: "VS Code", url: "https://code.visualstudio.com", description: "Editor de código gratuito" },
      { name: "GitHub", url: "https://github.com", description: "Plataforma de control de versiones" },
      { name: "CodePen", url: "https://codepen.io", description: "Playground de código online" },
      { name: "StackBlitz", url: "https://stackblitz.com", description: "IDE en el navegador" },
      { name: "DevDocs", url: "https://devdocs.io", description: "Documentación unificada de APIs" },
    ],
  },
  {
    title: "🚀 Deploy y Hosting",
    tools: [
      { name: "Vercel", url: "https://vercel.com", description: "Deploy instantáneo para frontend" },
      { name: "Netlify", url: "https://netlify.com", description: "Hosting y funciones serverless" },
      { name: "Cloudflare Pages", url: "https://pages.cloudflare.com", description: "Hosting rápido y gratuito" },
      { name: "Railway", url: "https://railway.app", description: "Deploy de apps full-stack" },
    ],
  },
  {
    title: "📦 Backend y APIs",
    tools: [
      { name: "Supabase", url: "https://supabase.com", description: "Backend open source como servicio" },
      { name: "Firebase", url: "https://firebase.google.com", description: "Plataforma backend de Google" },
      { name: "Postman", url: "https://postman.com", description: "Herramienta para probar APIs" },
      { name: "JSONPlaceholder", url: "https://jsonplaceholder.typicode.com", description: "API REST falsa para testing" },
    ],
  },
  {
    title: "📐 Utilidades y Productividad",
    tools: [
      { name: "Can I Use", url: "https://caniuse.com", description: "Compatibilidad de navegadores" },
      { name: "Regex101", url: "https://regex101.com", description: "Tester de expresiones regulares" },
      { name: "Readme.so", url: "https://readme.so", description: "Editor de READMEs para GitHub" },
      { name: "Excalidraw", url: "https://excalidraw.com", description: "Pizarra virtual para diagramas" },
      { name: "Notion", url: "https://notion.so", description: "Organización y documentación" },
    ],
  },
  {
    title: "🧪 Testing y QA",
    tools: [
      { name: "Vitest", url: "https://vitest.dev", description: "Framework de testing rápido para Vite" },
      { name: "Playwright", url: "https://playwright.dev", description: "Testing end-to-end para navegadores" },
      { name: "Cypress", url: "https://cypress.io", description: "Testing E2E y de componentes" },
      { name: "Testing Library", url: "https://testing-library.com", description: "Utilidades de testing centradas en el usuario" },
      { name: "Lighthouse", url: "https://developer.chrome.com/docs/lighthouse", description: "Auditoría de rendimiento y accesibilidad" },
    ],
  },
  {
    title: "🔍 SEO y Rendimiento",
    tools: [
      { name: "PageSpeed Insights", url: "https://pagespeed.web.dev", description: "Análisis de velocidad de Google" },
      { name: "GTmetrix", url: "https://gtmetrix.com", description: "Test de rendimiento web" },
      { name: "Ahrefs Webmaster Tools", url: "https://ahrefs.com/webmaster-tools", description: "Auditoría SEO gratuita" },
      { name: "Schema.org", url: "https://schema.org", description: "Referencia de datos estructurados" },
      { name: "Metatags.io", url: "https://metatags.io", description: "Previsualizador de meta tags" },
    ],
  },
  {
    title: "♿ Accesibilidad",
    tools: [
      { name: "WAVE", url: "https://wave.webaim.org", description: "Evaluador de accesibilidad web" },
      { name: "axe DevTools", url: "https://www.deque.com/axe/devtools", description: "Extensión para testing de a11y" },
      { name: "Contrast Checker", url: "https://webaim.org/resources/contrastchecker", description: "Verificador de contraste de colores" },
      { name: "A11y Project", url: "https://www.a11yproject.com", description: "Guía de accesibilidad web" },
    ],
  },
  {
    title: "🤖 IA y Asistentes de Código",
    tools: [
      { name: "ChatGPT", url: "https://chat.openai.com", description: "Asistente IA de OpenAI" },
      { name: "GitHub Copilot", url: "https://github.com/features/copilot", description: "Autocompletado IA para código" },
      { name: "Claude", url: "https://claude.ai", description: "Asistente IA de Anthropic" },
      { name: "v0 by Vercel", url: "https://v0.dev", description: "Generador de UI con IA" },
      { name: "Lovable", url: "https://lovable.dev", description: "Construye apps web con IA" },
    ],
  },
  {
    title: "📚 Aprendizaje y Documentación",
    tools: [
      { name: "MDN Web Docs", url: "https://developer.mozilla.org", description: "Documentación web de referencia" },
      { name: "freeCodeCamp", url: "https://freecodecamp.org", description: "Aprende a programar gratis" },
      { name: "CSS-Tricks", url: "https://css-tricks.com", description: "Artículos y guías de CSS" },
      { name: "JavaScript.info", url: "https://javascript.info", description: "Tutorial moderno de JavaScript" },
      { name: "Web.dev", url: "https://web.dev", description: "Guías de Google para la web moderna" },
    ],
  },
  {
    title: "🔒 Seguridad Web",
    tools: [
      { name: "OWASP", url: "https://owasp.org", description: "Proyecto de seguridad de apps web" },
      { name: "SecurityHeaders", url: "https://securityheaders.com", description: "Análisis de cabeceras de seguridad" },
      { name: "SSL Labs", url: "https://www.ssllabs.com/ssltest", description: "Test de certificados SSL" },
      { name: "Snyk", url: "https://snyk.io", description: "Escaneo de vulnerabilidades en dependencias" },
    ],
  },
  {
    title: "📱 Responsive y Mobile",
    tools: [
      { name: "Responsively", url: "https://responsively.app", description: "Navegador para desarrollo responsive" },
      { name: "Viewport Resizer", url: "https://viewportresizer.com", description: "Tester de viewports" },
      { name: "BrowserStack", url: "https://browserstack.com", description: "Testing en navegadores y dispositivos reales" },
      { name: "Capacitor", url: "https://capacitorjs.com", description: "Apps nativas desde código web" },
    ],
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-3xl mx-auto py-6 px-4 flex items-center gap-3">
          <Wrench className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Mentatools</h1>
        </div>
      </header>

      <main className="container max-w-3xl mx-auto py-8 px-4">
        <p className="text-muted-foreground mb-8">
          Colección de herramientas útiles para el desarrollo web, organizadas por categoría.
        </p>

        <Accordion type="multiple" className="space-y-3">
          {categories.map((category, i) => (
            <AccordionItem
              key={i}
              value={`cat-${i}`}
              className="border border-border rounded-lg bg-card px-4 overflow-hidden"
            >
              <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                {category.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 pb-2">
                  {category.tools.map((tool, j) => (
                    <li key={j}>
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-md hover:bg-muted transition-colors group"
                      >
                        <div>
                          <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {tool.name}
                          </span>
                          <p className="text-sm text-muted-foreground">{tool.description}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 ml-3 transition-colors" />
                      </a>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>

      <footer className="border-t border-border py-6 mt-12">
        <p className="text-center text-sm text-muted-foreground">
          Mentatools — Tu caja de herramientas para desarrollo web
        </p>
      </footer>
    </div>
  );
};

export default Index;
