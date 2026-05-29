import Link from "next/link";
import { notFound } from "next/navigation";
import { CLINICS, DEMO_STATS, STATUS_LABELS } from "@/lib/demo-data";
import type { QueueStatus } from "@/lib/demo-data";

const BAR_MAX = 60;

export default async function AnalyticsPage({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const { clinic } = await params;
  const clinicData = CLINICS[clinic];
  if (!clinicData) notFound();

  const s = DEMO_STATS;
  const completionRate = Math.round((s.today_completed / s.today_total) * 100);

  return (
    <div className="min-h-screen bg-oat">
      <header className="bg-moss text-white px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs opacity-70">Statistiques</p>
          <h1 className="font-bold text-lg">{clinicData.name}</h1>
        </div>
        <Link href={`/dashboard/${clinic}`} className="bg-white/15 text-xs px-3 py-1.5 rounded-lg">
          ← Retour
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Patients aujourd'hui", value: s.today_total, color: "text-leaf" },
            { label: "Terminés", value: s.today_completed, color: "text-leaf" },
            { label: "Taux de complétion", value: `${completionRate}%`, color: "text-moss" },
            { label: "Attente moy.", value: `${s.avg_wait_minutes} min`, color: "text-clay" },
          ].map((k) => (
            <div key={k.label} className="bg-white rounded-2xl p-4 shadow-soft text-center">
              <p className={`text-2xl font-bold ${k.color}`}>{k.value}</p>
              <p className="text-xs text-ink/50 mt-1">{k.label}</p>
            </div>
          ))}
        </div>

        {/* Weekly bar chart */}
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h2 className="font-semibold text-ink mb-4">Patients cette semaine</h2>
          <div className="flex items-end gap-2 h-32">
            {s.by_day.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-xs text-ink/50">{d.count || ""}</span>
                <div
                  className="w-full rounded-t-lg bg-leaf/80"
                  style={{ height: `${(d.count / BAR_MAX) * 100}%`, minHeight: d.count ? 4 : 0 }}
                />
                <span className="text-xs font-semibold text-ink/60">{d.day}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink/40 mt-3 text-right">Total semaine : {s.week_total} patients</p>
        </div>

        {/* Status breakdown */}
        <div className="bg-white rounded-2xl p-5 shadow-soft">
          <h2 className="font-semibold text-ink mb-4">Répartition par statut (aujourd'hui)</h2>
          <div className="space-y-2">
            {(Object.entries(s.by_status) as [QueueStatus, number][]).map(([status, count]) => (
              <div key={status} className="flex items-center gap-3">
                <span className="text-sm text-ink/70 w-36 flex-shrink-0">{STATUS_LABELS[status]}</span>
                <div className="flex-1 bg-oat rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-leaf rounded-full"
                    style={{ width: `${(count / s.today_total) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-semibold text-ink w-6 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
