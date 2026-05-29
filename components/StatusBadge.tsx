import type { QueueStatus } from "@/lib/demo-data";
import { STATUS_LABELS } from "@/lib/demo-data";

const statusColors: Record<QueueStatus, string> = {
  waiting:         "bg-yellow-100 text-yellow-800",
  called:          "bg-blue-100 text-blue-800",
  in_consultation: "bg-purple-100 text-purple-800",
  lab_processing:  "bg-orange-100 text-orange-800",
  results_ready:   "bg-green-100 text-green-800",
  completed:       "bg-gray-100 text-gray-600",
  absent:          "bg-red-100 text-red-700",
  cancelled:       "bg-red-200 text-red-900",
};

export default function StatusBadge({ status }: { status: QueueStatus }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[status]}`}>
      {STATUS_LABELS[status]}
    </span>
  );
}
