import { apiService } from "./api";
import { API_ROUTES } from "./apiRoutes";

export interface UserProfile {
  name: string;
  company_name: string;
  phone_number: string;
  profile_pic?: string;
  profile_pic_url?: string;
}

export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

const { profile, changePassword } = API_ROUTES.settings;

export const settingsService = {
  // GET /api/profile
  getProfile: () =>
    apiService.get<UserProfile>(profile),

  // POST /api/profile (multipart for profile_pic upload)
  updateProfile: (data: Partial<UserProfile> & { profile_pic?: File }) => {
    const form = new FormData();
    if (data.name) form.append("name", data.name);
    if (data.company_name) form.append("company_name", data.company_name);
    if (data.phone_number) form.append("phone_number", data.phone_number);
    if (data.profile_pic) form.append("profile_pic", data.profile_pic);

    return apiService.post<UserProfile>(profile, form);
  },

  // POST /api/change-password
  changePassword: (data: ChangePasswordPayload) =>
    apiService.post(changePassword, data),
};
