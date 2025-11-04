'use client';

import { Note } from '@prisma/client';
import { Pin, Clock, MoreVertical, Edit2, Trash2, Check } from 'lucide-react';
import { formatDate, getPriorityBadgeColor } from '@/lib/utils';
import { useState } from 'react';

interface NoteCardProps {
  note: Note;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onUpdate, onDelete }: NoteCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const togglePin = () => {
    onUpdate(note.id, { isPinned: !note.isPinned });
  };

  const toggleComplete = () => {
    onUpdate(note.id, { 
      completedAt: note.completedAt ? null : new Date() 
    });
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-4 p-4 transition-all ${
      note.priority === 'URGENT' ? 'border-l-red-500' :
      note.priority === 'IMPORTANT' ? 'border-l-orange-500' :
      'border-l-gray-300'
    } ${note.completedAt ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={`font-semibold text-gray-900 ${
              note.completedAt ? 'line-through' : ''
            }`}>
              {note.title}
            </h3>
            {note.isPinned && (
              <Pin className="w-4 h-4 text-blue-600 fill-blue-600" />
            )}
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {note.content}
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded touch-target"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          
          {showMenu && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border z-20">
                <button
                  onClick={() => {
                    togglePin();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Pin className="w-4 h-4" />
                  {note.isPinned ? 'Unpin' : 'Pin'}
                </button>
                <button
                  onClick={() => {
                    toggleComplete();
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  {note.completedAt ? 'Mark incomplete' : 'Mark complete'}
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete this note?')) {
                      onDelete(note.id);
                    }
                    setShowMenu(false);
                  }}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600 flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset ${
          getPriorityBadgeColor(note.priority)
        }`}>
          {note.priority}
        </span>
        
        {note.category && (
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
            {note.category}
          </span>
        )}

        {note.reminder && new Date(note.reminder) > new Date() && (
          <span className="text-xs text-blue-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDate(note.reminder)}
          </span>
        )}

        <span className="text-xs text-gray-400 ml-auto">
          {formatDate(note.createdAt)}
        </span>
      </div>

      {note.tags && note.tags.length > 0 && (
        <div className="flex gap-1 mt-2 flex-wrap">
          {note.tags.map((tag, i) => (
            <span key={i} className="text-xs text-gray-600 bg-gray-50 px-2 py-0.5 rounded">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
