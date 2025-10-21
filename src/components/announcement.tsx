import { useState } from "react";
import { Announcement } from "@/types/api/announcement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Heart, Phone, TrashIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDeleteQuery, usePostQuery } from "@/hooks";
import toast from "react-hot-toast";
import { useGetAllLiked } from "@/hooks/announcements";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import customAxios from "@/services/axios";

const AnnouncementCard = ({
  announcement,
  isMy,
}: {
  announcement: Announcement;
  isMy?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const { data: likedAnnouncements } = useGetAllLiked();
  const { mutate: like } = usePostQuery(["announcement-like"]);
  const { mutate: disLike } = useDeleteQuery(["announcement-dis-like"]);
  const { mutate, isPending: isDeleting } = useDeleteQuery([
    "delete-announcement",
  ]);
  const isLiked = likedAnnouncements?.some(
    (el) => el.announcementId === announcement.id
  );
  const { mutate: markAsLastSeen } = useMutation({
    mutationFn: async (announcementId: number) => {
      await customAxios.get(`announcement/${announcementId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-last-seen"] });
    },
  });

  const handleToggle = () => {
    const mutation = isLiked ? disLike : like;

    mutation(
      {
        url: "liked",
        payload: { announcementId: announcement.id },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["get-all-liked"] });
          queryClient.invalidateQueries({
            queryKey: ["get-all-announcements"],
          });
        },
        onError: (error: any) => {
          toast.error(error.message);
        },
      }
    );
  };

  const handleLastSeen = () => {
    markAsLastSeen(announcement.id);
  };

  const handleDelete = () => {
    mutate(
      {
        url: `announcement/${announcement.id}`,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-all-announcements"],
          });
          queryClient.invalidateQueries({ queryKey: ["my-announcement"] });
          setOpen(false);
          toast.success("Announcement deleted");
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  return (
    <>
      <Card
        className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
        onClick={() => {
          setOpen(true);
          handleLastSeen();
        }}
      >
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={
              "https://api.harmonix.uz/api/uploads/" + announcement.images[0]
            }
            alt={announcement.name}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        <CardContent className="p-4 flex flex-col justify-between h-[220px]">
          <div>
            <CardHeader className="p-0 mb-2">
              <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                {announcement.name}
              </CardTitle>
            </CardHeader>

            <p className="text-sm text-slate-600 dark:text-gray-300 mb-3 line-clamp-2">
              {announcement.description}
            </p>

            <div className="flex justify-between items-center mt-2">
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                ${announcement.price}
              </span>
              <span className="text-sm text-slate-500 dark:text-gray-400">
                {announcement.location}
              </span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {isMy ? (
              <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                <Edit className="w-5 h-5" />
                edit
              </button>
            ) : (
              <a
                href={`mailto:${announcement.user?.email}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                  <Phone className="w-5 h-5" />
                  Contact
                </button>
              </a>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggle();
              }}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Heart
                className={
                  isLiked ? "w-5 h-5 fill-red-500 border-none" : "w-5 h-5"
                }
              />
              {isLiked ? "Dislike" : "Like"}
            </button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800 dark:text-white">
              {announcement.name}
            </DialogTitle>
          </DialogHeader>

          <div className="my-4">
            <img
              src={
                "https://api.harmonix.uz/api/uploads/" + announcement.images[0]
              }
              alt={announcement.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {announcement.description}
          </p>

          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${announcement.price}
            </span>
            <span className="text-sm text-slate-500 dark:text-gray-400">
              {announcement.location}
            </span>
          </div>

          <div className="flex gap-2">
            {isMy ? (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
              >
                <TrashIcon className="w-5 h-5" />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            ) : (
              <a href={`mailto:${announcement.user?.email}`} className="w-full">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                  <Phone className="w-5 h-5" />
                  Contact
                </button>
              </a>
            )}

            <button
              onClick={handleToggle}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              <Heart
                className={
                  isLiked ? "w-5 h-5 fill-red-500 border-none" : "w-5 h-5"
                }
              />
              {isLiked ? "Dislike" : "Like"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnnouncementCard;
