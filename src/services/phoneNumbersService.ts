import { apiService } from "./api";
import { API_ROUTES } from "./apiRoutes";

export interface PhoneNumber {
  id?: string;
  number: string;
  label?: string;
  assignedAgentId?: string;
  status: "active" | "inactive";
  createdAt?: string;
}

const { base, byId } = API_ROUTES.phoneNumbers;

export const phoneNumbersService = {
  getAll: () =>
    apiService.get<PhoneNumber[]>(base),

  getById: (id: string) =>
    apiService.get<PhoneNumber>(byId(id)),

  create: (data: Omit<PhoneNumber, "id" | "createdAt">) =>
    apiService.post<PhoneNumber>(base, data),

  update: (id: string, data: PhoneNumber) =>
    apiService.put<PhoneNumber>(byId(id), data),

  delete: (id: string) =>
    apiService.delete(byId(id)),
};
