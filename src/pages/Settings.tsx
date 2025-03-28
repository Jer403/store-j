import { useId, useState } from "react";
import { CheckCircle2, CircleDashed, SettingsIcon } from "lucide-react";
import { SettingsSection } from "../components/SettingsSection";
import { useAuth } from "../hooks/useAuth";
import { preferencesRequest } from "../Api/auth";
import { Currency, Language } from "../types";
import { usePreferences } from "../hooks/usePreferences";
import { saveInLocalStorage } from "../utils";
import { LANGUAGE } from "../consts";
import { useNavigate } from "react-router-dom";
import { Toggle } from "../components/Toggle";

interface SubmitClickProps {
  e: React.MouseEvent;
}

type SettingsProps =
  | { preference: "language"; value: Language }
  | { preference: "notifications"; value: boolean }
  | { preference: "currency"; value: Currency };

export default function Settings() {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [requestErrors, setRequestErrors] = useState<[]>([]);
  const [saved, setSaved] = useState(false);
  const errorIdKey = useId();
  const { setUserPreferences } = useAuth();
  const { preferences, setPreferences } = usePreferences();
  const navigate = useNavigate();

  const submitClickHandler = async ({ e }: SubmitClickProps) => {
    e.preventDefault();
    if (loadingSubmit) return;
    setLoadingSubmit(true);
    setSaved(false);
    try {
      const res = await preferencesRequest(preferences);
      if (!res) return;
      if (res.status == 200) {
        setLoadingSubmit(false);
        setSaved(true);
        return;
      }
      setRequestErrors(res.data.error);
      setLoadingSubmit(false);
      setSaved(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSettingChange = ({ preference, value }: SettingsProps) => {
    const newState = { ...preferences, [preference]: value };
    setPreferences(newState);
    setUserPreferences(newState);
    saveInLocalStorage({ item: "language", value: preferences.language });
    setSaved(false);
  };

  return (
    <div className="min-h-screen-minus-64 dottedBackground py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-[--text_light_0] mb-8">
            {LANGUAGE.SETTINGS.TITLE[preferences.language]}
          </h1>

          <div className="space-y-6">
            <SettingsSection
              icon={<SettingsIcon className="h-6 w-6" />}
              title={LANGUAGE.SETTINGS.USER_PREF_TITLE[preferences.language]}
              description={
                LANGUAGE.SETTINGS.USER_PREF_DESCRIPTION[preferences.language]
              }
            >
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[--text_light_200] mb-1">
                    {LANGUAGE.SETTINGS.LANGUAGE[preferences.language]}
                  </label>
                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      handleSettingChange({
                        preference: "language",
                        value: e.target.value as Language,
                      })
                    }
                    className="w-full px-3 py-2 border border-[--border_light_500] bg-[--bg_prim] text-[--text_light_0] rounded-md focus:outline-none focus:ring-2 focus:ring-[--brand_color]"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[--text_light_200] mb-1">
                    {LANGUAGE.SETTINGS.CURRENCY[preferences.language]}
                  </label>
                  <select
                    value={preferences.currency}
                    onChange={(e) =>
                      handleSettingChange({
                        preference: "currency",
                        value: e.target.value as Currency,
                      })
                    }
                    className="w-full px-3 py-2 border border-[--border_light_500] bg-[--bg_prim] text-[--text_light_0] rounded-md focus:outline-none focus:ring-2 focus:ring-[--brand_color]"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <Toggle
                    label="Email Notifications"
                    description="Receive important updates via email"
                    checked={preferences.notifications}
                    onChange={() =>
                      handleSettingChange({
                        preference: "notifications",
                        value: !preferences.notifications,
                      })
                    }
                  />
                </div>
              </div>
            </SettingsSection>
          </div>
          <div
            className="flex items-center justify-between"
            style={{ display: requestErrors.length == 0 ? "none" : "block" }}
          >
            <div className="flex items-center">
              {requestErrors.map((item) => (
                <p
                  key={errorIdKey}
                  className="block text-sm"
                  style={{ color: "var(--wrong)" }}
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <button
              type="button"
              className="px-5 py-2 border border-transparent text-sm font-medium rounded-md text-[--text_light_900] bg-[--button] hover:bg-[--button_hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--brand_color]"
              onClick={() => {
                navigate("/dashboard");
              }}
            >
              {LANGUAGE.SETTINGS.BACK[preferences.language]}
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-[--text_light_900] bg-[--button] hover:bg-[--button_hover] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[--brand_color]"
              onClick={(e) => {
                submitClickHandler({ e });
              }}
            >
              {loadingSubmit ? (
                <CircleDashed className="loader w-4 h-4" />
              ) : (
                <span className="flex flex-row justify-center items-center gap-1">
                  {LANGUAGE.SETTINGS.SAVE[preferences.language]}
                  {saved && (
                    <CheckCircle2 className="h-4 w-4 text-[--good]"></CheckCircle2>
                  )}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
