const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Colors
code = code.replace(/\bbg-white\b/g, 'bg-slate-900/60 backdrop-blur-2xl');
code = code.replace(/\bbg-zinc-50\b/g, 'bg-slate-800/60 backdrop-blur-xl');
code = code.replace(/\bbg-zinc-100\b/g, 'bg-slate-800');
code = code.replace(/\bbg-zinc-900\b/g, 'bg-slate-950');
code = code.replace(/\bbg-zinc-950\b/g, 'bg-slate-950');

code = code.replace(/\bborder-zinc-200\b/g, 'border-slate-700/50');
code = code.replace(/\bborder-zinc-300\b/g, 'border-slate-600/50');
code = code.replace(/\bborder-zinc-100\b/g, 'border-slate-700/30');

code = code.replace(/\btext-zinc-900\b/g, 'text-slate-100');
code = code.replace(/\btext-zinc-950\b/g, 'text-white');
code = code.replace(/\btext-zinc-800\b/g, 'text-slate-200');
code = code.replace(/\btext-zinc-700\b/g, 'text-slate-300');
code = code.replace(/\btext-zinc-600\b/g, 'text-slate-400');
code = code.replace(/\btext-zinc-500\b/g, 'text-slate-400');
code = code.replace(/\btext-zinc-400\b/g, 'text-slate-400');
code = code.replace(/\btext-zinc-300\b/g, 'text-slate-500');

code = code.replace(/\bshadow-zinc-200\b/g, 'shadow-slate-900/50');

// Body background update
// In App.tsx the root div has bg-zinc-100.
code = code.replace(/className="min-h-screen bg-zinc-100/g, 'className="min-h-screen bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-200');

// Sandbox Terminal Redesign
// We need to find the Sandbox Simulator section and give it a matrix/cyber look.
// Sandbox text changes:
code = code.replace(/bg-zinc-950 text-emerald-400/g, 'bg-black text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] border border-cyan-900/50');
code = code.replace(/text-emerald-400/g, 'text-cyan-400');
code = code.replace(/border-emerald-900\/50/g, 'border-cyan-900/50');
code = code.replace(/bg-emerald-950/g, 'bg-cyan-950/30');
code = code.replace(/bg-emerald-500/g, 'bg-cyan-500');
code = code.replace(/text-emerald-500/g, 'text-cyan-500');

fs.writeFileSync('src/App.tsx', code);
console.log('App.tsx theme replaced successfully.');
