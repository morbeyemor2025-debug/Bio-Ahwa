"use client";

import { useActionState } from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { addPatient } from "@/app/actions/patients";
import type { PatientFormState } from "@/app/actions/patients";

const REASONS = [
  "Consultation générale",
  "Renouvellement ordonnance",
  "Prise de tension",
  "Bilan sanguin",
  "Analyse urine",
  "Vaccination",
  "Suivi diabète",
  "Consultation pédiatrie",
  "Autre",
];

const initial: PatientFormState = { success: false, message: "" };

export default function JoinPage({ clinicSlug }: { clinicSlug: string }) {
  const [state, action, pending] = useActionState(addPatient, initial);
  const [noPhone, setNoPhone] = useState(false);

  useEffect(() => {
    if (state.success) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state.success]);

  if (state.success && state.ticket_number) {
    return (
      <div className="min-h-screen bg-oat flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-soft max-w-sm w-full text-center p-8">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-ink mb-2">Patient ajouté</h2>
          <div className="bg-leaf text-white rounded-2xl py-6 my-6">
            <p className="text-sm opacity-80">Numéro de ticket</p>
            <p className="text-5xl font-bold">{state.ticket_number}</p>
            <p className="text-xs opacity-60 mt-2">{state.tracking_id}</p>
          </div>
          <div className="flex gap-3">
            <Link
              href={`/dashboard/${clinicSlug}`}
              className="flex-1 bg-ink text-white py-3 rounded-xl font-semibold text-sm"
            >
              Dashboard
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-oat text-ink py-3 rounded-xl font-semibold text-sm border border-ink/10"
            >
              Nouveau
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oat">
      <header className="bg-leaf text-white px-4 py-4 flex items-center gap-3">
        <Link href={`/dashboard/${clinicSlug}`} className="text-white/70 hover:text-white">←</Link>
        <h1 className="font-bold text-lg">Nouveau patient</h1>
      </header>

      <form action={action} className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <input type="hidden" name="clinic_slug" value={clinicSlug} />

        {state.message && !state.success && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
            {state.message}
          </div>
        )}

        <div className="bg-white rounded-2xl p-5 shadow-soft space-y-4">
          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">
              Nom complet <span className="text-clay">*</span>
            </label>
            <input
              name="patient_name"
              type="text"
              placeholder="Ex : Fatou Diallo"
              required
              className="w-full border border-ink/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/30 bg-oat/50"
            />
            {state.errors?.patient_name && (
              <p className="text-red-600 text-xs mt-1">{state.errors.patient_name[0]}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-sm font-semibold text-ink">Numéro WhatsApp</label>
              <label className="flex items-center gap-1.5 text-xs text-ink/60 cursor-pointer">
                <input
                  type="checkbox"
                  checked={noPhone}
                  onChange={(e) => setNoPhone(e.target.checked)}
                  className="accent-leaf"
                />
                Sans téléphone
              </label>
            </div>
            {!noPhone && (
              <input
                name="phone"
                type="tel"
                placeholder="+221 77 000 00 00"
                className="w-full border border-ink/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/30 bg-oat/50"
              />
            )}
            {noPhone && (
              <p className="text-xs text-ink/50 italic bg-yellow-50 border border-yellow-200 px-3 py-2 rounded-lg">
                Un ticket imprimable sera généré.
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-ink mb-1.5">
              Motif de visite <span className="text-clay">*</span>
            </label>
            <select
              name="reason"
              required
              defaultValue=""
              className="w-full border border-ink/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-leaf/30 bg-oat/50"
            >
              <option value="" disabled>Choisir un motif…</option>
              {REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
            {state.errors?.reason && (
              <p className="text-red-600 text-xs mt-1">{state.errors.reason[0]}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-leaf text-white font-bold py-4 rounded-2xl text-lg shadow-soft hover:bg-leaf/90 transition disabled:opacity-60"
        >
          {pending ? "Ajout en cours…" : "Ajouter à la file"}
        </button>
      </form>
    </div>
  );
}
