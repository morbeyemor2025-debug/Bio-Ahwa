import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-oat flex flex-col">
      {/* Nav */}
      <nav className="bg-leaf text-white px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-xl tracking-tight">🌿 Bio Ahwa Care</span>
        <Link
          href="/dashboard/bio-ahwa-du-rail"
          className="bg-white text-leaf text-sm font-semibold px-4 py-2 rounded-full hover:bg-oat transition"
        >
          Accéder au dashboard
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="max-w-2xl">
          <span className="inline-block bg-leaf/10 text-leaf text-sm font-semibold px-4 py-1 rounded-full mb-6">
            SaaS médical WhatsApp-first 🇸🇳
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6 leading-tight">
            La file d'attente moderne pour cliniques africaines
          </h1>
          <p className="text-lg text-ink/70 mb-10">
            Gérez vos patients, rendez-vous et résultats de labo — sans app à télécharger.
            WhatsApp, SMS ou ticket imprimable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard/bio-ahwa-du-rail"
              className="bg-leaf text-white font-semibold px-8 py-3 rounded-xl hover:bg-leaf/90 transition shadow-soft"
            >
              Voir le dashboard démo
            </Link>
            <Link
              href="/join/bio-ahwa-du-rail"
              className="bg-white text-leaf font-semibold px-8 py-3 rounded-xl border border-leaf/30 hover:bg-oat transition"
            >
              Ajouter un patient
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: "📋", title: "File d'attente en direct", desc: "Statuts temps réel via Supabase Realtime. Appel patient en un clic." },
            { icon: "💬", title: "WhatsApp-first", desc: "Lien wa.me pré-rempli pour notifier chaque patient instantanément." },
            { icon: "🔬", title: "Résultats de labo", desc: "Lien de suivi public sécurisé. Aucun compte requis pour le patient." },
          ].map((f) => (
            <div key={f.title} className="text-center p-6 rounded-2xl bg-oat">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-ink mb-2">{f.title}</h3>
              <p className="text-ink/60 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo links */}
      <section className="bg-ink text-white px-6 py-12 text-center">
        <h2 className="text-2xl font-bold mb-6">Pages de démonstration</h2>
        <div className="flex flex-wrap gap-3 justify-center text-sm">
          {[
            { href: "/dashboard/bio-ahwa-du-rail", label: "Secrétariat" },
            { href: "/doctor/bio-ahwa-du-rail", label: "Médecin" },
            { href: "/analytics/bio-ahwa-du-rail", label: "Statistiques" },
            { href: "/join/bio-ahwa-du-rail", label: "Ajout patient" },
            { href: "/results/BAH-2026-L022", label: "Résultats public" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <p className="mt-8 text-white/40 text-xs">
          © {new Date().getFullYear()} Bio Ahwa Care · Dakar, Sénégal
        </p>
      </section>
    </main>
  );
}
