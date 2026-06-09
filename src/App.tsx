import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  CalendarRange,
  Eye,
  Users,
  QrCode,
  FileAudio,
  Layers,
  Mic,
  Network,
  TrendingUp,
  Tv,
  Globe,
  Share2,
  MapPin,
  Speech,
  LogOut,
  GitBranch,
  Workflow,
  Locate,
  UserCheck,
  Truck,
  AlertOctagon,
  Scale,
  Contact,
  Brain,
  HeartHandshake,
  Fingerprint,
  Cpu,
  Database,
  Video,
  Smile,
  Binary,
  Link,
  Heart,
  MessageSquare,
  Languages,
  Search,
  Folder,
  FolderOpen,
  Server,
  ChevronRight,
  Sparkles,
  Command,
  RefreshCw,
  Sliders,
  ListFilter,
  CheckCircle2,
  HelpCircle,
  Info,
  Lock,
  BookOpen,
  Send,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AI_TOPICS, CATEGORIES, AITopic, Category } from "./data";

// Map string icon names to Lucide Icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  ShieldAlert,
  CalendarRange,
  Eye,
  UsersHorizontal: Users,
  Users,
  QrCode,
  FileAudio,
  Layers,
  Mic,
  Network,
  TrendingUp,
  Tv,
  Globe,
  Share2,
  MapPin,
  Speech,
  LogOut,
  GitBranch,
  Workflow,
  Locate,
  UserCheck,
  Truck,
  AlertOctagon,
  Scale,
  Contact,
  Brain,
  HeartHandshake,
  Fingerprint,
  Cpu,
  Database,
  Video,
  Smile,
  Binary,
  Link,
  Heart,
  MessageSquare,
  Languages,
  Server,
};

// Helper to render beautiful, highlighted, premium badges for each topic sandbox type
function renderSandboxBadge(type: string, isBig: boolean = false, currentLang: "en" | "hi" = "hi") {
  let labelEnglish = "Unknown";
  let labelHindi = "अज्ञात प्रणाली";
  let IconComponent = ShieldAlert;

  // Custom styled gradient border classes & color accents matching each category precisely
  let colorClasses = "bg-slate-800/60 backdrop-blur-xl border-slate-700/50 text-slate-100";

  switch (type) {
    case "text":
      labelEnglish = "Text AI / NLP";
      labelHindi = "टेक्स्ट एआई / NLP";
      IconComponent = Speech;
      colorClasses = "bg-sky-50 text-sky-800 border-sky-200/80 hover:bg-sky-100/60 transition-all";
      break;
    case "image":
      labelEnglish = "Vision AI / Image";
      labelHindi = "विजन एआई / इमेज";
      IconComponent = Video;
      colorClasses = "bg-indigo-50 text-indigo-800 border-indigo-200/80 hover:bg-indigo-100/60 transition-all";
      break;
    case "scheduling":
      labelEnglish = "Scheduling / Logistics";
      labelHindi = "रोस्टर & प्लानिंग";
      IconComponent = CalendarRange;
      colorClasses = "bg-amber-50 text-amber-900 border-amber-200/80 hover:bg-amber-100/50 transition-all";
      break;
    case "integrity":
      labelEnglish = "Integrity / Forensics";
      labelHindi = "सुरक्षा & डिजिटल साक्ष्य";
      IconComponent = Cpu;
      colorClasses = "bg-rose-50 text-rose-800 border-rose-200/80 hover:bg-rose-100/60 transition-all";
      break;
    case "geofence":
      labelEnglish = "Geofence / Tracker";
      labelHindi = "जियो-फ़ेंस / ट्रैकिंग";
      IconComponent = MapPin;
      colorClasses = "bg-emerald-50 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100/60 transition-all";
      break;
    case "resource":
      labelEnglish = "Resource Wearables";
      labelHindi = "बायो-सेंसर कवच";
      IconComponent = Layers;
      colorClasses = "bg-violet-50 text-violet-800 border-violet-200/80 hover:bg-violet-100/60 transition-all";
      break;
    case "document":
      labelEnglish = "Document Analyzer";
      labelHindi = "दस्तावेज़ विश्लेषक";
      IconComponent = Database;
      colorClasses = "bg-zinc-105 text-zinc-850 border-slate-700/50 hover:bg-zinc-150/80 transition-all";
      break;
    case "trend":
      labelEnglish = "Predictive / Trends";
      labelHindi = "पूर्वानुमान / एनालिटिक्स";
      IconComponent = TrendingUp;
      colorClasses = "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200/80 hover:bg-fuchsia-100/70 transition-all";
      break;
    default:
      labelEnglish = type;
      labelHindi = type;
      IconComponent = ShieldAlert;
      colorClasses = "bg-slate-800/60 backdrop-blur-xl text-slate-200 border-slate-700/50 hover:bg-slate-800 transition-all";
      break;
  }

  if (isBig) {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border font-sans text-xs font-black shadow-xs tracking-wide select-none ${colorClasses}`}>
        <IconComponent className="w-4 h-4 shrink-0" />
        <span>{currentLang === "hi" ? labelHindi : labelEnglish}</span>
      </div>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[10px] font-mono leading-none tracking-tight select-none shrink-0 uppercase font-black ${colorClasses}`}>
      <IconComponent className="w-3 h-3 shrink-0" />
      <span>{currentLang === "hi" ? labelHindi : labelEnglish}</span>
    </span>
  );
}

