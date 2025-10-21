import { AnnouncementCard } from "@/components";
import {
  useGetAllAnnouncements,
  useGetAllCategories,
} from "@/hooks/announcements";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ShoppingBag, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const HomePage = () => {
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [location, setLocation] = useState<string | undefined>();

  const { data: announcements, isLoading } = useGetAllAnnouncements({
    categoryId,
    location,
  });
  const { data: categories } = useGetAllCategories();

  const locations = [
    "Tashkent",
    "Samarkand",
    "Bukhara",
    "Khiva",
    "Andijan",
    "Namangan",
    "Fergana",
    "Nukus",
    "Jizzakh",
    "Gulistan",
    "Navoi",
    "Termez",
    "Qarshi",
    "Urgench",
    "Angren",
    "Chirchik",
    "Kokand",
    "Margilan",
    "Shahrisabz",
    "Zarafshan",
  ];

  const handleResetFilters = () => {
    setCategoryId(undefined);
    setLocation(undefined);
  };

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
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900">Tijara</h1>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-slate-600" />
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Category
                </Label>
                <Select
                  value={categoryId?.toString() || "all"}
                  onValueChange={(value) =>
                    setCategoryId(value === "all" ? undefined : Number(value))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All categories</SelectItem>
                    {categories?.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-slate-700">
                  Location
                </Label>
                <Select
                  value={location || "all"}
                  onValueChange={(value) =>
                    setLocation(value === "all" ? undefined : value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All locations</SelectItem>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Reset Button */}
              <div className="flex items-end">
                <Button
                  variant="outline"
                  onClick={handleResetFilters}
                  className="w-full text-slate-600 hover:bg-slate-50"
                  disabled={!categoryId && !location}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        {/* Results Info */}
        <div className="mb-6">
          <p className="text-slate-600">
            Found{" "}
            <span className="font-semibold text-slate-900">
              {announcements?.length || 0}
            </span>{" "}
            announcements
            {categoryId && categories && (
              <span className="ml-1">
                in{" "}
                <span className="font-semibold text-slate-900">
                  {categories.find((c) => c.id === categoryId)?.name}
                </span>
              </span>
            )}
            {location && (
              <span className="ml-1">
                in{" "}
                <span className="font-semibold text-slate-900">{location}</span>
              </span>
            )}
          </p>
        </div>

        {/* Announcements Grid */}
        {announcements && announcements.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {announcements.map((el) => (
              <AnnouncementCard key={el.id} announcement={el} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              No announcements found
            </h3>
            <p className="text-slate-600">
              Try adjusting your filters or check back later
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
