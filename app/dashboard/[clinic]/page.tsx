import Link from "next/link";
import { notFound } from "next/navigation";
import { CLINICS, DEMO_QUEUE, STATUS_LABELS } from "@/lib/demo-data";
import type { QueueStatus } from "@/lib/demo-data";
import StatusBadge from "@/components/StatusBadge";

const STATUS_ORDER: QueueStatus[] = [
  "called", "in_consultation", "waiting", "lab_processing",
  "results_ready", "absent", "completed", "cancelled",
];

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const { clinic } = await params;
  const clinicData = CLINICS[clinic];
  if (!clinicData) notFound();

  const active = DEMO_QUEUE.filter((e) =>
    ["waiting", "called", "in_consultation", "lab_processing", "results_ready"].includes(e.status)
  );
  const done = DEMO_QUEUE.filter((e) =>
    ["completed", "absent", "cancelled"].includes(e.status)
  );

  const sorted = [...active].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
  );

  return (
    <div className="min-h-screen bg-oat">
      {/* Header */}
      <header className="bg-leaf text-white px-4 py-3 flex items-center justify-between shadow">
        <div>
          <p className="text-xs opacity-70">Secrétariat</p>
          <h1 className="font-bold text-lg">{clinicData.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/analytics/${clinic}`} className="bg-white/15 hover:bg-white/25 text-xs px-3 py-1.5 rounded-lg">
            Statistiques
          </Link>
          <Link href={`/doctor/${clinic}`} className="bg-white/15 hover:bg-white/25 text-xs px-3 py-1.5 rounded-lg">
            Médecin
          </Link>
          <Link href={`/join/${clinic}`} className="bg-white text-leaf font-semibold text-xs px-3 py-1.5 rounded-lg">
            + Patient
          </Link>
        </div>
      </header>

      {/* Stats strip */}
      <div className="bg-white border-b border-ink/10 px-4 py-3 flex gap-6 overflow-x-auto text-sm">
        {[
          { label: "En attente", value: active.filter((e) => e.status === "waiting").length, color: "text-yellow-700" },
          { label: "En consultation", value: active.filter((e) => e.status === "in_consultation").length, color: "text-purple-700" },
          { label: "Labo", value: active.filter((e) => ["lab_processing", "results_ready"].includes(e.status)).length, color: "text-orange-700" },
          { label: "Terminés", value: done.filter((e) => e.status === "completed").length, color: "text-gray-600" },
        ].map((s) => (
          <div key={s.label} className="flex-shrink-0 text-center">
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-ink/50 text-xs">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Queue */}
      <main className="max-w-4xl mx-auto px-4 py-6 space-y-3">
        <h2 className="font-semibold text-ink/70 text-sm uppercase tracking-wide mb-4">
          File active — {sorted.length} patients
        </h2>

        {sorted.map((entry) => (
          <div key={entry.id} className="bg-white rounded-2xl p-4 shadow-soft flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-leaf text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {entry.ticket_number}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-ink">{entry.patient_name}</p>
                <StatusBadge status={entry.status} />
                {entry.has_lab && (
                  <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">🔬 Labo</span>
                )}
              </div>
              <p className="text-sm text-ink/60 mt-0.5">{entry.reason}</p>
              <p className="text-xs text-ink/40 mt-1">Arrivée {entry.entered_at} · {entry.tracking_id}</p>
            </div>
            <div className="flex flex-col gap-2 items-end flex-shrink-0">
              {entry.phone ? (
                <a
                  href={`https://wa.me/${entry.phone.replace(/\s+/g, "")}?text=Bonjour+${encodeURIComponent(entry.patient_name)}%2C+c%27est+votre+tour+%E2%80%94+${clinicData.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg font-semibold"
                >
                  WhatsApp
                </a>
              ) : (
                <span className="text-xs text-ink/30 italic">Sans tél.</span>
              )}
              {entry.status === "results_ready" && (
                <Link
                  href={`/results/${entry.tracking_id}`}
                  className="text-xs text-leaf underline"
                >
                  Voir résultats
                </Link>
              )}
            </div>
          </div>
        ))}

        {/* Completed section */}
        {done.length > 0 && (
          <details className="mt-6">
            <summary className="cursor-pointer font-semibold text-ink/50 text-sm uppercase tracking-wide mb-3">
              Terminés / Absents ({done.length})
            </summary>
            <div className="space-y-2 mt-3">
              {done.map((entry) => (
                <div key={entry.id} className="bg-white/60 rounded-xl p-3 flex items-center gap-3 opacity-70">
                  <div className="w-8 h-8 rounded-full bg-ink/10 text-ink flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {entry.ticket_number}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-ink">{entry.patient_name}</p>
                    <p className="text-xs text-ink/50">{entry.reason}</p>
                  </div>
                  <StatusBadge status={entry.status} />
                </div>
              ))}
            </div>
          </details>
        )}
      </main>
    </div>
  );
}
