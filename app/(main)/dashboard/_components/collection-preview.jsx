"use client";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Plus, Sparkles, Clock, FileText } from "lucide-react";
import { getMoodById } from "@/app/lib/moods";

const colorSchemes = {
  unorganized: {
    bg: "bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50",
    hover: "hover:from-amber-100 hover:via-orange-100 hover:to-yellow-100",
    tab: "bg-gradient-to-r from-amber-400 to-orange-400",
    tabHover: "group-hover:from-amber-500 group-hover:to-orange-500",
    border: "border-amber-200 hover:border-amber-300",
    text: "text-amber-900",
    accent: "text-amber-600",
    shadow: "shadow-amber-100/50 hover:shadow-amber-200/60",
    glow: "group-hover:shadow-amber-300/40"
  },
  collection: {
    bg: "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50",
    hover: "hover:from-blue-100 hover:via-indigo-100 hover:to-purple-100",
    tab: "bg-gradient-to-r from-blue-500 to-indigo-500",
    tabHover: "group-hover:from-blue-600 group-hover:to-indigo-600",
    border: "border-blue-200 hover:border-blue-300",
    text: "text-blue-900",
    accent: "text-blue-600",
    shadow: "shadow-blue-100/50 hover:shadow-blue-200/60",
    glow: "group-hover:shadow-blue-300/40"
  },
  createCollection: {
    bg: "bg-gradient-to-br from-slate-50 to-gray-100",
    hover: "hover:from-slate-100 hover:to-gray-200",
    tab: "bg-gradient-to-r from-slate-300 to-gray-300",
    tabHover: "group-hover:from-slate-400 group-hover:to-gray-400",
    border: "border-slate-200 hover:border-slate-300",
    text: "text-slate-700",
    accent: "text-slate-500",
    shadow: "shadow-slate-100/50 hover:shadow-slate-200/60",
    glow: "group-hover:shadow-slate-300/40"
  },
};

const FolderTab = ({ scheme }) => (
  <div className="absolute inset-x-0 -top-2 flex justify-center">
    <div className={`
      h-3 w-20 rounded-t-lg transform -rotate-1 transition-all duration-300
      ${scheme.tab} ${scheme.tabHover}
      shadow-sm group-hover:shadow-md group-hover:w-24
    `} />
  </div>
);

const EntryPreview = ({ entry }) => (
  <div className="group/entry relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-white/30 rounded-lg 
                    backdrop-blur-sm transition-all duration-300 
                    group-hover/entry:from-white/80 group-hover/entry:to-white/50" />
    <div className="relative p-3 rounded-lg border border-white/40 
                    transition-all duration-300 group-hover/entry:border-white/60
                    group-hover/entry:translate-x-1 group-hover/entry:-translate-y-0.5">
      <div className="flex items-center gap-3">
        <span className="text-lg transition-transform duration-300 
                        group-hover/entry:scale-110 group-hover/entry:rotate-12">
          {getMoodById(entry.mood)?.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 truncate mb-1">
            {entry.title}
          </p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(new Date(entry.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const CollectionPreview = ({
  id,
  name,
  entries = [],
  isUnorganized = false,
  isCreateNew = false,
  onCreateNew,
}) => {
  const scheme = colorSchemes[isCreateNew ? "createCollection" : 
                                isUnorganized ? "unorganized" : "collection"];

  if (isCreateNew) {
    return (
      <button
        onClick={onCreateNew}
        className="group relative h-[280px] w-full transform transition-all duration-500 
                   hover:scale-105 hover:-rotate-1 focus:outline-none focus:ring-4 
                   focus:ring-slate-200 focus:ring-opacity-50"
      >
        <FolderTab scheme={scheme} />
        <div className={`
          relative h-full rounded-xl p-8 transition-all duration-500
          ${scheme.bg} ${scheme.hover} ${scheme.border} ${scheme.shadow}
          border-2 border-dashed backdrop-blur-sm
          shadow-xl ${scheme.glow} group-hover:shadow-2xl
        `}>
          <div className="h-full flex flex-col items-center justify-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-gray-200 
                              rounded-full blur-md opacity-50 group-hover:opacity-70 
                              transition-opacity duration-300" />
              <div className="relative h-16 w-16 rounded-full bg-gradient-to-br 
                              from-slate-100 to-gray-100 group-hover:from-slate-200 
                              group-hover:to-gray-200 flex items-center justify-center 
                              transition-all duration-300 group-hover:scale-110">
                <Plus className="h-8 w-8 text-slate-600 transition-all duration-300 
                                group-hover:text-slate-700 group-hover:rotate-90" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 h-5 w-5 text-slate-400 
                                  animate-pulse" />
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-slate-700 mb-2">
                Create New Collection
              </p>
              <p className="text-sm text-slate-500">
                Organize your thoughts beautifully
              </p>
            </div>
          </div>
        </div>
      </button>
    );
  }

  return (
    <Link
      href={`/collection/${isUnorganized ? "unorganized" : id}`}
      className="group relative block transform transition-all duration-500 
                 hover:scale-105 hover:rotate-1 focus:outline-none focus:ring-4 
                 focus:ring-blue-200 focus:ring-opacity-50"
    >
      <FolderTab scheme={scheme} />
      <div className={`
        relative h-[280px] rounded-xl p-6 transition-all duration-500
        ${scheme.bg} ${scheme.hover} ${scheme.border} ${scheme.shadow}
        border backdrop-blur-sm shadow-xl ${scheme.glow} 
        group-hover:shadow-2xl overflow-hidden
      `}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl 
                        from-white/20 to-transparent rounded-full -translate-y-16 
                        translate-x-16 transition-transform duration-700 
                        group-hover:translate-x-12 group-hover:-translate-y-12" />
        
        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <span className="text-3xl transition-all duration-500 
                              group-hover:scale-110 group-hover:rotate-12 
                              filter drop-shadow-sm">
                {isUnorganized ? "📂" : "📁"}
              </span>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br 
                              from-yellow-400 to-orange-400 rounded-full opacity-75 
                              animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className={`text-xl font-bold truncate ${scheme.text} 
                             transition-colors duration-300`}>
                {name}
              </h3>
              <div className={`flex items-center gap-2 mt-1 ${scheme.accent}`}>
                <FileText className="h-4 w-4" />
                <span className="text-sm font-medium">
                  {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-3">
            {entries.length > 0 ? (
              <>
                {entries.slice(0, 2).map((entry, index) => (
                  <div key={entry.id} 
                       className="opacity-0 animate-fade-in-up"
                       style={{ animationDelay: `${index * 100}ms` }}>
                    <EntryPreview entry={entry} />
                  </div>
                ))}
                {entries.length > 2 && (
                  <div className="text-center pt-2">
                    <span className={`text-xs ${scheme.accent} font-medium 
                                    px-3 py-1 rounded-full bg-white/50 
                                    transition-all duration-300 
                                    group-hover:bg-white/70`}>
                      +{entries.length - 2} more
                    </span>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center opacity-60">
                  <div className="mb-3">
                    <Sparkles className="h-8 w-8 mx-auto text-gray-400 animate-pulse" />
                  </div>
                  <p className="text-sm text-gray-500 italic">
                    No entries yet
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Start writing to fill this space
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {entries.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/30">
              <div className={`flex items-center gap-2 text-xs ${scheme.accent}`}>
                <Clock className="h-3 w-3" />
                <span>
                  Last updated {formatDistanceToNow(new Date(entries[0].createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

// CSS animations to add to your global styles
const styles = `
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.6s ease-out forwards;
}
`;

export default CollectionPreview;