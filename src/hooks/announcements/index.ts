import customAxios from "@/services/axios";
import { AllAnnouncements, LikedAndLastSeenAnnouncements } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetAllAnnouncements = ({
  categoryId,
  location,
}: {
  categoryId?: number;
  location?: string;
}) => {
  return useQuery({
    queryKey: ["get-all-announcements", categoryId, location],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (categoryId !== undefined)
        params.append("categoryId", categoryId.toString());
      if (location) params.append("location", location);

      const { data } = await customAxios.get<AllAnnouncements>(
        `announcement?${params.toString()}`
      );
      return data.data;
    },
  });
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["get-all-categories"],
    queryFn: async () => {
      const { data } = await customAxios.get<AllAnnouncements>("category");
      return data.data;
    },
  });
};

export const useGetAllLiked = () => {
  return useQuery({
    queryKey: ["get-all-liked"],
    queryFn: async () => {
      const { data } = await customAxios.get<LikedAndLastSeenAnnouncements>(
        "liked/all"
      );
      return data.data;
    },
  });
};

export const useGetLastSeen = () => {
  return useQuery({
    queryKey: ["get-all-last-seen"],
    queryFn: async () => {
      const { data } = await customAxios.get<LikedAndLastSeenAnnouncements>(
        "last-seen"
      );
      return data.data;
    },
  });
};
export const useGetMy = () => {
  return useQuery({
    queryKey: ["my-announcement"],
    queryFn: async () => {
      const { data } = await customAxios.get<AllAnnouncements>(
        "announcement/my"
      );
      return data.data;
    },
  });
};
