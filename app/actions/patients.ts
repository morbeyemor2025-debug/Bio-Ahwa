"use server";

import { z } from "zod";

const PatientSchema = z.object({
  patient_name: z.string().min(2, "Nom requis (min 2 caractères)"),
  phone: z.string().optional(),
  reason: z.string().min(3, "Motif requis"),
  clinic_slug: z.string(),
});

export type PatientFormState = {
  success: boolean;
  message: string;
  ticket_number?: number;
  tracking_id?: string;
  errors?: Record<string, string[]>;
};

export async function addPatient(
  _prev: PatientFormState,
  formData: FormData
): Promise<PatientFormState> {
  const raw = {
    patient_name: formData.get("patient_name") as string,
    phone: (formData.get("phone") as string) || undefined,
    reason: formData.get("reason") as string,
    clinic_slug: formData.get("clinic_slug") as string,
  };

  const parsed = PatientSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Erreur de validation",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // TODO: replace with Supabase insert
  // const client = await createClient();
  // const { data, error } = await client.from("queue_entries").insert({ ... }).select().single();

  const ticket_number = Math.floor(Math.random() * 90) + 10;
  const tracking_id = `BAH-2026-Q${String(ticket_number).padStart(3, "0")}`;

  return {
    success: true,
    message: `Patient ajouté avec succès — Ticket #${ticket_number}`,
    ticket_number,
    tracking_id,
  };
}
