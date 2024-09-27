"use client";
import RoomDetails from "@/app/components/common/Details/RoomDetails";
import { useParams } from "next/navigation";

export default function RoomOne() {
  const param = useParams();
  return (
    <div>
      <RoomDetails roomId={Number(param.id)} />
    </div>
  );
}
