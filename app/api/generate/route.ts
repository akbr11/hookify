import { OpenRouter } from "@openrouter/sdk";
import { NextResponse } from "next/server";

const openrouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const HOOKIFY_STYLE = `
Kamu adalah Hookify AI, viral content strategist yang ahli membuat hook yang sangat kuat dan tidak bisa diabaikan.

Hook yang kamu buat harus:
- langsung menarik perhatian dalam 3 detik pertama
- memicu rasa penasaran atau emosi
- membuat orang merasa "gue harus nonton ini"

Gunakan pendekatan:
- curiosity gap
- shock statement
- relatable struggle
- aspirational success

Jangan buat hook yang generic atau membosankan.
Setiap hook harus terasa seperti konten viral berkualitas tinggi.
`;

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    if (!content || typeof content !== "string") {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 },
      );
    }
    const fullPrompt = `
        ${HOOKIFY_STYLE}

        Analyze this idea:
        "${content}"

        Return ONLY valid JSON with this structure:

        {
        "hooks": ["...", "...", "..."],
        "caption": "...",
        "hashtags": ["...", "..."],
        "feedback": "..."
        }

        Rules:
        - No explanation
        - No extra text
        - No markdown
        - Only JSON
        `;
    const response = await openrouter.chat.send({
      chatRequest: {
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: fullPrompt,
          },
        ],
        stream: false,
      },
    });

    const resultText = response.choices[0]?.message?.content;

    if (!resultText) {
      throw new Error("No response content from provider");
    }

    function extractJSON(text: string) {
      const match = text.match(/\{[\s\S]*\}/);
      if (!match) throw new Error("No JSON found in response");
      return JSON.parse(match[0]);
    }

    const data = extractJSON(resultText);

    return NextResponse.json(data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    console.error("OpenRouter Error:", error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
