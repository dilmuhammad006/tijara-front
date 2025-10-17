import { AnnouncementCard } from "@/components";
import { useGetMy } from "@/hooks/announcements";

const MyAnnouncments = () => {
  const { data: announcements, isLoading } = useGetMy();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      {announcements?.map((el) => (
        <AnnouncementCard announcement={el} isMy />
      ))}
      {!announcements?.length ? (
        <p>You don't have any announcement yet!</p>
      ) : null}
    </div>
  );
};

export default MyAnnouncments;
