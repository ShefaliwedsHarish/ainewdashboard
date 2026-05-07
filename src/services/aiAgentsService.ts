import { apiService } from "./api";
import { API_ROUTES } from "./apiRoutes";

export interface FAQ {
  q: string;
  a: string;
}

// Raw shape the Laravel API returns
interface RawFAQ {
  q?: string;
  a?: string;
  question?: string;
  answer?: string;
}

interface RawAgent {
  id?: string | number;
  name?: string;
  goal?: string;
  tone?: string;
  status?: string;
  calls?: number;
  questions?: string[] | string;
  faqs?: RawFAQ[] | string;
}

// Normalize API response → our AIAgent shape
const normalize = (raw: RawAgent): AIAgent => ({
  id: String(raw.id ?? ""),
  name: raw.name ?? "",
  goal: raw.goal ?? "Lead Qualification",
  tone: raw.tone ?? "Friendly",
  status: raw.status ?? "Active",
  calls: raw.calls ?? 0,
  questions: Array.isArray(raw.questions)
    ? raw.questions
    : typeof raw.questions === "string"
    ? JSON.parse(raw.questions || "[]")
    : [],
  faqs: (() => {
    const raw_faqs = Array.isArray(raw.faqs)
      ? raw.faqs
      : typeof raw.faqs === "string"
      ? JSON.parse(raw.faqs || "[]")
      : [];
    return raw_faqs.map((f: RawFAQ) => ({
      q: f.q ?? f.question ?? "",
      a: f.a ?? f.answer ?? "",
    }));
  })(),
});

export interface AIAgent {
  id?: string;
  name: string;
  goal: string;
  tone: string;
  status: string;
  calls?: number;
  questions?: string[];
  faqs?: FAQ[];
}

const { base, byId } = API_ROUTES.agent;

export const aiAgentsService = {
  // GET /api/agent
  getAll: () =>
    apiService.get<RawAgent[]>(base).then((r) => r.map(normalize)),

  // GET /api/agent/{id}
  getById: (id: string) =>
    apiService.get<RawAgent>(byId(id)).then((r) => normalize(r)),

  // POST /api/agent
  create: (data: Omit<AIAgent, "id">) =>
    apiService.post<RawAgent>(base, data).then((r) => normalize(r)),

  // PUT /api/agent/{id}
  update: (id: string, data: Omit<AIAgent, "id">) =>
    apiService.put<RawAgent>(byId(id), data).then((r) => normalize(r)),

  // DELETE /api/agent/{id}
  delete: (id: string) =>
    apiService.delete(byId(id)),
};
