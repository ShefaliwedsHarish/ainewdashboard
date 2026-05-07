import { apiService } from "./api";
import { API_ROUTES } from "./apiRoutes";
import type { AITrainingState } from "@/components/ai-training/types";

export interface AITrainingPayload extends AITrainingState {
  systemPrompt?: string;
}

export interface AITrainingConfig extends AITrainingPayload {
  id?: string | number;
}

const { base, byId } = API_ROUTES.aiTraining;

export const aiTrainingService = {
  // GET /api/agent  — load existing config
  getConfig: () =>
    apiService.get<AITrainingConfig>(base),

  // POST /api/agent  — create new config
  createConfig: (data: AITrainingPayload) =>
    apiService.post<AITrainingConfig>(base, data),

  // PUT /api/agent/{id}  — full update
  updateConfig: (id: string, data: AITrainingPayload) =>
    apiService.put<AITrainingConfig>(byId(id), data),

  // PATCH /api/agent/{id}  — partial update
  patchConfig: (id: string, data: Partial<AITrainingPayload>) =>
    apiService.patch<AITrainingConfig>(byId(id), data),

  // DELETE /api/agent/{id}
  deleteConfig: (id: string) =>
    apiService.delete(byId(id)),
};
