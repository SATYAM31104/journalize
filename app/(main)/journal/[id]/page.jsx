import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Clock, Heart, BookOpen } from "lucide-react";
import DeleteDialog from "./_components/delete-dialog";
import EditButton from "./_components/edit-button";
import { getMoodById } from "@/app/lib/moods";
import { getJournalEntry } from "@/actions/journal";

export default async function JournalEntryPage({ params }) {
  const { id } = await params;
  const entry = await getJournalEntry(id);
  const mood = getMoodById(entry.mood);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto">
        {/* Hero Image Section */}
        {entry.moodImageUrl && (
          <div className="relative h-64 md:h-80 w-full overflow-hidden rounded-b-3xl shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10" />
            <Image
              src={entry.moodImageUrl}
              alt="Mood visualization"
              className="object-cover transition-transform duration-700 hover:scale-105"
              fill
              priority
            />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    {entry.title}
                  </h1>
                  <div className="flex items-center gap-2 text-white/90">
                    <CalendarDays className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {format(new Date(entry.createdAt), "EEEE, MMMM do, yyyy")}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <EditButton entryId={id} />
                  <DeleteDialog entryId={id} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header Section (when no image) */}
        {!entry.moodImageUrl && (
          <div className="px-6 pt-8 pb-6">
            <Card className="border-0 shadow-lg bg-gradient-to-r from-white to-slate-50">
              <CardContent className="p-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-3">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-blue-700 to-purple-700 bg-clip-text text-transparent">
                      {entry.title}
                    </h1>
                    <div className="flex items-center gap-2 text-slate-600">
                      <CalendarDays className="w-5 h-5" />
                      <span className="font-medium">
                        {format(new Date(entry.createdAt), "EEEE, MMMM do, yyyy")}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <EditButton entryId={id} />
                    <DeleteDialog entryId={id} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="px-6 pb-8 space-y-6">
          {/* Metadata Section */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-wrap items-center gap-4">
                {/* Collection Badge */}
                {entry.collection && (
                  <Link 
                    href={`/collection/${entry.collection.id}`}
                    className="transition-transform hover:scale-105"
                  >
                    <Badge className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0 shadow-md">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {entry.collection.name}
                    </Badge>
                  </Link>
                )}

                {/* Mood Badge */}
                <Badge
                  className="px-4 py-2 border-2 shadow-md transition-all hover:shadow-lg"
                  style={{
                    backgroundColor: `var(--${mood?.color}-50, #f8fafc)`,
                    color: `var(--${mood?.color}-700, #334155)`,
                    borderColor: `var(--${mood?.color}-200, #e2e8f0)`,
                  }}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Feeling {mood?.label}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Content Section */}
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <div className="ql-snow">
                <div
                  className="ql-editor prose prose-lg max-w-none
                    prose-headings:text-slate-800 
                    prose-p:text-slate-700 prose-p:leading-relaxed
                    prose-strong:text-slate-800
                    prose-em:text-slate-600
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                    prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:py-2
                    prose-ul:text-slate-700 prose-ol:text-slate-700
                    prose-li:marker:text-blue-500"
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <Card className="border-0 shadow-md bg-gradient-to-r from-slate-50 to-gray-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                <Clock className="w-4 h-4" />
                <span>
                  Last updated on {format(new Date(entry.updatedAt), "MMMM do, yyyy 'at' h:mm a")}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}