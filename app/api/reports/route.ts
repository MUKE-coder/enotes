import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateDailyReport, generateWeeklyReport, generateMonthlyReport } from '@/lib/ai';
import { auth } from '@/lib/auth';
import { startOfDay, endOfDay, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from 'date-fns';

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'daily';
    const date = searchParams.get('date') ? new Date(searchParams.get('date')!) : new Date();

    let startDate: Date;
    let endDate: Date;

    switch (type) {
      case 'weekly':
        startDate = startOfWeek(date);
        endDate = endOfWeek(date);
        break;
      case 'monthly':
        startDate = startOfMonth(date);
        endDate = endOfMonth(date);
        break;
      default: // daily
        startDate = startOfDay(date);
        endDate = endOfDay(date);
    }

    const notes = await prisma.note.findMany({
      where: {
        userId: session.user.id,
        createdAt: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    let report: string;
    switch (type) {
      case 'weekly':
        report = await generateWeeklyReport(notes);
        break;
      case 'monthly':
        report = await generateMonthlyReport(notes);
        break;
      default:
        report = await generateDailyReport(notes);
    }

    // Calculate statistics
    const stats = {
      total: notes.length,
      urgent: notes.filter(n => n.priority === 'URGENT').length,
      important: notes.filter(n => n.priority === 'IMPORTANT').length,
      minor: notes.filter(n => n.priority === 'MINOR').length,
      completed: notes.filter(n => n.completedAt).length,
      pinned: notes.filter(n => n.isPinned).length,
    };

    return NextResponse.json({ 
      report, 
      stats,
      period: type,
      date: date.toISOString(),
      noteCount: notes.length,
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  }
}
