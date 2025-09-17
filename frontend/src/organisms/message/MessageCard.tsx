import { toRelative } from "@/lib/helpers/dateFormatter";
import { Card } from "@/molecules/Card";
import type { Entities } from "@/types/entities";

interface MessageCardProps {
  content: Entities.Message["content"];
  createdAt: Entities.Message["createdAt"];
}

export default function MessageCard({ content, createdAt }: MessageCardProps) {
  return <Card title={toRelative(createdAt)}>{content}</Card>;
}
