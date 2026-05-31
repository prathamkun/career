import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import DeployModal from "../components/portfolio/DeployModal";
import ThemeSelector from "../components/portfolio/ThemeSelector";
import HolographicAbout from "../components/portfolio/templates/Holographic/About";
import CulinaryAbout from "../components/portfolio/templates/Culinary_Restaurant/About";
import TechStartupHero from "../components/portfolio/templates/Tech_Startup/Hero";
import GeometricShapesAbout from "../components/portfolio/templates/Geometric_Shapes/About";
import ChooseAdventurePortfolio from "../components/portfolio/templates/Choose_Adventure/index";
import WeatherMood from "../components/portfolio/templates/Weather_Mood/index";
import SwissTypography from "../components/portfolio/templates/Swiss_Typography/index";
import DesertDunes from "../components/portfolio/templates/Desert_Dunes/index";

/* TemplatePreviewFrame — contains each full portfolio template in a
   sandboxed scrollable box. The key trick: CSS `transform` on the outer
   wrapper makes it the "containing block" for any position:fixed children,
   so a template's fixed navbar stays inside the frame instead of
   escaping to the top of the viewport and overlapping the page navbar. */
function TemplatePreviewFrame({ label, badgeColor, children }) {
  return (
    <div className="mt-12">
      <div className="mb-4 flex items-center gap-3 px-1">
        <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest border ${badgeColor}`}>
          Preview
        </span>
        <h2 className="text-lg font-semibold text-foreground/70">{label}</h2>
      </div>
      {/* transform:translate(0) is the critical line — it creates a new
          containing block so position:fixed elements inside are anchored
          to this div, not to the viewport. */}
      <div
        className="rounded-2xl border border-border"
        style={{
          height: 600,
          overflowY: "auto",
          overflowX: "hidden",
          transform: "translate(0)",
          position: "relative",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function TemplateGallery() {
  const { theme, toggleTheme } = useTheme();

  const templates = [
    {
      id: 1,
      title: "Modern Portfolio",
      category: "Portfolio",
      colorScheme: "Dark",
      layout: "Grid",
      author: "Alex Johnson",
      views: 1200,
      rating: 4.8,
      image: "/template-previews/Modern-Portfolio.png",
      
      createdAt: "2026-05-10",
    },
    {
      id: 2,
      title: "Minimal Resume",
      category: "Resume",
      colorScheme: "Light",
      layout: "Minimal",
      author: "Sarah Lee",
      views: 980,
      rating: 4.6,
      image: "/template-previews/Minimal-Resume.png",
      createdAt: "2026-05-18",
    },
    {
      id: 3,
      title: "Creative Dashboard",
      category: "Dashboard",
      colorScheme: "Colorful",
      layout: "Cards",
      author: "Michael",
      views: 2100,
      rating: 4.9,
      image: "/template-previews/Creative-Dashboard.png",
      createdAt: "2026-05-15",
    },
  ];

  // State for filtering and sorting
  const [category, setCategory] = useState("All");
  const [colorScheme, setColorScheme] = useState("All");
  const [layout, setLayout] = useState("All");
  const [sort, setSort] = useState("Popular");
  const [selectedTheme, setSelectedTheme] = useState("minimal");
  
  // State for deployment modal
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [selectedPortfolioTitle, setSelectedPortfolioTitle] = useState("");

  // 1. Filter Logic
  const filteredTemplates = templates.filter((template) => {
    const matchesCategory = category === "All" || template.category === category;
    const matchesColorScheme = colorScheme === "All" || template.colorScheme === colorScheme;
    const matchesLayout = layout === "All" || template.layout === layout;
    return matchesCategory && matchesColorScheme && matchesLayout;
  });

  // 2. Sort Logic
  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    if (sort === "Popular") return b.views - a.views;
    if (sort === "Highest Rated") return b.rating - a.rating;
    if (sort === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
    return 0;
  });

  return (
    <div className="min-h-screen bg-background text-foreground p-8 pt-24 transition-colors duration-300">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Template Gallery</h1>
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-muted hover:bg-accent border border-border text-foreground transition-all cursor-pointer overflow-hidden relative group"
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={theme}
              initial={{ y: 20, opacity: 0, rotate: 45 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: -45 }}
              transition={{ duration: 0.2 }}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-950/70 p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Portfolio theme</h2>
            <p className="text-sm text-gray-400">Pick a theme before deploying. Premium themes are shown and locked in the live gallery flow.</p>
          </div>
          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs text-zinc-300">
            Selected: {selectedTheme}
          </span>
        </div>
        <ThemeSelector selectedTheme={selectedTheme} onSelectTheme={setSelectedTheme} />
      </div>

      {/* Filters and Sort Controls */}
      <div className="flex flex-wrap gap-4 mb-8">
        {/* Category Filter */}
        <select
          className="bg-card p-3 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Portfolio">Portfolio</option>
          <option value="Resume">Resume</option>
          <option value="Dashboard">Dashboard</option>
        </select>

        {/* Color Scheme Filter */}
        <select
          className="bg-card p-3 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
          value={colorScheme}
          onChange={(e) => setColorScheme(e.target.value)}
        >
          <option value="All">All Color Schemes</option>
          <option value="Dark">Dark</option>
          <option value="Light">Light</option>
          <option value="Colorful">Colorful</option>
        </select>

        {/* Layout Filter */}
        <select
          className="bg-card p-3 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
        >
          <option value="All">All Layouts</option>
          <option value="Grid">Grid</option>
          <option value="Minimal">Minimal</option>
          <option value="Cards">Cards</option>
        </select>

        {/* Sort Selector */}
        <select
          className="bg-card p-3 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors ml-auto"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="Popular">Popular</option>
          <option value="Newest">Newest</option>
          <option value="Highest Rated">Highest Rated</option>
        </select>
      </div>

      {/* Gallery Grid */}
      {sortedTemplates.length === 0 ? (
        <div className="text-center text-muted-foreground mt-12 text-xl">
          No templates match the selected criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border flex flex-col justify-between group transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1"
            >
              <div>
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-52 object-cover object-top transition-transform duration-2000 group-hover:scale-105 "
                />

                <div className="p-5">
                  <h2 className="text-2xl font-semibold text-foreground">{template.title}</h2>
                  <p className="text-muted-foreground mt-1 text-sm">By {template.author}</p>
                  
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {template.category}
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {template.colorScheme}
                    </span>
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      {template.layout}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5">
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>⭐ {template.rating}</span>
                  <span>👁 {template.views.toLocaleString()}</span>
                </div>

                <button 
                  onClick={() => {
                    setSelectedPortfolioTitle(template.title);
                    setIsDeployModalOpen(true);
                  }}
                  className="mt-5 w-full bg-primary text-primary-foreground py-2 rounded-xl font-medium hover:bg-primary/90 transition cursor-pointer opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                >
                  Use This Theme
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Deploy Modal */}
      <DeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        portfolioTitle={selectedPortfolioTitle}
      />

      {/* Section-only previews — no internal navbar, plain wrapper is fine */}
      <div className="mt-12">
        <div className="mb-4 flex items-center gap-3 px-1">
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/30">Preview</span>
          <h2 className="text-lg font-semibold text-foreground/70">Holographic Theme — About Section</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border"><HolographicAbout /></div>
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-center gap-3 px-1">
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400 border border-amber-500/30">Preview</span>
          <h2 className="text-lg font-semibold text-foreground/70">Geometric Shapes Theme — About Section</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border"><GeometricShapesAbout /></div>
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-center gap-3 px-1">
          <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-amber-400 border border-amber-500/30">Preview</span>
          <h2 className="text-lg font-semibold text-foreground/70">Culinary Restaurant Theme — About Section</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border"><CulinaryAbout /></div>
      </div>

      <div className="mt-12">
        <div className="mb-4 flex items-center gap-3 px-1">
          <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/30">Preview</span>
          <h2 className="text-lg font-semibold text-foreground/70">Tech Startup Theme — Hero Section</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-cyan-500/20"><TechStartupHero /></div>
      </div>

      {/* Full-template previews — each has its own fixed/sticky navbar.
          TemplatePreviewFrame creates an isolated scroll container so
          that navbar stays inside the preview box and never bleeds out. */}
      <TemplatePreviewFrame
        label="Choose Adventure Theme — Full Interactive Template"
        badgeColor="bg-violet-500/20 text-violet-400 border-violet-500/30"
      >
        <ChooseAdventurePortfolio />
      </TemplatePreviewFrame>

      <TemplatePreviewFrame
        label="Weather Mood Theme — Full Interactive Template"
        badgeColor="bg-sky-500/20 text-sky-400 border-sky-500/30"
      >
        <WeatherMood />
      </TemplatePreviewFrame>

      <TemplatePreviewFrame
        label="Swiss Typography — Full Interactive Template"
        badgeColor="bg-red-500/20 text-red-400 border-red-500/30"
      >
        <SwissTypography />
      </TemplatePreviewFrame>

      <TemplatePreviewFrame
        label="Desert Dunes — Nature / Organic Template"
        badgeColor="bg-amber-500/20 text-amber-400 border-amber-500/30"
      >
        <DesertDunes />
      </TemplatePreviewFrame>
    </div>
  );
}