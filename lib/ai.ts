import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface SmartNoteAnalysis {
  suggestedPriority: "URGENT" | "IMPORTANT" | "MINOR";
  category: string;
  tags: string[];
  summary?: string;
}

export async function analyzeNote(content: string): Promise<SmartNoteAnalysis> {
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 500,
      messages: [
        {
          role: "user",
          content: `Analyze this entrepreneur's note and provide:
1. Suggested priority (URGENT, IMPORTANT, or MINOR)
2. A short category (max 20 chars, e.g., "Payment", "Meeting", "Personal")
3. Up to 3 relevant tags
4. A brief summary if the note is long

Note: "${content}"

Respond in JSON format:
{
  "suggestedPriority": "URGENT" | "IMPORTANT" | "MINOR",
  "category": "string",
  "tags": ["tag1", "tag2"],
  "summary": "optional summary"
}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Fallback
    return {
      suggestedPriority: "MINOR",
      category: "General",
      tags: [],
    };
  } catch (error) {
    console.error("AI analysis error:", error);
    return {
      suggestedPriority: "MINOR",
      category: "General",
      tags: [],
    };
  }
}

// Add this new function to your AI service file
export async function improveNoteContent(
  title: string,
  content: string
): Promise<{
  improvedTitle: string;
  improvedContent: string;
}> {
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 800,
      messages: [
        {
          role: "user",
          content: `You are helping improve a note for an entrepreneur. Fix any spelling errors and improve clarity while maintaining the original meaning and tone. Do NOT completely rewrite - just correct errors and improve clarity where needed.

Original Title: "${title}"
Original Content: "${content}"

Rules:
1. Fix spelling and grammar errors
2. Improve clarity if something is unclear
3. Keep the same tone and style
4. Don't add new information
5. Keep it concise - similar length to original

Respond in JSON format:
{
  "improvedTitle": "corrected title here",
  "improvedContent": "corrected content here"
}`,
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);

    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0]);
      return {
        improvedTitle: result.improvedTitle || title,
        improvedContent: result.improvedContent || content,
      };
    }

    // Fallback to original
    return { improvedTitle: title, improvedContent: content };
  } catch (error) {
    console.error("Content improvement error:", error);
    return { improvedTitle: title, improvedContent: content };
  }
}
export async function generateDailyReport(notes: any[]): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: `Generate a concise daily report for an entrepreneur based on today's activities:

${notes
  .map((n) => `- [${n.priority}] ${n.title}: ${n.content.substring(0, 100)}`)
  .join("\n")}

Create a brief summary highlighting:
1. Key accomplishments
2. Urgent items that need attention
3. Important tasks completed
4. Overview of the day

Keep it actionable and under 200 words.`,
        },
      ],
    });

    return message.content[0].type === "text"
      ? message.content[0].text
      : "No report generated";
  } catch (error) {
    console.error("Report generation error:", error);
    return "Unable to generate report at this time.";
  }
}

export async function generateWeeklyReport(notes: any[]): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: `Generate a weekly summary for an entrepreneur based on this week's activities:

${notes
  .map(
    (n) => `- [${n.priority}] ${n.createdAt.toLocaleDateString()}: ${n.title}`
  )
  .join("\n")}

Provide:
1. Week's highlights
2. Productivity patterns
3. Areas of focus
4. Actionable insights for next week

Keep it strategic and under 300 words.`,
        },
      ],
    });

    return message.content[0].type === "text"
      ? message.content[0].text
      : "No report generated";
  } catch (error) {
    console.error("Weekly report generation error:", error);
    return "Unable to generate weekly report at this time.";
  }
}

export async function generateMonthlyReport(notes: any[]): Promise<string> {
  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `Generate a monthly executive summary for an entrepreneur:

Total activities: ${notes.length}
Priority breakdown:
- Urgent: ${notes.filter((n) => n.priority === "URGENT").length}
- Important: ${notes.filter((n) => n.priority === "IMPORTANT").length}
- Minor: ${notes.filter((n) => n.priority === "MINOR").length}

Sample activities:
${notes
  .slice(0, 20)
  .map((n) => `- ${n.title}`)
  .join("\n")}

Provide:
1. Monthly achievements
2. Business insights
3. Time allocation analysis
4. Strategic recommendations

Keep it executive-level and under 400 words.`,
        },
      ],
    });

    return message.content[0].type === "text"
      ? message.content[0].text
      : "No report generated";
  } catch (error) {
    console.error("Monthly report generation error:", error);
    return "Unable to generate monthly report at this time.";
  }
}
