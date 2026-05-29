import Link from "next/link";
import { notFound } from "next/navigation";
import { CLINICS, DEMO_QUEUE } from "@/lib/demo-data";
import StatusBadge from "@/components/StatusBadge";

export default async function DoctorPage({
  params,
}: {
  params: Promise<{ clinic: string }>;
}) {
  const { clinic } = await params;
  const clinicData = CLINICS[clinic];
  if (!clinicData) notFound();

  const myPatients = DEMO_QUEUE.filter((e) =>
    ["called", "in_consultation", "waiting"].includes(e.status)
  );

  const current = myPatients.find((e) => e.status === "in_consultation");
  const next = myPatients.filter((e) => e.status === "called" || e.status === "waiting").slice(0, 3);

  return (
    <div className="min-h-screen bg-oat">
      <header className="bg-ink text-white px-4 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs opacity-50">Interface médecin</p>
          <h1 className="font-bold text-lg">{clinicData.name}</h1>
        </div>
        <Link href={`/dashboard/${clinic}`} className="bg-white/10 text-xs px-3 py-1.5 rounded-lg">
          Secrétariat
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">

        {/* Current patient */}
        <section>
          <h2 className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-3">Consultation en cours</h2>
          {current ? (
            <div className="bg-white rounded-2xl p-5 shadow-soft border-l-4 border-leaf">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xl font-bold text-ink">{current.patient_name}</p>
                  <p className="text-sm text-ink/60 mt-1">{current.reason}</p>
                  <p className="text-xs text-ink/40 mt-2">Ticket #{current.ticket_number} · Arrivée {current.entered_at}</p>
                </div>
                <StatusBadge status={current.status} />
              </div>
              {current.phone && (
                <a
                  href={`https://wa.me/${current.phone.replace(/\s+/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-green-500 text-white text-sm px-4 py-2 rounded-lg font-semibold"
                >
                  💬 WhatsApp patient
                </a>
              )}
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-leaf text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-leaf/90">
                  ✓ Terminer
                </button>
                <button className="flex-1 bg-orange-100 text-orange-800 text-sm font-semibold py-2.5 rounded-xl hover:bg-orange-200">
                  🔬 Envoyer au labo
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white/60 rounded-2xl p-6 text-center text-ink/40">
              Aucun patient en consultation
            </div>
          )}
        </section>

        {/* Next patients */}
        <section>
          <h2 className="text-xs font-semibold text-ink/50 uppercase tracking-wide mb-3">Prochains patients ({next.length})</h2>
          <div className="space-y-2">
            {next.map((entry, i) => (
              <div key={entry.id} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-sm">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${i === 0 ? "bg-leaf text-white" : "bg-ink/10 text-ink"}`}>
                  {entry.ticket_number}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-ink">{entry.patient_name}</p>
                  <p className="text-xs text-ink/50">{entry.reason}</p>
                </div>
                <StatusBadge status={entry.status} />
                {i === 0 && (
                  <button className="bg-leaf/10 text-leaf text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-leaf/20">
                    Appeler
                  </button>
                )}
              </div>
            ))}
            {next.length === 0 && (
              <p className="text-sm text-ink/40 text-center py-4">File vide</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
