import { AnnouncementCard } from "@/components";
import { useGetLastSeen } from "@/hooks/announcements";

const LastSeenAnnouncements = () => {
  const { data: announcements, isLoading } = useGetLastSeen();
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
          <p className="text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      {announcements?.map((el) => (
        <AnnouncementCard announcement={el.announsement} />
      ))}
      {!announcements?.length ? (
        <p>Last seen announcements not found!</p>
      ) : null}
    </div>
  );
};

export default LastSeenAnnouncements;
