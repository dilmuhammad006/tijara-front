import { AnnouncementCard } from "@/components";
import { useGetAllAnnouncements } from "@/hooks/announcements";
import { Category } from "@/types/api/announcement";
import { useState } from "react";

const HomePage = () => {
  const [category, setCategory] = useState<Category>();
  const [location, setLocation] = useState<string>();
  const { data: announcements, isLoading } = useGetAllAnnouncements({
    categoryId: category?.id,
    location,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="grid grid-cols-4 gap-4">
      {announcements?.map((el) => (
        <AnnouncementCard key={el.id} announcement={el} />
      ))}
    </div>
  );
};

export default HomePage;
