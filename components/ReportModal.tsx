"use client";

import { useState, useEffect } from "react";
import { X, TrendingUp, Calendar, Loader2 } from "lucide-react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReportModal({ isOpen, onClose }: ReportModalProps) {
  const [reportType, setReportType] = useState<"daily" | "weekly" | "monthly">(
    "daily"
  );
  const [report, setReport] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchReport();
    }
  }, [isOpen, reportType]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reports?type=${reportType}`);
      const data = await res.json();
      setReport(data.report);
      setStats(data.stats);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto safe-area-inset">
        <div className="sticky top-0 bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-blue-600" />
              Activity Report
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full touch-target"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Report Type Selector */}
          <div className="flex gap-2">
            {(["daily", "weekly", "monthly"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setReportType(type)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors touch-target ${
                  reportType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              {stats && (
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-blue-900">
                      {stats.total}
                    </div>
                    <div className="text-sm text-blue-700">Total Notes</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-red-900">
                      {stats.urgent}
                    </div>
                    <div className="text-sm text-red-700">Urgent</div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-orange-900">
                      {stats.important}
                    </div>
                    <div className="text-sm text-orange-700">Important</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl">
                    <div className="text-3xl font-bold text-green-900">
                      {stats.completed}
                    </div>
                    <div className="text-sm text-green-700">Completed</div>
                  </div>
                </div>
              )}

              {/* AI-Generated Report */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  AI Summary
                </h3>
                <div className="prose prose-sm max-w-none">
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {report || "No activity to report for this period."}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              {/* <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    // Export functionality could be added here
                    alert('Export feature coming soon!');
                  }}
                  className="px-4 py-3 bg-white border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors touch-target"
                >
                  Export PDF
                </button>
                <button
                  onClick={fetchReport}
                  className="px-4 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors touch-target"
                >
                  Refresh
                </button>
              </div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
