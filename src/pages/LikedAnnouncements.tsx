import { AnnouncementCard } from "@/components";
import { useGetAllLiked } from "@/hooks/announcements";

const LikedAnnouncements = () => {
  const { data: announcements, isLoading } = useGetAllLiked();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      {announcements?.map((el) => (
        <AnnouncementCard announcement={el.announsement} />
      ))}
      {!announcements?.length ? <p>Liked announcements not found!</p> : null}
    </div>
  );
};

export default LikedAnnouncements;
