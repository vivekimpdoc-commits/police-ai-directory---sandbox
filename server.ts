import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client with optimal headers
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
} else {
  console.warn("⚠️ GEMINI_API_KEY is not defined. AI Simulating features will fallback to client-side offline mock responses.");
}

// 🚔 AI Simulator Endpoint for Police Sandbox Systems
app.post("/api/simulate", async (req, res) => {
  const { topicId, titleEnglish, sandboxType, prompt, extraData } = req.body;

  if (!prompt && sandboxType !== 'scheduling' && sandboxType !== 'resource' && sandboxType !== 'trend') {
    return res.status(400).json({ error: "Missing prompt or inputs for simulation." });
  }

  // If Gemini API is not configured, generate very beautiful offline high-utility mock data securely.
  if (!ai) {
    return res.json({
      success: true,
      text: `[OFFLINE MODE] Simulation for ${titleEnglish || topicId}. Here is a mock analysis of your input:\n\n` +
            `👉 Input Provided: "${prompt || 'Default simulation trigger'}"\n\n` +
            `🔍 SYSTEM OUTPUT:\n` +
            `- Status: Completed offline verification.\n` +
            `- Accuracy Score: 94.2%\n` +
            `- Log Time: ${new Date().toISOString()}\n\n` +
            `💡 Configure a real "GEMINI_API_KEY" in the Secrets panel to activate live neural results under 250ms!`,
      visualization: getFallbackVisualization(sandboxType, prompt, extraData)
    });
  }

  try {
    let systemInstruction = "";
    let contents = "";

    switch (sandboxType) {
      case 'text':
        systemInstruction = 
          `You are an advanced police AI copilot assistant for the Indian Police Department. ` +
          `Your task is to analyze the user's input, which is a criminal complaint or local police report, and produce: ` +
          `1. A highly professional, structured First Information Report (FIR) draft or summary aligned with legal sections of BNS (Bharatiya Nyaya Sanhita) or IPC. ` +
          `2. An extraction panel containing Named Entities (Victim Name, Suspect Name, Location, Date, Time, Stolen Items/Weapons used). ` +
          `3. Recommendation or immediate Next Steps for the investigating officer.\n` +
          `Respond in beautifully formatted Markdown with distinct sections. Support both Hindi or English based on the user's language.`;
        contents = `Extract and generate complete FIR structures for the following user statement: "${prompt}"`;
        break;

      case 'image':
        systemInstruction = 
          `You are an advanced computer vision scanner AI named 'Armoury/Malkhana Vision Core'. ` +
          `The user is triggering or describing an image capture of firearms, vehicles, or contraband evidence stored in an armoury/malkhana rack. ` +
          `Analyze the input description and output a formatted table of counted items, their matching status with the inventory registry records, ` +
          `serial tags generated, rack classification location, and warnings if any unmatched or hazardous item is detected. ` +
          `Provide output in clear Markdown tables and bullets.`;
        contents = `Process this vision scan data: "${prompt}"`;
        break;

      case 'scheduling':
        systemInstruction = 
          `You are the 'Smart Scheduling & Fatigue Management AI' of the police station. ` +
          `Your duty is to generate a mock optimized shift calendar roster for 4 officers (e.g. Inspector Sharma, Sub-Inspector Verma, Head Constable Yadav, Constable Singh) ` +
          `over a 3-day window matching the user's constraints (e.g. night beats, market patrol, traffic control, leave relief). ` +
          `Ensure no officer is scheduled for consecutive overnight duties. Outlay a clean shift roster table in markdown and specify the fairness metric score.`;
        contents = `Generate the weekly/daily shift roster based on this instruction/date constraint: "${prompt || 'Standard weekly cycle'}"`;
        break;

      case 'geofence':
        systemInstruction = 
          `You are the 'Smart Blockade (Naka) & Track Path Simulator AI'. ` +
          `The user is simulating an escape vehicle path, geo-fenced boundaries, or toll camera flags. ` +
          `Model the most probable routes, estimated time of arrival (ETA) at various exit junctions, and output a detailed intercept checkpoint list table. ` +
          `List critical escape junctions with threat levels (High, Med, Low). Output in clean markdown.`;
        contents = `Track vehicle path / Geofence inputs: "${prompt || 'Suspect vehicle fled from Sector 1 towards state border Route 5'}"`;
        break;

      case 'resource':
        systemInstruction = 
          `You are the 'Resource & Battalion Optimization Engine AI' at Zone/PHQ level. ` +
          `The user is asking for resource projection / force mobilization (e.g., deploying PAC battalions for rally, festival, elections, or disaster zones). ` +
          `Based on key details, calculate and recommend a resource grid: ` +
          `- Recommended Active Force Deployments (No. of battalions, patrol cars, crowd barriers, drones)` +
          `- High Threat deployment clusters` +
          `- Logistics allocation efficiency indices.\n` +
          `Output a professional tactical table and deployment rules in Markdown.`;
        contents = `Resource allocation requirement: "${prompt || 'Large procession festival next week'}"`;
        break;

      case 'integrity':
        systemInstruction = 
          `You are the 'Non-Invasive Integrity, Body Language & Safety Guardian AI'. ` +
          `Your job is to screen audio, video, or behavioral statements and evaluate truth indices, tension indicators (pupil flags, voice tremors, micro-expressions) ` +
          `or security hazards (lockup suicide threats, riot spikes). ` +
          `Produce an integrity or safety risk rating screen (High, Medium, Low) with a point-by-point diagnostic breakdown of the behavioral metrics. ` +
          `Always output a highly professional assessment formatted in elegant layout headers.`;
        contents = `Behavior or voice input to verify: "${prompt}"`;
        break;

      case 'document':
        systemInstruction = 
          `You are the 'Digital Forensics & Internal Case Auditor Engine' of police headquarters. ` +
          `The user is uploading or describing complex case summaries or evidence logs. ` +
          `Highlight पेंडेंसी (delay bottlenecks), missing forensic documents (e.g., missing CDR, ballistic lab reports), ` +
          `and integrity rating checklist scores out of 100 for the investigation quality. Format in beautiful bold tables.`;
        contents = `Investigate static document contents: "${prompt}"`;
        break;

      case 'trend':
      default:
        systemInstruction = 
          `You are the 'Crime Mirror State-wide Trend Analyzer AI'. ` +
          `Synthesize regional safety inputs and detect hidden crime vectors (e.g., cyber scams targeting senior citizens, chain-snatchings near markets). ` +
          `Generate a comprehensive 3-bullet core vector pattern, localized risk temperature scoring, and tactical recommendations for DGP directives. Format in Markdown.`;
        contents = `Analyze state/regional logs: "${prompt || 'Recent 3 district chain snatching logs'}"`;
        break;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2, // low temperature for precise, professional police reports
      }
    });

    const parsedText = response.text || "No response received from the neural analyzer.";

    res.json({
      success: true,
      text: parsedText,
      visualization: getFallbackVisualization(sandboxType, prompt, extraData)
    });

  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({
      error: "AI Simulation error",
      details: error.message || error
    });
  }
});

