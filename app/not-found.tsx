import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-oat flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-6xl mb-4">🌿</div>
        <h1 className="text-3xl font-bold text-ink mb-2">Page introuvable</h1>
        <p className="text-ink/50 mb-8">Cette page n'existe pas ou la clinique est inconnue.</p>
        <Link
          href="/"
          className="bg-leaf text-white font-semibold px-6 py-3 rounded-xl hover:bg-leaf/90 transition"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
