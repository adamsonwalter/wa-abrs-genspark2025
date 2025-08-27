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