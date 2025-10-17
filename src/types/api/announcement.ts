export interface Announcement {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  images: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  categoryID: number;
  user?: {
    email: string;
  };
}

export interface AllAnnouncements {
  message: string;
  data: Announcement[];
}

export interface Category {
  id: number;
  name: string;
  Announcement: Announcement[];
}

export interface AllCategories {
  message: string;
  data: Category[];
}

export interface LikedAndLastSeenAnnouncements {
  message: "success";
  data: {
    id: 5;
    userId: 1;
    announcementId: 1;
    createdAt: "2025-10-15T09:02:39.232Z";
    announsement: Announcement;
  }[];
}
