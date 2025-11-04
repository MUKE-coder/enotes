import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { analyzeNote, improveNoteContent } from "@/lib/ai";
import { auth } from "@/lib/auth";

// export async function POST(req: NextRequest) {
//   try {
//     const session = await auth.api.getSession({ headers: req.headers });

//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { title, content, priority, reminder, useAI } = await req.json();

//     let aiAnalysis = null;
//     if (useAI && content) {
//       aiAnalysis = await analyzeNote(content);
//     }

//     const note = await prisma.note.create({
//       data: {
//         title,
//         content,
//         priority: aiAnalysis?.suggestedPriority || priority || 'MINOR',
//         reminder: reminder ? new Date(reminder) : null,
//         category: aiAnalysis?.category,
//         tags: aiAnalysis?.tags || [],
//         userId: session.user.id,
//       },
//     });

//     return NextResponse.json({ note, aiAnalysis });
//   } catch (error) {
//     console.error('Error creating note:', error);
//     return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
//   }
// }
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, priority, reminder, useAI } = await req.json();

    let improvedTitle = title;
    let improvedContent = content;
    let aiAnalysis = null;

    if (useAI && content) {
      // First improve the content
      const improvements = await improveNoteContent(title, content);
      improvedTitle = improvements.improvedTitle;
      improvedContent = improvements.improvedContent;

      // Then analyze the improved content
      aiAnalysis = await analyzeNote(improvedContent);
    }

    const note = await prisma.note.create({
      data: {
        title: improvedTitle,
        content: improvedContent,
        priority: aiAnalysis?.suggestedPriority || priority || "MINOR",
        reminder: reminder ? new Date(reminder) : null,
        category: aiAnalysis?.category,
        tags: aiAnalysis?.tags || [],
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      note,
      aiAnalysis,
      improvements: useAI
        ? {
            originalTitle: title,
            originalContent: content,
            wasImproved: improvedTitle !== title || improvedContent !== content,
          }
        : null,
    });
  } catch (error) {
    console.error("Error creating note:", error);
    return NextResponse.json(
      { error: "Failed to create note" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const archived = searchParams.get("archived") === "true";

    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
        archived,
      },
      orderBy: [{ isPinned: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("Error fetching notes:", error);
    return NextResponse.json(
      { error: "Failed to fetch notes" },
      { status: 500 }
    );
  }
}
