import RoomListing from "@/components/rooms/RoomListing";

export const metadata = {
  title: "Rooms & Accommodation | Sea Dream Beach Resort, Weligama",
  description:
    "Explore all room types at Sea Dream Beach Resort in Weligama, Sri Lanka. From budget rooms to luxury ocean-view suites with private bathrooms. Book direct for the best rates.",
};

export default function RoomsPage() {
  return (
    <div className="pt-20">
      <RoomListing />
    </div>
  );
}
