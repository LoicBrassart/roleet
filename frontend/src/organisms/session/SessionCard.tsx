import { toDateTime, toRelative } from "@/lib/helpers/dateFormatter";
import { Card } from "@/molecules/Card";
import type { Entities } from "@/types/entities";

interface SessionCardProps {
  session: Entities.Session;
}
export default function SessionCard({ session }: SessionCardProps) {
  return (
    <Card
      title={`${toDateTime(session.programmedAt).replace(" ", " - ")}`}
      description={`${toRelative(session.programmedAt)} - ${session.location}`}
      height="32"
    >
      {session.summary}
    </Card>
  );
}
