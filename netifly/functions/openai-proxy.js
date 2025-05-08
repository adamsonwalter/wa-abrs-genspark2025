// src/App.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * One‑page SD Narrative Clusterer UI (client side)
 * All LLM calls are proxied through a Netlify Function to keep the API key secret.
 *
 * Deployment checklist:
 *   1. Place this file at src/App.jsx (Vite + React).
 *   2. Add ./netlify/functions/openai-proxy.js (see below).
 *   3. In Netlify dashboard, set environment variable OPENAI_API_KEY.
 *   4. Build: npm run build (Vite output to dist/).
 */
export default function App() {
  const [input, setInput] = useState("Global investors pile into climate tech; carbon price triples by 2030.\nProtectionist tariffs slow clean-tech supply chains.");
  const [loading, setLoading] = useState(false);
  const [clusters, setClusters] = useState([]);

  async function analyse() {
    if (!input.trim()) return;
    setLoading(true);

    const messages = [
      {
        role: "system",
        content:
          "You are the Scenario Narrative Encoder and SD Parameteriser. Follow the specification: convert qualitative snippets into clusters and JSON parameter tuples as per mapping table. Return only the JSON object described under Reply format. Threshold 0.25. If new, ask for initial numbers."
      },
      {
        role: "user",
        content: input
      }
    ];

    try {
      const response = await fetch("/.netlify/functions/openai-proxy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages,
          temperature: 0.2,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) throw new Error("OpenAI proxy error: " + response.statusText);
      const parsed = await response.json();
      setClusters(parsed.scenario_clusters || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-slate-100 flex flex-col gap-6">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <Rocket className="w-6 h-6" /> SD Narrative Clusterer
      </h1>

      <textarea
        className="w-full h-40 p-3 rounded-xl bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        placeholder="Paste scenario snippets, one per line"
        value={input}
        onChange={e => setInput(e.target.value)}
      />

      <button
        onClick={analyse}
        disabled={loading}
        className="self-start bg-cyan-500 hover:bg-cyan-600 active:bg-cyan-700 rounded-xl px-5 py-2 font-semibold shadow-md disabled:opacity-40"
      >
        {loading ? "Thinking…" : "Analyse"}
      </button>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {clusters.map((c, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="bg-slate-700/50 backdrop-blur-lg border border-slate-600 rounded-2xl shadow-lg">
              <CardContent className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{c.name}</h2>
                <p className="text-sm italic text-slate-300">{c.short_snippet}</p>
                <pre className="bg-slate-800 rounded-lg p-2 text-sm whitespace-pre-wrap">
                  {JSON.stringify(c.parameters, null, 2)}
                </pre>
                <p className="text-sm text-slate-400">{c.why_those_parameters}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------
// netlify/functions/openai-proxy.js
// ---------------------------
/*
 * Netlify Function: Proxy OpenAI Chat Completion
 * Keeps OPENAI_API_KEY out of the client bundle.
 * Place this file under ./netlify/functions/openai-proxy.js
 */
import fetch from "node-fetch";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: "OPENAI_API_KEY missing" };
  }

  try {
    const body = event.body;
    const resp = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body
    });

    const text = await resp.text();
    return {
      statusCode: resp.status,
      body: text,
      headers: { "Content-Type": "application/json" }
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