// Helper to generate dynamic structured telemetry visualizations for the UI panels!
function getFallbackVisualization(type: string, prompt: string, extraData: any) {
  const timestamp = new Date().toLocaleTimeString();
  switch (type) {
    case 'image':
      return {
        scannedAt: timestamp,
        integrityHash: "SHA-256:d83d1c81ac..",
        itemsCount: 14,
        unauthorizedObjects: 0,
        rackLocation: "Evidence Vault rack-A3"
      };
    case 'scheduling':
      return {
        efficiencyRating: "98.4%",
        overloadsAvoided: 4,
        fairnessCoefficient: "0.95 / 1.00",
        alerts: []
      };
    case 'geofence':
      return {
        activeFences: 4,
        lastBreachTarget: "NAKA-Check-7",
        interceptETA: "8 minutes",
        escapeProbability: "12%"
      };
    case 'resource':
      return {
        allocatedBattallions: 6,
        droneBasesCovered: 3,
        trafficImpactMetric: "Low-Medium",
        optimalBudgetUtilization: "92.5%"
      };
    case 'integrity':
      return {
        voiceStressRatio: "14%",
        microTremorsCount: 2,
        truthCertainty: "89.1%",
        hazardAlertLevel: "NORMAL"
      };
    default:
      return {
        status: "ACTIVE_MONITOR",
        processedNodes: 12,
        syncLatency: "24ms"
      };
  }
}

// Vite integration for dev server or static serving for prod
if (process.env.NODE_ENV !== "production") {
  createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  }).then((vite) => {
    app.use(vite.middlewares);
    
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`🚀 [DEV SEVER] Police AI Sandbox running at http://localhost:${PORT}`);
    });
  });
} else {
  const distPath = path.join(process.cwd(), "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 [PROD SERVER] Police AI Sandbox running on port ${PORT}`);
  });
}
