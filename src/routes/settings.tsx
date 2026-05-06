import { createFileRoute } from "@tanstack/react-router";
import { requireAuth } from "@/lib/auth-guard";
import { MainLayout } from "@/components/layout";
import "@/styles/settings.css";
import { useState, useEffect, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "@/redux/authSlice";
import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/config/api-routes";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  beforeLoad: requireAuth,
  component: SettingsPage,
});

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

function SettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector((s: any) => s.auth.user);

  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");
  const [profileForm, setProfileForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [profileLoading, setProfileLoading] = useState(false);

  // Fetch latest profile from API when profile tab is active
  useEffect(() => {
    if (activeTab !== "profile") return;
    apiClient.get(API_ROUTES.settings.profile).then((res) => {
      const data = res.data?.data ?? res.data;
      const updated = { ...user, ...data };
      dispatch(updateUser(updated));
      setProfileForm({ name: updated.name || "", email: updated.email || "" });
    }).catch(() => {
      // fallback to Redux state
      if (user) setProfileForm({ name: user.name || "", email: user.email || "" });
    });
  }, [activeTab]);

  // Security form state
  const [securityForm, setSecurityForm] = useState({
    old_password: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [securityErrors, setSecurityErrors] = useState<Record<string, string>>({});
  const [securityLoading, setSecurityLoading] = useState(false);

  const secField = (field: keyof typeof securityForm) => ({
    value: securityForm[field],
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      setSecurityForm({ ...securityForm, [field]: e.target.value });
      setSecurityErrors((prev) => ({ ...prev, [field]: "" }));
    },
    className: "form-input" + (securityErrors[field] ? " input-error" : ""),
  });

  const handleProfileSave = async (e: FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    try {
      const res = await apiClient.post(API_ROUTES.settings.profile, { name: profileForm.name });
      const updated = { ...user, ...(res.data?.data ?? res.data) };
      dispatch(updateUser(updated));
      toast.success("Profile updated successfully.");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (securityForm.new_password !== securityForm.new_password_confirmation) {
      setSecurityErrors({ new_password_confirmation: "Passwords do not match." });
      return;
    }
    setSecurityLoading(true);
    setSecurityErrors({});
    try {
      await apiClient.post(API_ROUTES.settings.changePassword, securityForm);
      toast.success("Password changed successfully.");
      setSecurityForm({ old_password: "", new_password: "", new_password_confirmation: "" });
    } catch (err: any) {
      const apiErrors = err.response?.data?.errors;
      if (apiErrors) {
        // flatten first error message per field
        const flat: Record<string, string> = {};
        for (const key in apiErrors) {
          flat[key] = Array.isArray(apiErrors[key]) ? apiErrors[key][0] : apiErrors[key];
        }
        setSecurityErrors(flat);
      } else {
        toast.error(err.response?.data?.message || "Failed to change password.");
      }
    } finally {
      setSecurityLoading(false);
    }
  };

  return (
    <MainLayout title="Settings" subtitle="Manage your profile and account preferences">
      <div className="page-header">
        <div>
          <div className="page-eyebrow">Account</div>
          <div className="page-title">Settings</div>
          <div className="page-subtitle">Manage your profile, security, and account preferences.</div>
        </div>
      </div>

      <div className="settings-grid">
        {/* SETTINGS NAV */}
        <aside className="settings-nav">
          <div className="settings-nav-section">
            <div className="nav-section-label">Account</div>
            <div
              className={"settings-nav-item" + (activeTab === "profile" ? " active" : "")}
              onClick={() => setActiveTab("profile")}
              style={{ cursor: "pointer" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Profile
            </div>
            <div
              className={"settings-nav-item" + (activeTab === "security" ? " active" : "")}
              onClick={() => setActiveTab("security")}
              style={{ cursor: "pointer" }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              Security
            </div>
          </div>
        </aside>

        {/* SETTINGS CONTENT */}
        <div className="settings-content">

          {/* PROFILE PANEL */}
          {activeTab === "profile" && (
          <div className="panel" id="profile">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title">Profile</div>
                <div className="panel-subtitle">Your personal account details.</div>
              </div>
            </div>
            <form className="panel-body" onSubmit={handleProfileSave}>
              {(!user?.name || !user?.email) && (
                <div className="profile-incomplete-banner">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span>
                    Your profile is incomplete. Please set your{" "}
                    {[!user?.name && "name", !user?.email && "email"].filter(Boolean).join(" and ")}{" "}
                    to finish setting up your profile.
                  </span>
                </div>
              )}
              <div className="profile-row">
                <div className="profile-avatar">{user?.name ? getInitials(user.name) : "?"}</div>
              </div>

              <div className="form-row two">
                <div className="form-field">
                  <label className="form-label">Full name <span className="req">*</span></label>
                  <input
                    type="text"
                    className="form-input"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={profileForm.email}
                    disabled
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                <button type="submit" className="btn-primary" disabled={profileLoading}>
                  {profileLoading ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          </div>
          )}

          {/* SECURITY PANEL */}
          {activeTab === "security" && (
          <div className="panel" id="security">
            <div className="panel-header">
              <div className="panel-title-block">
                <div className="panel-title">Security</div>
                <div className="panel-subtitle">Change your password to keep your account secure.</div>
              </div>
            </div>
            <form className="panel-body" onSubmit={handlePasswordChange}>
              <div className="form-row three">
                <div className="form-field">
                  <label className="form-label">Current password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter current password"
                    value={securityForm.old_password}
                    onChange={(e) => setSecurityForm({ ...securityForm, old_password: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">New password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Min 8 characters"
                    value={securityForm.new_password}
                    onChange={(e) => setSecurityForm({ ...securityForm, new_password: e.target.value })}
                    required
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Confirm new password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Re-enter new password"
                    value={securityForm.new_password_confirmation}
                    onChange={(e) => setSecurityForm({ ...securityForm, new_password_confirmation: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="form-hint" style={{ marginBottom: 16 }}>
                Use 8+ characters including upper, lower, number, and symbol.
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button type="submit" className="btn-primary" disabled={securityLoading}>
                  {securityLoading ? "Updating…" : "Update password"}
                </button>
              </div>
            </form>
          </div>
          )}

        </div>
      </div>
    </MainLayout>
  );
}
