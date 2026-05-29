export type QueueStatus =
  | "waiting"
  | "called"
  | "in_consultation"
  | "lab_processing"
  | "results_ready"
  | "completed"
  | "absent"
  | "cancelled";

export interface QueueEntry {
  id: string;
  ticket_number: number;
  patient_name: string;
  phone?: string;
  status: QueueStatus;
  reason: string;
  doctor?: string;
  entered_at: string;
  tracking_id: string;
  has_lab: boolean;
}

export interface Clinic {
  slug: string;
  name: string;
  city: string;
  address: string;
  phone: string;
}

export interface LabResult {
  tracking_id: string;
  patient_name: string;
  test_name: string;
  status: "pending" | "processing" | "ready";
  requested_at: string;
  ready_at?: string;
  result_summary?: string;
  doctor: string;
}

export const CLINICS: Record<string, Clinic> = {
  "bio-ahwa-du-rail": {
    slug: "bio-ahwa-du-rail",
    name: "Bio Ahwa du Rail",
    city: "Dakar",
    address: "Avenue Cheikh Anta Diop, Dakar",
    phone: "+221 33 820 00 00",
  },
};

export const STATUS_LABELS: Record<QueueStatus, string> = {
  waiting: "En attente",
  called: "Appelé",
  in_consultation: "En consultation",
  lab_processing: "Labo en cours",
  results_ready: "Résultats prêts",
  completed: "Terminé",
  absent: "Absent",
  cancelled: "Annulé",
};

export const DEMO_QUEUE: QueueEntry[] = [
  { id: "1", ticket_number: 1, patient_name: "Fatou Diallo", phone: "+221771234567", status: "in_consultation", reason: "Consultation générale", doctor: "Dr. Mbaye", entered_at: "08:15", tracking_id: "BAH-2026-Q001", has_lab: false },
  { id: "2", ticket_number: 2, patient_name: "Mamadou Sow", phone: "+221781234567", status: "called", reason: "Renouvellement ordonnance", doctor: "Dr. Ndiaye", entered_at: "08:22", tracking_id: "BAH-2026-Q002", has_lab: false },
  { id: "3", ticket_number: 3, patient_name: "Aminata Traoré", phone: undefined, status: "waiting", reason: "Prise de tension", entered_at: "08:35", tracking_id: "BAH-2026-Q003", has_lab: false },
  { id: "4", ticket_number: 4, patient_name: "Ibrahima Koné", phone: "+221701234567", status: "waiting", reason: "Bilan sanguin complet", entered_at: "08:40", tracking_id: "BAH-2026-Q004", has_lab: true },
  { id: "5", ticket_number: 5, patient_name: "Rokhaya Fall", phone: "+221761234567", status: "lab_processing", reason: "Analyse urine", entered_at: "08:10", tracking_id: "BAH-2026-Q005", has_lab: true },
  { id: "6", ticket_number: 6, patient_name: "Ousmane Bâ", phone: undefined, status: "results_ready", reason: "Résultats glycémie", entered_at: "07:55", tracking_id: "BAH-2026-Q006", has_lab: true },
  { id: "7", ticket_number: 7, patient_name: "Ndèye Sarr", phone: "+221771111111", status: "waiting", reason: "Consultation pédiatrie", entered_at: "08:50", tracking_id: "BAH-2026-Q007", has_lab: false },
  { id: "8", ticket_number: 8, patient_name: "Cheikh Gaye", phone: "+221782222222", status: "absent", reason: "Vaccin", entered_at: "08:05", tracking_id: "BAH-2026-Q008", has_lab: false },
  { id: "9", ticket_number: 9, patient_name: "Mariama Diop", phone: "+221703333333", status: "completed", reason: "Suivi diabète", doctor: "Dr. Mbaye", entered_at: "07:45", tracking_id: "BAH-2026-Q009", has_lab: false },
];

export const DEMO_LAB_RESULT: LabResult = {
  tracking_id: "BAH-2026-L022",
  patient_name: "Ibrahima Koné",
  test_name: "Bilan sanguin complet (NFS + Glycémie + Créatinine)",
  status: "ready",
  requested_at: "2026-05-27 09:00",
  ready_at: "2026-05-28 07:30",
  result_summary: "NFS normale. Glycémie : 1,12 g/L (normal). Créatinine : 82 µmol/L (normal). Aucune anomalie détectée.",
  doctor: "Dr. Amadou Mbaye",
};

export const DEMO_STATS = {
  today_total: 47,
  today_completed: 31,
  today_absent: 4,
  avg_wait_minutes: 22,
  week_total: 214,
  by_status: {
    waiting: 9,
    called: 2,
    in_consultation: 3,
    lab_processing: 5,
    results_ready: 6,
    completed: 31,
    absent: 4,
    cancelled: 1,
  },
  by_day: [
    { day: "Lun", count: 41 },
    { day: "Mar", count: 38 },
    { day: "Mer", count: 52 },
    { day: "Jeu", count: 44 },
    { day: "Ven", count: 39 },
    { day: "Sam", count: 47 },
    { day: "Dim", count: 0 },
  ],
};
