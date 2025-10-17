import { AnnouncementCard } from "@/components";
import { useGetLastSeen } from "@/hooks/announcements";

const LastSeenAnnouncements = () => {
  const { data: announcements, isLoading } = useGetLastSeen();
  if (isLoading) {
    return <p>Loading...</p>;
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
