import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Sparkles } from "lucide-react";
import linkedinLogo from "@/assets/linkedin.png";
import cafecitoLogo from "@/assets/cafecito.png";
import paypalLogo from "@/assets/paypal.png";
import logo from "@/assets/logo.png";
import backgroundImg from "@/assets/background.jpg";
import { useCategories } from "@/hooks/useCategories";

const Index = () => {
  const { data: categories, isLoading } = useCategories();

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border/40 bg-background/75 backdrop-blur-xl text-center">
        <div className="container max-w-3xl mx-auto py-5 px-4 gap-3 text-right flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-primary/20 blur-md" />
            <img src={logo} alt="Mentatools logo" className="relative h-9 w-9 rounded-full object-cover ring-2 ring-primary/30" />
          </div>
          <div>
            <h1 className="font-bold text-foreground tracking-tight text-3xl text-center">MENTATOOLS</h1>
            <p className="text-muted-foreground -mt-0.5 tracking-wide uppercase text-lg">Herramientas para el desarrollo web</p>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container max-w-3xl mx-auto pt-12 pb-8 px-4 relative">
          <div className="rounded-2xl bg-background/60 backdrop-blur-md p-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Recursos curados</span>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-xl text-center">
              Colección de herramientas útiles para realizar tu sitio web y programar.
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <main className="container max-w-3xl mx-auto py-6 px-4">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-2 text-muted-foreground bg-background/60 backdrop-blur-md rounded-full px-4 py-2">
              <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              Cargando herramientas...
            </div>
          </div>
        ) : (
          <Accordion type="multiple" className="space-y-3">
            {categories?.map((category) => (
              <AccordionItem
                key={category.id}
                value={category.id}
                className="border border-border/40 rounded-2xl bg-card/70 backdrop-blur-md shadow-sm shadow-primary/5 px-5 overflow-hidden transition-shadow hover:shadow-md hover:shadow-primary/10"
              >
                <AccordionTrigger className="text-base font-semibold hover:no-underline py-4">
                  {category.title}
                  <span className="ml-2 inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {category.tools.length}
                  </span>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-1.5 pb-2">
                    {category.tools.map((tool) => (
                      <li key={tool.id}>
                        <a href={tool.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center justify-between p-3 rounded-xl hover:bg-primary/5 transition-all group">
                          <div>
                            <span className="font-medium text-foreground group-hover:text-primary transition-colors">{tool.name}</span>
                            <p className="text-sm text-muted-foreground mt-0.5">{tool.description}</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-muted-foreground/50 group-hover:text-primary shrink-0 ml-3 transition-colors" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-10 mt-16 bg-background/70 backdrop-blur-md">
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
    </div>
  );
};

export default Index;
