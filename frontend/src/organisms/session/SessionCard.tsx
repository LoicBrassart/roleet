import { toRelative } from "@/lib/helpers/dateFormatter";
import { Card } from "@/molecules/Card";
import type { Entities } from "@/types/entities";

interface SessionCardProps {
  summary: Entities.Session["summary"];
  programmedAt: Entities.Session["programmedAt"];
}

export default function SessionCard({
  summary,
  programmedAt,
}: SessionCardProps) {
  return <Card title={toRelative(programmedAt)}>{summary}</Card>;
}
