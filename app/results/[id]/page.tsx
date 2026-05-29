import Link from "next/link";
import { notFound } from "next/navigation";
import { DEMO_LAB_RESULT } from "@/lib/demo-data";

const STATUS_CONFIG = {
  pending:    { label: "En attente de traitement", color: "bg-yellow-100 text-yellow-800", icon: "⏳" },
  processing: { label: "Analyse en cours au laboratoire", color: "bg-orange-100 text-orange-800", icon: "🔬" },
  ready:      { label: "Résultats disponibles", color: "bg-green-100 text-green-800", icon: "✅" },
};

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: replace with Supabase query
  const result = id === DEMO_LAB_RESULT.tracking_id ? DEMO_LAB_RESULT : null;

  if (!result) notFound();

  const cfg = STATUS_CONFIG[result.status];

  return (
    <div className="min-h-screen bg-oat flex flex-col">
      <header className="bg-leaf text-white px-4 py-4 text-center">
        <p className="text-xs opacity-70">Suivi de résultats</p>
        <h1 className="font-bold text-lg">Bio Ahwa Care</h1>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-8 space-y-5">

        {/* Tracking ID */}
        <div className="text-center">
          <p className="text-xs text-ink/40 uppercase tracking-widest">Référence</p>
          <p className="font-mono text-lg font-bold text-ink mt-1">{result.tracking_id}</p>
        </div>

        {/* Status card */}
        <div className={`rounded-2xl px-5 py-4 flex items-center gap-3 font-semibold ${cfg.color}`}>
          <span className="text-2xl">{cfg.icon}</span>
          <span>{cfg.label}</span>
        </div>

        {/* Patient & test info */}
        <div className="bg-white rounded-2xl p-5 shadow-soft space-y-3">
          <Row label="Patient" value={result.patient_name} />
          <Row label="Analyse" value={result.test_name} />
          <Row label="Médecin" value={result.doctor} />
          <Row label="Demandé le" value={result.requested_at} />
          {result.ready_at && <Row label="Disponible le" value={result.ready_at} />}
        </div>

        {/* Result summary */}
        {result.status === "ready" && result.result_summary && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Résumé des résultats</p>
            <p className="text-sm text-ink leading-relaxed">{result.result_summary}</p>
            <p className="text-xs text-ink/40 mt-4 italic">
              Ces résultats sont fournis à titre informatif. Consultez votre médecin pour interprétation.
            </p>
          </div>
        )}

        {result.status !== "ready" && (
          <div className="bg-white/60 rounded-2xl p-5 text-center text-sm text-ink/50">
            Vos résultats ne sont pas encore disponibles.<br />
            Revenez sur cette page ou attendez la notification WhatsApp.
          </div>
        )}

        <div className="text-center pt-4">
          <Link href="/" className="text-sm text-leaf underline">
            ← Retour à l'accueil
          </Link>
        </div>
      </main>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4">
      <span className="text-xs text-ink/40 flex-shrink-0">{label}</span>
      <span className="text-sm text-ink text-right font-medium">{value}</span>
    </div>
  );
}