export default function App() {
  // Navigation & Search States
  const [selectedFolder, setSelectedFolder] = useState<string>("station");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<AITopic | null>(() => {
    // Default to the first topic in the station category
    return AI_TOPICS.find(t => t.categoryId === "station") || null;
  });
  const [language, setLanguage] = useState<"en" | "hi">("hi"); // hindi by default since it represents direct vernacular policing needs

  // Document Interaction Tab (Specification vs Architecture Flow vs Sandbox Playground)
  const [activeDocTab, setActiveDocTab] = useState<"spec" | "flow" | "sandbox">("spec");

  // Sandbox Live Playground States
  const [sandboxPrompt, setSandboxPrompt] = useState<string>("");
  const [sandboxResult, setSandboxResult] = useState<string>("");
  const [isLoadingSim, setIsLoadingSim] = useState<boolean>(false);
  const [visualTelemetry, setVisualTelemetry] = useState<any>(null);
  const [processingTime, setProcessingTime] = useState<number | null>(null);

  // Live Server Status Indicator (Simulated active monitoring metrics)
  const [serverState, setServerState] = useState({
    activeCoreNodes: 42,
    healthRate: "99.8%",
    isLive: true,
  });

  // Automatically update prompt template or placeholder when topic changes
  useEffect(() => {
    if (selectedTopic) {
      setSandboxPrompt(selectedTopic.sandboxPlaceholder || getDefaultMockPrompt(selectedTopic));
      setSandboxResult("");
      setVisualTelemetry(null);
      setProcessingTime(null);
      setActiveDocTab("spec");
    }
  }, [selectedTopic]);

  const getDefaultMockPrompt = (topic: AITopic): string => {
    switch (topic.sandboxType) {
      case "text":
        return topic.sandboxPlaceholder || "कल रात बाज़ार चौक पर दो बाइक सवार युवकों ने सोने की चेन छीन ली और सेक्टर 3 की ओर भाग गए...";
      case "image":
        return "Vision Scan Request: Capture malkhana locker #4 storage. Items detected: 3 pistols, 2 bags of brown powder, 1 red suitcase.";
      case "scheduling":
        return "Roster configuration: 8-hour shift pattern, high alert night patrolling, relief crew standby, 4 active officers.";
      case "geofence":
        return "Alert trigger: Black car (UP16-AB-1234) fled checkpoint toward National Highway 2 toll plaza at speed 120km/h.";
      case "resource":
        return "Demographic inputs: Local religious festival and public march scheduled in Sector B next Friday with estimated footfall 15,000.";
      case "integrity":
        return "Behavioral audio transcript: 'नहीं साहब, मैंने कोई चोरी नहीं की। मैं तो उस वक्त केवल मंदिर के पास प्रसाद लेने खड़ा था। मुझे कुछ नहीं पता!'";
      case "document":
        return "Case Log: Crime register #1032. Forensic CDR reports delayed by 45 days. Local investigator: IO S.K. Mishra.";
      case "trend":
      default:
        return "Synthesize regional incident logs from past 14 days. Notable high frequencies: UPI scams, chain thefts, lockup brawls.";
    }
  };

  const handleRunSimulation = async () => {
    if (!selectedTopic) return;
    setIsLoadingSim(true);
    setSandboxResult("");
    const startTime = Date.now();

    try {
      const response = await fetch("/api/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: selectedTopic.id,
          titleEnglish: selectedTopic.titleEnglish,
          sandboxType: selectedTopic.sandboxType,
          prompt: sandboxPrompt,
        })
      });

      const data = await response.json();
      if (data.success) {
        setSandboxResult(data.text);
        setVisualTelemetry(data.visualization);
        setProcessingTime(Date.now() - startTime);
      } else {
        setSandboxResult(`⚠️ Error: ${data.details || 'Could not verify parameters with state servers.'}`);
      }
    } catch (err: any) {
      setSandboxResult(`⚠️ Offline Simulation System Log:\n` +
        `Could not reach Express server for AI inference. Auto fallback sequence applied.\n\n` +
        `Analysis for: "${sandboxPrompt}"\n` +
        `1. System State Verified\n` +
        `2. Target Registry Linked\n` +
        `Result code: 200 OK (Simulated)`);
    } finally {
      setIsLoadingSim(false);
    }
  };

  // Filter topics based on search or folder selection
  const filteredTopics = AI_TOPICS.filter((topic) => {
    const matchesSearch =
      topic.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.titleHindi.includes(searchQuery) ||
      topic.subtitleEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.descriptionEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.descriptionHindi.includes(searchQuery);

    if (searchQuery) {
      return matchesSearch; // ignore folder constraints if user searches globally
    }
    return topic.categoryId === selectedFolder;
  });

  return (
    <div className="min-h-screen bg-[#09090b] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.25),rgba(255,255,255,0))] text-slate-100 flex flex-col font-sans selection:bg-indigo-600 selection:text-white p-6 md:p-12 box-border animate-fade-in">

      {/* 🛡️ STATE POLICE POLISHED BENTO-HEADER PANEL */}
      <motion.header 
        initial={{ y: -40, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        className="bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50/80 rounded-[2.5rem] p-8 md:p-10 mb-10 shadow-2xl shadow-indigo-900/5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 hover:shadow-indigo-900/10 border-b-8 border-b-indigo-600/20 backdrop-blur-3xl"
      >

        {/* Logo & Slogan */}
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] bg-slate-950 flex items-center justify-center shadow-2xl relative shrink-0 border-2 border-zinc-800">
            <ShieldAlert className="w-10 h-10 md:w-12 md:h-12 text-white" />
            <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-cyan-500 border-4 border-white rounded-full bg-cover shadow-lg animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2 text-slate-400 text-sm md:text-base font-extrabold tracking-widest uppercase mb-2">
              <span>Directory</span>
              <span className="opacity-50">/</span>
              <span className="text-indigo-600 font-black">National Police AI Registry</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white font-display flex flex-wrap items-center gap-x-4 gap-y-2">
              <span>राज्य पुलिस एआई डायरेक्टरी</span>
              <span className="text-slate-400 text-lg md:text-2xl font-bold border-l-4 border-slate-700/50 pl-4">Police AI Directory & Sandbox</span>
            </h1>
          </div>
        </div>

        {/* Quick Stats & Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-start lg:justify-end flex-wrap md:flex-nowrap">

          {/* Active node counter bento styled */}
          <div className="bg-indigo-50/90 border-2 border-indigo-100 text-indigo-900 px-6 py-4 rounded-2xl text-xs md:text-sm font-black tracking-widest uppercase flex items-center gap-3 shadow-xl shadow-indigo-500/10 backdrop-blur-md">
            <span className="w-3.5 h-3.5 rounded-full bg-indigo-600 animate-pulse relative inline-block shadow-lg shadow-indigo-500">
              <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-75" />
            </span>
            <span>BNS-V2 COMPLIANT PORTAL</span>
          </div>

          {/* Search Input across all folders */}
          <div className="bg-slate-800/60 backdrop-blur-xl/80 border-2 border-slate-700/50 px-5 py-3.5 flex items-center gap-4 rounded-2xl shadow-inner w-full md:w-80 focus-within:ring-4 focus-within:ring-indigo-600/20 focus-within:border-indigo-500 focus-within:bg-slate-900/60 backdrop-blur-2xl hover:border-slate-600/50 transition-all duration-300">
            <Search className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder="खोजें / Search 45+ AI solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none text-sm w-full bg-transparent text-slate-100 placeholder-zinc-400 font-extrabold"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-xs font-black text-indigo-600 hover:text-indigo-850 shrink-0 border-l border-slate-700/50 pl-2 ml-1"
              >
                Clear
              </button>
            )}
          </div>

          {/* Language Switcher Bento Capsule */}
          <div className="bg-slate-800 rounded-2xl p-1 flex items-center shadow-inner border border-slate-700/50 shrink-0">
            <button
              onClick={() => setLanguage("hi")}
              className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all duration-200 ${language === "hi"
                ? "bg-slate-900/60 backdrop-blur-2xl text-white shadow-xs border border-slate-700/50"
                : "text-slate-400 hover:text-slate-100"
                }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all duration-200 ${language === "en"
                ? "bg-slate-900/60 backdrop-blur-2xl text-white shadow-xs border border-slate-700/50"
                : "text-slate-400 hover:text-slate-100"
                }`}
            >
              EN
            </button>
          </div>

        </div>
      </motion.header>

      {/* 📁 FOLDER CATEGORIES NAV TAB BENTO */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.96 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
        className="bg-slate-900/60 backdrop-blur-2xl border-2 border-slate-700/50/80 rounded-[2rem] p-5 md:p-7 mb-10 shadow-2xl shadow-slate-900/50/50 hover:shadow-xl transition-all duration-500"
      >
        <div className="flex flex-wrap items-stretch gap-4">
          {/* Label */}
          <div className="flex flex-col items-center justify-center gap-2 pr-6 border-r-2 border-slate-700/50 shrink-0">
            <ListFilter className="w-7 h-7 text-slate-300" />
            <span className="text-xs text-slate-400 font-black uppercase tracking-widest whitespace-nowrap">
              {language === 'hi' ? 'संचालन स्तर' : 'Category'}
            </span>
          </div>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedFolder === cat.id && !searchQuery;

            const colorMap: Record<string, { active: string; icon: string; badge: string; glow: string }> = {
              blue: { active: "bg-blue-600   text-white border-blue-600   shadow-xl shadow-blue-200", icon: "text-blue-500", badge: "bg-blue-100 text-blue-700", glow: "hover:shadow-blue-100/50" },
              emerald: { active: "bg-emerald-600 text-white border-emerald-600 shadow-xl shadow-emerald-200", icon: "text-cyan-500", badge: "bg-emerald-100 text-emerald-700", glow: "hover:shadow-emerald-100/50" },
              indigo: { active: "bg-indigo-600  text-white border-indigo-600  shadow-xl shadow-indigo-200", icon: "text-indigo-500", badge: "bg-indigo-100 text-indigo-700", glow: "hover:shadow-indigo-100/50" },
              violet: { active: "bg-violet-600  text-white border-violet-600  shadow-xl shadow-violet-200", icon: "text-violet-500", badge: "bg-violet-100 text-violet-700", glow: "hover:shadow-violet-100/50" },
              rose: { active: "bg-rose-600    text-white border-rose-600    shadow-xl shadow-rose-200", icon: "text-rose-500", badge: "bg-rose-100 text-rose-700", glow: "hover:shadow-rose-100/50" },
              amber: { active: "bg-amber-500   text-white border-amber-500   shadow-xl shadow-amber-200", icon: "text-amber-500", badge: "bg-amber-100 text-amber-800", glow: "hover:shadow-amber-100/50" },
            };
            const s = colorMap[cat.color] || colorMap.indigo;

            return (
              <motion.button
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                key={cat.id}
                onClick={() => {
                  setSelectedFolder(cat.id);
                  setSearchQuery("");
                  const matched = AI_TOPICS.find(t => t.categoryId === cat.id);
                  if (matched) setSelectedTopic(matched);
                }}
                className={`px-7 py-5 rounded-2xl flex items-center gap-4 transition-all duration-300 border-2 relative cursor-pointer shrink-0 group ${isSelected
                  ? s.active
                  : `bg-slate-800/60 backdrop-blur-xl text-slate-300 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-900/60 backdrop-blur-2xl hover:shadow-lg ${s.glow} hover:scale-[1.04]`
                  }`}
              >
                {/* Icon */}
                <div className={`p-2 rounded-xl transition-all ${isSelected ? 'bg-slate-900/60 backdrop-blur-2xl/20' : 'bg-slate-900/60 backdrop-blur-2xl shadow-sm border border-slate-700/50'}`}>
                  {isSelected ? (
                    <FolderOpen className="w-6 h-6 text-white" />
                  ) : (
                    <Folder className={`w-6 h-6 ${s.icon}`} />
                  )}
                </div>

                {/* Text */}
                <div className="text-left">
                  <div className={`font-black text-base md:text-lg leading-tight ${isSelected ? 'text-white' : 'text-slate-100'}`}>
                    {language === "hi" ? cat.nameHindi : cat.nameEnglish}
                  </div>
                  <div className={`text-xs font-bold mt-0.5 ${isSelected ? 'text-white/70' : 'text-slate-400'}`}>
                    {AI_TOPICS.filter(t => t.categoryId === cat.id).length} AI Units
                  </div>
                </div>

                {/* Active count badge */}
                {isSelected && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-900/60 backdrop-blur-2xl/90 border-2 border-white flex items-center justify-center shadow-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </motion.div>


      {/* SEARCH OVERLAY STATE INDICATOR BENTO */}
      {searchQuery && (
        <div className="bg-indigo-50 border border-indigo-150 rounded-2xl p-4 mb-6 flex items-center justify-between shadow-xs">
          <span className="text-xs font-bold text-indigo-900">
            🔍 Showing filtered results for "<span className="font-black text-indigo-650">{searchQuery}</span>" across all administrative directories.
          </span>
          <button
            onClick={() => setSearchQuery("")}
            className="text-xs font-black text-indigo-700 hover:text-indigo-900 underline bg-slate-900/60 backdrop-blur-2xl px-3.5 py-1.5 border border-indigo-200 rounded-xl cursor-pointer hover:bg-indigo-50/40 transition-colors"
          >
            Back to Categories
          </button>
        </div>
      )}

      {/* 📊 MAIN CONTENT LAYOUT GRID */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >

        {/* 🗄️ LEFT SIDEBAR: TOPICS BENTO CELL */}
        <section className="lg:col-span-4 bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50/80 rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-900/50/50 flex flex-col hover:shadow-indigo-900/10 transition-all duration-500 backdrop-blur-3xl">

          <div className="bg-slate-800/60 backdrop-blur-xl/70 px-6 py-5 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-slate-950 shadow-sm" />
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-100">
                {searchQuery ? "All Search Hits" : `${CATEGORIES.find(c => c.id === selectedFolder)?.nameEnglish} List`}
              </h2>
            </div>
            <span className="bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 text-slate-300 font-extrabold px-2.5 py-0.5 rounded-lg text-[10px] font-mono">
              {filteredTopics.length} Matches
            </span>
          </div>

          <div className="divide-y divide-zinc-100 max-h-[620px] overflow-y-auto scrollbar-thin">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic) => {
                const isSelected = selectedTopic?.id === topic.id;
                const IconComponent = iconMap[topic.icon] || ShieldAlert;

                const topicColorKey = CATEGORIES.find(c => c.id === topic.categoryId)?.color || "indigo";
                const bgSelectedClass = topicColorKey === "amber"
                  ? "bg-amber-900/40 border-l-amber-500 text-white font-black shadow-[inset_0_0_20px_rgba(245,158,11,0.15)]"
                  : topicColorKey === "emerald"
                    ? "bg-emerald-900/40 border-l-emerald-500 text-white font-black shadow-[inset_0_0_20px_rgba(16,185,129,0.15)]"
                    : topicColorKey === "blue"
                      ? "bg-blue-900/40 border-l-blue-500 text-white font-black shadow-[inset_0_0_20px_rgba(59,130,246,0.15)]"
                      : topicColorKey === "violet"
                        ? "bg-violet-900/40 border-l-violet-500 text-white font-black shadow-[inset_0_0_20px_rgba(139,92,246,0.15)]"
                        : topicColorKey === "rose"
                          ? "bg-rose-900/40 border-l-rose-500 text-white font-black shadow-[inset_0_0_20px_rgba(244,63,94,0.15)]"
                          : "bg-indigo-900/40 border-l-indigo-500 text-white font-black shadow-[inset_0_0_20px_rgba(99,102,241,0.15)]";

                return (
                  <motion.button
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic)}
                    className={`w-full text-left p-5 md:p-6 transition-all duration-300 outline-none flex items-start gap-4 border-l-8 relative cursor-pointer ${isSelected
                      ? bgSelectedClass
                      : "border-transparent hover:bg-slate-800/60 backdrop-blur-xl text-slate-400 hover:text-white"
                      }`}
                  >
                    <div className={`p-2.5 rounded-xl shrink-0 transition-all ${isSelected
                      ? (topicColorKey === 'amber' ? 'bg-amber-100/80 text-amber-950' : 'bg-slate-900/60 backdrop-blur-2xl shadow-xs text-indigo-600')
                      : "bg-slate-800/60 backdrop-blur-xl text-slate-400"
                      }`}>
                      <IconComponent className="w-5 h-5 font-bold" />
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Title + Badge Row */}
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <span className="font-extrabold text-sm md:text-base text-slate-100 leading-snug pr-1">
                          {language === "hi" ? topic.titleHindi : topic.titleEnglish}
                        </span>
                        {renderSandboxBadge(topic.sandboxType, false, language)}
                      </div>

                      {/* Subtitle */}
                      <p className="text-xs text-slate-400 font-semibold truncate">
                        {topic.subtitleEnglish}
                      </p>
                    </div>

                    {isSelected && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-600">
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </div>
                    )}
                  </motion.button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400 text-xs font-semibold">
                <Info className="w-8 h-8 mx-auto text-zinc-350 mb-2" />
                No police modules found matching query.
              </div>
            )}
          </div>
        </section>

        {/* 📁 PRIMARY MIDDLE CONTAINER: AI SOLUTION DETAILS BENTO */}
        <motion.section 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-8 flex flex-col gap-6"
        >

          {selectedTopic ? (
            <motion.div 
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-slate-900/60 backdrop-blur-2xl border-2 border-slate-700/50/80 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-900/10 hover:shadow-indigo-900/15 flex flex-col transition-all duration-500"
            >

              {/* TOP CASE HEADER BENTO */}
              <div className="bg-slate-800/60 backdrop-blur-xl/90 p-8 md:p-10 border-b-2 border-slate-700/50 relative flex flex-col gap-5 backdrop-blur-2xl">

                {/* Abstract decorative layout dots */}
                <div className="absolute right-6 top-6 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-300" />
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="font-mono text-[9px] text-slate-400 bg-slate-900/60 backdrop-blur-2xl border-2 border-slate-700/50 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    DEPT NODE: {selectedTopic.id.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide">
                    {CATEGORIES.find(c => c.id === selectedTopic.categoryId)?.nameEnglish} • Level III
                  </span>
                  {renderSandboxBadge(selectedTopic.sandboxType, true, language)}
                </div>

                <div>
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight font-display flex flex-wrap items-center gap-x-4 gap-y-2 drop-shadow-sm">
                    <span className="text-white tracking-tight">
                      {language === "hi" ? selectedTopic.titleHindi : selectedTopic.titleEnglish}
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-slate-400 pl-4 border-l-4 border-slate-600/50 self-end mb-1">
                      {language === "hi" ? selectedTopic.titleEnglish : selectedTopic.titleHindi}
                    </span>
                  </h2>

                  <p className="text-sm md:text-lg text-slate-400 mt-3 max-w-2xl font-medium">
                    {selectedTopic.subtitleEnglish}
                  </p>
                </div>
              </div>

              {/* 📑 CASE DOC ACTIONS TABS BENTO STYLE */}
              <div className="flex flex-col md:flex-row border-b-2 border-slate-700/50 bg-slate-800/60 backdrop-blur-xl/50 p-4 gap-4">
                <button
                  onClick={() => setActiveDocTab("spec")}
                  className={`flex-1 px-6 py-4 md:py-5 text-sm md:text-base font-black tracking-widest uppercase transition-all rounded-[1.5rem] flex items-center justify-center gap-3 border-2 ${activeDocTab === "spec"
                    ? "text-slate-100 bg-slate-900/60 backdrop-blur-2xl border-zinc-900 shadow-xl shadow-slate-900/50"
                    : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800 hover:border-slate-700/50"
                    }`}
                >
                  <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-slate-100" />
                  <span>{language === "hi" ? "1. प्रणाली विशिष्टता" : "1. System Spec"}</span>
                </button>
                <button
                  onClick={() => setActiveDocTab("flow")}
                  className={`flex-1 px-6 py-4 md:py-5 text-sm md:text-base font-black tracking-widest uppercase transition-all rounded-[1.5rem] flex items-center justify-center gap-3 border-2 ${activeDocTab === "flow"
                    ? "text-slate-100 bg-slate-900/60 backdrop-blur-2xl border-zinc-900 shadow-xl shadow-emerald-100"
                    : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800 hover:border-slate-700/50"
                    }`}
                >
                  <Workflow className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
                  <span>{language === "hi" ? "2. एआई तकनीकी प्रवाह" : "2. Technical Flow"}</span>
                </button>
                <button
                  onClick={() => setActiveDocTab("sandbox")}
                  className={`flex-1 px-6 py-4 md:py-5 text-sm md:text-base font-black tracking-widest uppercase transition-all rounded-[1.5rem] flex items-center justify-center gap-3 border-2 relative ${activeDocTab === "sandbox"
                    ? "text-slate-100 bg-slate-900/60 backdrop-blur-2xl border-zinc-900 shadow-xl shadow-amber-100"
                    : "text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800 hover:border-slate-700/50"
                    }`}
                >
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-amber-500 shrink-0" />
                  <span>{language === "hi" ? "3. एआई लाइव सैंडबॉक्स" : "3. Live AI Sandbox"}</span>
                  <span className="absolute -top-3 -right-2 md:-right-4 inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-slate-950 text-white shadow-lg border-2 border-zinc-700 animate-bounce">
                    TEST
                  </span>
                </button>
              </div>

              {/* TAB CONTAINER VIEW */}
              <div className="p-8 md:p-12 bg-slate-900/60 backdrop-blur-2xl min-h-[500px]">

                {/* --- TAB [1]: SPECIFICATION --- */}
                {activeDocTab === "spec" && (
                  <div className="space-y-6">

                    {/* Primary Deep Concept Card Bento styled */}
                    <div className="bg-slate-900/60 backdrop-blur-2xl border-2 border-slate-700/50 p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-900/50/50 hover:border-slate-600/50 hover:shadow-2xl hover:scale-[1.01] duration-500 transition-all flex flex-col gap-5">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm md:text-base font-extrabold uppercase tracking-widest text-slate-400">
                          {language === "hi" ? "मूल अवधारणा / Core Concept" : "Core Concept"}
                        </h3>
                        <span className="text-xl font-black text-slate-500 font-display">01</span>
                      </div>

                      {/* Main description */}
                      <p className="text-lg md:text-xl text-zinc-850 font-bold leading-relaxed">
                        {language === 'hi' ? selectedTopic.descriptionHindi : selectedTopic.descriptionEnglish}
                      </p>

                      {/* English Context (shown only in Hindi mode) */}
                      {language === 'hi' && (
                        <div className="text-xs text-slate-400 italic border-t-2 border-slate-700/30 pt-3 leading-relaxed">
                          <span className="font-black text-zinc-650">English Context:</span> {selectedTopic.descriptionEnglish}
                        </div>
                      )}

                      {/* Technical Details — if data available */}
                      {(selectedTopic.technicalDetailsHindi || selectedTopic.technicalDetailsEnglish) && (
                        <div className="border-t-2 border-slate-700/30 pt-4">
                          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                            {language === 'hi' ? '🔧 तकनीकी विवरण' : '🔧 Technical Details'}
                          </p>
                          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-semibold">
                            {language === 'hi'
                              ? selectedTopic.technicalDetailsHindi
                              : selectedTopic.technicalDetailsEnglish}
                          </p>
                        </div>
                      )}

                      {/* Need — shown as additional context if not already shown below */}
                      {(selectedTopic.needHindi || selectedTopic.needEnglish) && (
                        <div className="border-t-2 border-slate-700/30 pt-4">
                          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">
                            {language === 'hi' ? '❓ ज़रूरत / Need' : '❓ Why Needed'}
                          </p>
                          <p className="text-sm md:text-base text-slate-300 leading-relaxed font-semibold">
                            {language === 'hi' ? selectedTopic.needHindi : selectedTopic.needEnglish}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Why Needed Section Bento style */}
                      <div className="bg-slate-800/60 backdrop-blur-xl border-2 border-slate-700/50/80 p-8 md:p-10 rounded-[2rem] flex flex-col justify-between shadow-lg hover:shadow-xl hover:border-slate-600/50 hover:scale-[1.02] transition-all duration-500">
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-4 bg-indigo-500/20 text-indigo-400 rounded-[1.5rem] shadow-[inset_0_0_15px_rgba(99,102,241,0.2)] border border-indigo-500/30">
                            <HelpCircle className="w-8 h-8" />
                          </div>
                          <span className="text-sm font-black text-indigo-400 uppercase tracking-widest">Justification</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-slate-100 mb-4">{language === "hi" ? "ज़रूरत क्यों?" : "Why is it Needed?"}</h4>
                          <div className="text-sm md:text-base text-slate-400 leading-relaxed font-bold">
                            {selectedTopic.needHindi || selectedTopic.needEnglish ? (
                              <>
                                <p className="text-slate-200 font-bold mb-2">
                                  {language === "hi" ? selectedTopic.needHindi : selectedTopic.needEnglish}
                                </p>
                                {language === "hi" && selectedTopic.needEnglish && (
                                  <p className="text-slate-400 italic border-l-2 border-slate-700/50 pl-2 mt-1 font-medium">
                                    {selectedTopic.needEnglish}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-slate-400">
                                {language === "hi"
                                  ? "पुलिस संचालन को न्यायसंगत और पारदर्शी बनाने के लिए इस डिजिटल मॉड्यूल की सख्त आवश्यकता है।"
                                  : "This digital module is highly requested to enhance departmental accountability and precision."
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Benefits Section Bento style */}
                      <div className="bg-emerald-900/10 backdrop-blur-xl border-2 border-emerald-500/20 p-8 md:p-10 rounded-[2rem] flex flex-col justify-between shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] hover:shadow-[inset_0_0_30px_rgba(16,185,129,0.15)] hover:border-emerald-500/50 hover:scale-[1.02] transition-all duration-500">
                        <div className="flex justify-between items-start mb-6">
                          <div className="p-4 bg-emerald-500/20 backdrop-blur-2xl text-emerald-400 rounded-[1.5rem] shadow-[0_0_15px_rgba(16,185,129,0.2)] border border-emerald-500/40">
                            <CheckCircle2 className="w-8 h-8" />
                          </div>
                          <span className="text-sm font-black text-emerald-400 uppercase tracking-widest">Impact</span>
                        </div>
                        <div>
                          <h4 className="text-xl font-black text-emerald-300 mb-4">{language === "hi" ? "फ़ीचर्स व लाभ" : "Key Benefits"}</h4>
                          <div className="text-sm md:text-base text-emerald-100 leading-relaxed font-bold">
                            {selectedTopic.benefitsHindi || selectedTopic.benefitsEnglish ? (
                              <>
                                <p className="text-white font-extrabold mb-1">
                                  {language === "hi" ? selectedTopic.benefitsHindi : selectedTopic.benefitsEnglish}
                                </p>
                                {language === "hi" && selectedTopic.benefitsEnglish && (
                                  <p className="text-emerald-400/80 italic mt-1 font-medium">
                                    {selectedTopic.benefitsEnglish}
                                  </p>
                                )}
                              </>
                            ) : (
                              <p className="text-emerald-200">
                                {language === "hi"
                                  ? "दक्षता में जबरदस्त प्रगति, फाइलों के त्वरित निपटारे और विभागीय निर्णय-प्रक्रिया में गति।"
                                  : "Unlocks superior processing velocities, transparent file audits, and decisive tactical response capabilities."
                                }
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Operational Stack Metadata Bento styled */}
                    <div className="pt-4 border-t-2 border-zinc-150 flex flex-wrap items-center gap-2.5">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Operational Stack:
                      </span>
                      <span className="text-xs bg-slate-800 hover:bg-zinc-200 text-slate-200 font-bold border border-slate-700/50 px-3 py-1 rounded-full font-mono transition-colors">
                        Model: Gemini-2.5-flash
                      </span>
                      <span className="text-xs bg-slate-800 hover:bg-zinc-200 text-slate-200 font-bold border border-slate-700/50 px-3 py-1 rounded-full font-mono transition-colors">
                        Pipeline: Neural OCR/NLP Graph
                      </span>
                      <span className="text-xs bg-indigo-50 text-indigo-700 font-bold border border-indigo-100 px-3 py-1 rounded-full font-mono">
                        Tier Level: {selectedTopic.categoryId.toUpperCase()}
                      </span>
                    </div>

                  </div>
                )}

                {/* --- TAB [2]: TECH ARCHITECTURE FLOWCHART --- */}
                {activeDocTab === "flow" && (
                  <div className="space-y-6">

                    <div className="bg-slate-900/60 backdrop-blur-2xl border-2 border-slate-700/50 p-6 rounded-3xl shadow-xs">
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-6 pb-3 border-b-2 border-slate-700/30">
                        <span className="uppercase font-bold tracking-wider">🛰️ SYSTEM DATA-ROUTE TELEMETRY DIAGRAM</span>
                        <span className="text-[10px] text-emerald-600 font-black flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                          LIVE DATA STREAM
                        </span>
                      </div>

                      {/* Flex/Grid responsive custom node map Bento Layout */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-2">

                        {/* Node 1: Input Source */}
                        <div className="bg-slate-900/40 backdrop-blur-xl border-2 border-slate-700/50 p-4 rounded-2xl flex flex-col justify-between hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] transition-all duration-300 relative">
                          <div className="text-[9px] text-cyan-400 uppercase tracking-widest font-black mb-1">Source Node</div>
                          <div className="text-xs font-extrabold text-slate-100">
                            {getInputSourceLabel(selectedTopic.sandboxType)}
                          </div>

                          {/* absolute connector line (desktop only) */}
                          <div className="hidden md:block absolute top-1/2 left-full w-4 h-0.5 bg-slate-700 z-10" />
                        </div>

                        {/* Node 2: Neural Transcoder Engine (Gemini) */}
                        <div className="bg-indigo-950/40 backdrop-blur-xl border-2 border-indigo-500/40 p-4 rounded-2xl flex flex-col justify-between relative shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:shadow-[0_0_40px_rgba(99,102,241,0.3)] transition-all duration-300">
                          <span className="text-[8px] bg-indigo-500/20 border border-indigo-400/50 text-indigo-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest w-fit mb-1 shadow-[0_0_10px_rgba(99,102,241,0.3)]">
                            Gemini Core Node
                          </span>
                          <div className="text-[10px] text-indigo-400/70 font-mono mt-1">@google/genai</div>
                          <div className="text-xs font-extrabold text-indigo-100 mt-1">
                            {getNeuralProcessorLabel(selectedTopic.sandboxType)}
                          </div>

                          {/* absolute connector line (desktop only) */}
                          <div className="hidden md:block absolute top-1/2 left-full w-4 h-0.5 bg-indigo-500/40 z-10 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                        </div>

                        {/* Node 3: Database & Ledger */}
                        <div className="bg-slate-900/40 backdrop-blur-xl border-2 border-slate-700/50 p-4 rounded-2xl flex flex-col justify-between hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 relative">
                          <div className="text-[9px] text-emerald-400 uppercase tracking-widest font-black mb-1">Sync Database</div>
                          <div className="text-xs font-extrabold text-slate-100">
                            {getDatabaseLabel(selectedTopic.categoryId, selectedTopic.id)}
                          </div>

                          {/* absolute connector line (desktop only) */}
                          <div className="hidden md:block absolute top-1/2 left-full w-4 h-0.5 bg-slate-700 z-10" />
                        </div>

                        {/* Node 4: Action Node / Dispatch */}
                        <div className="bg-rose-900/20 backdrop-blur-xl border-2 border-rose-500/40 p-4 rounded-2xl flex flex-col justify-between relative shadow-[inset_0_0_20px_rgba(244,63,94,0.1)] hover:shadow-[inset_0_0_30px_rgba(244,63,94,0.3)] transition-all duration-300">
                          <div className="text-[9px] text-rose-400 uppercase tracking-widest font-black mb-1">Target Action</div>
                          <div className="text-xs font-black text-rose-100 truncate">
                            {getActionLabel(selectedTopic.sandboxType)}
                          </div>
                        </div>

                      </div>

                      <div className="text-sm md:text-base text-slate-400 leading-relaxed mt-8 p-6 md:p-8 bg-slate-800/60 backdrop-blur-xl rounded-[1.5rem] border-2 border-slate-700/50 shadow-inner">
                        <span className="font-extrabold text-slate-100 text-lg">Flow Analysis: </span>
                        {language === "hi"
                          ? "यह प्रणाली एनक्रिप्टेड फ़ाइल अपलोड या लाइव सीसीटीवी वीडियो फीड के स्रोत डेटा को समेटती है, इसे एपीआई गेटवे द्वारा सर्वर-साइड जेमिनी एआई मॉडल में भेजती है, जहां तंत्रिका नेटवर्क सेकंडों में संदर्भ को संसाधित करता है, और निष्कर्ष सीधे स्थानीय कमांड और पुलिस मुख्यालय (PHQ) के डैशबोर्ड पर रेड अलर्ट संचालित करता है।"
                          : "The telemetry pipelines fetch multi-source files, encoding them into JSON context frames, and proxy the payload server-side using the GoogleGenAI client SDK. Model predictions generate state signals instantly routed back to central police controls."
                        }
                      </div>

                    </div>

                    {/* Database & Neural Details bento grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div className="bg-slate-900/60 backdrop-blur-2xl border-2 border-slate-700/50 p-8 md:p-10 rounded-[2rem] shadow-lg shadow-slate-900/50/50 hover:shadow-xl transition-all duration-300">
                        <h4 className="text-sm md:text-base font-black text-slate-400 uppercase mb-4 tracking-widest">💾 Database Sync Stack</h4>
                        <ul className="text-sm text-slate-400 space-y-3 list-disc pl-5 leading-relaxed font-medium">
                          <li><span className="text-slate-100 font-extrabold text-base">Neo4j Graph Analytics:</span> Map complex criminal rings & whatsapp contact overlaps.</li>
                          <li><span className="text-slate-100 font-extrabold text-base">CCTNS Core Sync Pipeline:</span> Integrated federated tables without data privacy leaks.</li>
                          <li><span className="text-slate-100 font-extrabold text-base">Milvus Embeddings:</span> High-dimensional face/voice vector embeddings matching.</li>
                        </ul>
                      </div>

                      <div className="bg-slate-900/60 backdrop-blur-2xl border-2 border-slate-700/50 p-8 md:p-10 rounded-[2rem] shadow-lg shadow-slate-900/50/50 hover:shadow-xl transition-all duration-300">
                        <h4 className="text-sm md:text-base font-black text-slate-400 uppercase mb-4 tracking-widest">🧠 AI Models Overview</h4>
                        <ul className="text-sm text-slate-400 space-y-3 list-disc pl-5 leading-relaxed font-medium">
                          <li><span className="text-slate-100 font-extrabold text-base">NLP Tokenizer (BERT):</span> Case file entities mapping and NER classification.</li>
                          <li><span className="text-slate-100 font-extrabold text-base">Computer Vision Models:</span> YOLO real-time speed monitoring and crowd count overlays.</li>
                          <li><span className="text-slate-100 font-extrabold text-base">Integrity Check Analyzer:</span> Wavelet analysis of high frequency vocal stress.</li>
                        </ul>
                      </div>

                    </div>

                  </div>
                )}

                {/* --- TAB [3]: LIVE AI SANDBOX PLAYGROUND --- */}
                {activeDocTab === "sandbox" && (
                  <div className="space-y-6">

                    <div className="bg-indigo-50/50 border-2 border-indigo-200 p-8 md:p-10 rounded-[2rem] shadow-xl shadow-indigo-100/50">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-indigo-600 text-white p-4 rounded-[1.5rem] shadow-lg shadow-indigo-500/30">
                          <Sparkles className="w-8 h-8" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <h3 className="text-lg md:text-xl font-black text-indigo-950 uppercase tracking-widest">
                              {language === "hi" ? "त्वरित एआई सिमुलेशन टेस्टबेड" : "Interactive Neural Testbed"}
                            </h3>
                            {renderSandboxBadge(selectedTopic.sandboxType, true, language)}
                          </div>
                          <p className="text-sm md:text-base font-bold text-indigo-600/80 mt-2">
                            Query the custom police AI model with custom inputs and see formatted outcomes.
                          </p>
                        </div>
                      </div>

                      {/* Prompt trigger Textarea */}
                      <div className="space-y-3">
                        <label className="block text-sm font-black text-slate-400 uppercase tracking-widest">
                          {language === "hi" ? "इनपुट विवरण / Case Statement Input Context:" : "Inferred Input Context:"}
                        </label>
                        <textarea
                          rows={4}
                          value={sandboxPrompt}
                          onChange={(e) => setSandboxPrompt(e.target.value)}
                          placeholder="Type or select a demo scenario to query..."
                          className="w-full bg-slate-900/60 backdrop-blur-2xl border-2 border-slate-700/50/80 rounded-[1.5rem] text-sm md:text-base p-5 text-slate-100 font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder-zinc-400 transition-all font-mono leading-relaxed shadow-inner"
                        />
                      </div>

                      {/* Predefined Quick Preset Scenario Buttons Bento Styled */}
                      <div className="mt-6">
                        <span className="text-xs uppercase font-black tracking-widest text-slate-400 block mb-3">
                          {language === 'hi' ? 'त्वरित डेमो परिदृश्य / Quick Presets:' : 'Quick Presets:'}
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {getPresetScenarios(selectedTopic).map((preset, i) => (
                            <button
                              key={i}
                              onClick={() => setSandboxPrompt(preset.prompt)}
                              className="text-xs md:text-sm bg-slate-900/60 backdrop-blur-2xl hover:bg-slate-800 text-slate-300 font-black px-5 py-2.5 rounded-xl border-2 border-slate-700/50 hover:border-slate-600/50 transition-all shadow-sm active:scale-95"
                            >
                              {preset.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Trigger Action Panel Bento */}
                      <div className="mt-8 pt-6 border-t-2 border-slate-700/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div className="text-xs text-slate-400 font-black uppercase tracking-widest flex items-center gap-2">
                          <Sliders className="w-5 h-5 text-slate-400" />
                          <span>Temp: 0.2 | Model: Gemini-2.5-flash | Security checks: Enabled</span>
                        </div>

                        <button
                          onClick={handleRunSimulation}
                          disabled={isLoadingSim}
                          className="w-full sm:w-auto bg-slate-950 hover:bg-zinc-800 active:bg-black disabled:bg-zinc-400 text-white font-black text-sm md:text-base px-8 py-4 rounded-[1.5rem] flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 cursor-pointer shrink-0"
                        >
                          {isLoadingSim ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin text-white" />
                              <span>सिमुलेशन जारी है... / Running...</span>
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 text-white" />
                              <span>रन सक्रिय सिमुलेशन / Run Simulation</span>
                            </>
                          )}
                        </button>
                      </div>

                    </div>

                    {/* AI SIMULATION OUTPUT REPORT DISPLAY BENTO */}
                    {isLoadingSim && (
                      <div className="bg-slate-800/60 backdrop-blur-xl border-2 border-slate-700/50 border-dashed p-10 rounded-3xl text-center space-y-3">
                        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mx-auto" />
                        <p className="text-xs font-black text-slate-200 font-mono tracking-widest uppercase animate-pulse">
                          INITIALIZING NEURAL TRANSLATION PIPELINE...
                        </p>
                        <p className="text-[10px] font-semibold text-slate-400">
                          Mapping vectors, routing parameters, and drafting judicial entities on local sandboxed nodes.
                        </p>
                      </div>
                    )}

                    {!isLoadingSim && sandboxResult && (
                      <div className="bg-slate-950 text-white rounded-3xl overflow-hidden shadow-xl animate-fade-in border border-zinc-850">

                        {/* Simulation Result Header Bento Accent */}
                        <div className="bg-slate-950 px-5 py-3 border-b border-zinc-850 flex items-center justify-between text-xs text-indigo-400">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 relative flex leading-none">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            </span>
                            <span className="font-extrabold uppercase tracking-widest font-mono">
                              ACTIVE NEURAL SYSTEM DEPLOYMENT REPORT
                            </span>
                          </div>
                          {processingTime && (
                            <span className="font-mono text-slate-400 font-bold">
                              {processingTime}ms Response
                            </span>
                          )}
                        </div>

                        {/* Visual Telemetry Metrics Bento style */}
                        {visualTelemetry && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 p-4 bg-slate-950 border-b border-zinc-850">
                            {Object.entries(visualTelemetry).map(([key, val]) => (
                              <div key={key} className="bg-slate-950 border border-zinc-800 p-2.5 rounded-xl">
                                <div className="text-[9px] text-slate-400 font-mono uppercase tracking-widest">
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </div>
                                <div className="text-xs font-black text-white mt-0.5">
                                  {String(val)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Report Body */}
                        <div className="p-6 font-sans leading-relaxed text-zinc-200 text-xs overflow-x-auto whitespace-pre-wrap max-h-96 overflow-y-auto bg-slate-950 scrollbar-thin">
                          <div className="prose prose-invert prose-xs max-w-none text-zinc-200 font-medium">
                            {formatSandboxOutput(sandboxResult)}
                          </div>
                        </div>

                        <div className="bg-slate-950 px-5 py-3 border-t border-zinc-850 flex items-center justify-between text-[10px] text-slate-400 font-bold font-mono">
                          <span>Verified CCTNS Audit Checksum SHA-256 Enabled</span>
                          <span>BNS V2.0 REGISTER</span>
                        </div>

                      </div>
                    )}

                  </div>
                )}

              </div>

            </motion.div>
          ) : (
            <div className="bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50/80 p-12 rounded-3xl text-center text-slate-400 shadow-xs hover:shadow-sm transition-all duration-300">
              <ShieldAlert className="w-12 h-12 text-slate-500 mx-auto mb-3" />
              Select an AI system node from the left cabinet directory to inspect system specifics.
            </div>
          )}

        </motion.section>
      </motion.div>

      {/* 📋 IN-DEPTH BOTTOM DIRECTORY SUMMARY FOOTER BENTO STYLE */}
      <footer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50/80 rounded-3xl p-6 md:p-8 shadow-xs hover:shadow-sm transition-all duration-300">

        <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-700/50/60 hover:border-slate-600/50 transition-colors">
          <h4 className="text-slate-100 font-black mb-2 text-xs uppercase tracking-widest font-display">
            About Police AI Initiative
          </h4>
          <p className="leading-relaxed text-slate-400 text-xs font-semibold">
            An administrative suite cataloguing police operations, intelligence frameworks, ranges, zones, and headquarters (PHQ) levels AI-driven concepts for Indian Law Enforcement safety systems.
          </p>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-700/50/60 hover:border-slate-600/50 transition-colors">
          <h4 className="text-slate-100 font-black mb-2 text-xs uppercase tracking-widest font-display">
            Engineering Guidelines
          </h4>
          <p className="leading-relaxed text-slate-400 text-xs font-semibold">
            Integrates high-dimensional vector databases (Milvus), graph network maps (Neo4j), NLP tokenizers (BERT/RoBERTa), and real-time checkpoint ANPR tracking layers (YOLO).
          </p>
        </div>

        <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl p-5 border border-slate-700/50/60 hover:border-slate-600/50 transition-colors">
          <h4 className="text-slate-100 font-black mb-2 text-xs uppercase tracking-widest font-display">
            Legislative Compliance
          </h4>
          <p className="leading-relaxed text-slate-400 text-xs font-semibold">
            Complies with BNS (Bharatiya Nyaya Sanhita) procedural guidelines, ensuring secure sandboxed execution, zero data pooling leaks, and auditable departmental ledgers.
          </p>
        </div>

        <div className="col-span-1 md:col-span-3 text-center text-[9px] text-slate-400 uppercase tracking-widest font-black pt-4 border-t border-slate-700/50">
          © 2026 Police AI Directory System. Under Ministry of Home Affairs Technology Framework guidelines. Confidential.
        </div>
      </footer>

    </div>
  );
}

// Map sandboxType to beautiful illustrative inputs
function getInputSourceLabel(type: string): string {
  switch (type) {
    case 'image': return "📹 1080p Malkhana Armoury Camera Feed";
    case 'scheduling': return "📅 Duty Shifts Register & Requests Logs";
    case 'geofence': return "🚗 GPS Beacons & Highway ANPR Toll Cameras";
    case 'resource': return "📊 Historical Crowd and Festivity Logs";
    case 'integrity': return "🎤 Interrogation Room High-Res Audio";
    case 'document': return "📑 Case Diaries & Forensic PDF Files";
    case 'trend':
    default: return "📜 75+ District Crime Occurrence Records";
  }
}

function getNeuralProcessorLabel(type: string): string {
  switch (type) {
    case 'image': return "YOLO / ResNet Material Counter";
    case 'scheduling': return "Heuristic Duty Rotator V2.1";
    case 'geofence': return "Escaper Trajectory Predictor";
    case 'resource': return "Fleet Allocation Predictor";
    case 'integrity': return "WaveNet Micro-Tremor Stress Check";
    case 'document': return "BERT Legal Entity Classifier";
    case 'trend':
    default: return "GenAI State Pattern Matcher";
  }
}

function getDatabaseLabel(category: string, id: string): string {
  if (id === "gang-network" || category === "zone") {
    return "🌐 Neo4j Graph DB Node Links";
  }
  if (id === "biometric-search" || id === "master-brain") {
    return "📁 Milvus Embeddings Cluster";
  }
  if (id === "blockchain-alliance") {
    return "🔗 blockchain Secure Ledger";
  }
  return "🗄️ Standard CCTNS SQL Ledger";
}

function getActionLabel(type: string): string {
  switch (type) {
    case 'image': return "🚨 Alert Unauthorized Armory Moves";
    case 'scheduling': return "📊 Auto-Publish Shift Allocation";
    case 'geofence': return "📢 Ring Interceptor Sirens AT Tolls";
    case 'resource': return "🚒 Deploy PAC Battalions In Realtime";
    case 'integrity': return "📣 Send Truth Ratio Warning to IO";
    case 'document': return "🚩 Flag Delay Escalations to ADG";
    case 'trend':
    default: return "📈 Projection Map dispatch to DGP";
  }
}

// Predefined quick mock scenario presets for the sandbox tab
interface PresetScenario {
  label: string;
  prompt: string;
}

function getPresetScenarios(topic: AITopic): PresetScenario[] {
  switch (topic.sandboxType) {
    case "text":
      return [
        {
          label: "Chain Theft (चोरी)",
          prompt: "कल शाम करीब 7:30 बजे मेरी पत्नी गीता मंदिर से पूजा करके लौट रही थी। अचानक पीछे से काले रंग की पल्सर बाइक पर दो मुखौटा पहने लड़के आए, उन्होंने पत्नी की सोने की चेन खींची और रेलवे फाटक की तरफ भाग गए। मेरी पत्नी गिर गई और उसके पैर में चोट आई है। कृपया मुकदमा दर्ज़ करें।"
        },
        {
          label: "Burglary (नकबजनी)",
          prompt: "I closed my grocery store on Sector 15 main road on Sunday night. On Monday morning when I arrived, the side shutter lock was broken with iron rods. Cache drawer containing 15,000 INR was completely empty and 5 bags of costly spices were missing."
        },
        {
          label: "Slang Code Words",
          prompt: "Dark-Web Local Slang Capture: Recieved telegram message ID #9041: 'भाई सामान रेडी है, रात को बबुआ के पीछे 2 पुड़िया डिलीवर कर देना, कट्टा भी साथ है, पुलिस नाका बचकर आना।'"
        }
      ];
    case "image":
      return [
        {
          label: "Armoury Verification",
          prompt: "Visual scanning armoury locker sector F3. Captured visual elements: 12 INSAS Rifles, 4 Glock Pistols, 16 empty magazines, 1 steel case ammo box. Compare count with catalog balance of 12 Rifles and 5 Glocks."
        },
        {
          label: "Malkhana Seized Items",
          prompt: "Evidence logger scan: Seized shipment of 3 crates of contraband dark pill packages and 1 country-made revolver (katta) found in vehicle UP-14-K-9988."
        }
      ];
    case "scheduling":
      return [
        {
          label: "Normal 3-Day Rotation",
          prompt: "Generate standard shifts. Officers available: Inspector S.K. Sharma, SI Verma, HC Yadav, Constable Singh. High alert market festival zone next Wednesday."
        },
        {
          label: "Fatigue Minimizer relief",
          prompt: "Review duty pattern. HC Yadav completed consecutive night beach patrol shifts. Reschedule him to day administrative desk duty to avoid burnouts."
        }
      ];
    case "geofence":
      return [
        {
          label: "Escape Path Tracking",
          prompt: "A getaway white Fortuner SUV (UP-16-AB-3000) involved in a robbery in Noida is heading towards Ghaziabad at high speed. Plot ETA at NH-24 and ring intercept alerts."
        },
        {
          label: "Geo-Fence Violation",
          prompt: "Device watch tag #8091 (Habitual offender Ramu) entered within 100 meters of VIP secure corridor outer boundary circle."
        }
      ];
    case "resource":
      return [
        {
          label: "Election Deployment Grid",
          prompt: "Zone ADG deployment query: Draft security logistics grid for upcoming local assembly election in block A (High sensitivity, 20 pooling booths) and block B (Low sensitivity, 15 polling booths)."
        },
        {
          label: "Riot Control Standby",
          prompt: "Mobilize backup reserve force for Friday parade. Compute ETA for 3 reserved PAC battalions from regional cantonment bases to main city junctions."
        }
      ];
    case "integrity":
      return [
        {
          label: "Lockup Hazard Alert",
          prompt: "Camera stream locks lockup room 2. Detainee is pacing extremely fast, repeatedly looking toward hanging hooks, and exhibiting critical distress posture."
        },
        {
          label: "Micro-Tremor Scan",
          prompt: "Suspect narration voice level analyze: 'साहब, मैं उस समय वहीं था पर मैंने किसी का बैग नहीं लिया। मेरा दोस्त राहुल गवाही दे देगा कि मैं तो चाय पी रहा था।' Detect micro-tremors and truth confidence ratio."
        }
      ];
    case "document":
      return [
        {
          label: "Pendency Inspection",
          prompt: "Case log registry status check: Investigation #451 (Assault case from Jan 2026). Stagnation logs: Case diary pending for past 5 months without IO signing. CDR forensic report pending with local lab."
        },
        {
          label: "Evidence chain audit",
          prompt: "Assess checksum metrics for evidence document index #1093. Deepfake traces check: Not found. Metadata verification: Valid."
        }
      ];
    case "trend":
    default:
      return [
        {
          label: "Vector detection scan",
          prompt: "Review aggregate incident reports across 5 divisions: Sharp spike in digital OTP scams targeting elderly citizens over retirement benefit packages."
        },
        {
          label: "District safety check",
          prompt: "Perform statistical trend compilation for Range dashboard: Average charging time, crime clearance rate, summon disposal speeds in past quarter."
        }
      ];
  }
}

// Elegant formatting of sandbox outputs with beautiful highlights
function formatSandboxOutput(text: string) {
  if (!text) return "";

  // Highlight common police indicators
  return text.split('\n').map((line, i) => {
    let style = "mb-1 text-slate-500 font-sans leading-relaxed text-xs";

    // Check for headings
    if (line.trim().startsWith('###') || line.trim().startsWith('**[') || line.trim().startsWith('**1.') || line.trim().startsWith('**2.') || line.trim().startsWith('**3.')) {
      return (
        <h4 key={i} className="text-sm font-black text-indigo-400 mt-4 mb-2 border-l-2 border-indigo-500 pl-2">
          {line.replace(/###|\*\*/g, '').trim()}
        </h4>
      );
    }

    if (line.trim().startsWith('##')) {
      return (
        <h3 key={i} className="text-xs font-black text-white mt-5 mb-3 uppercase tracking-wide bg-indigo-950 px-3 py-1 rounded inline-block">
          {line.replace(/##|\*\*/g, '').trim()}
        </h3>
      );
    }

    if (line.trim().startsWith('#')) {
      return (
        <h2 key={i} className="text-sm font-black text-white mt-6 mb-4 border-b border-zinc-800 pb-2">
          {line.replace(/#|\*\*/g, '').trim()}
        </h2>
      );
    }

    // Format lists and bullet points
    if (line.trim().startsWith('•') || line.trim().startsWith('*') || line.trim().startsWith('-')) {
      return (
        <div key={i} className="flex items-start gap-2 pl-4 py-0.5">
          <span className="text-indigo-400 mt-1">•</span>
          <p className="flex-1 text-slate-500 text-xs leading-relaxed">{line.replace(/^[•*-]\s*/, '').trim()}</p>
        </div>
      );
    }

    // Table rows
    if (line.includes('|')) {
      const parts = line.split('|').map(p => p.trim()).filter(p => p);
      if (parts.length > 0) {
        return (
          <div key={i} className="grid grid-cols-12 gap-1 border-b border-zinc-800 bg-slate-950 p-1.5 px-3 font-mono text-[11px] text-slate-400">
            {parts.map((p, idx) => (
              <span key={idx} className="col-span-3 truncate text-slate-500 font-bold">{p}</span>
            ))}
          </div>
        );
      }
    }

    // Standard styling
    return (
      <p key={i} className={style}>
        {line}
      </p>
    );
  });
}
