import { Mail, Facebook, CircleDashed } from "lucide-react";
import { usePreferences } from "../hooks/usePreferences";
import { LANGUAGE } from "../consts";
import { useState } from "react";
import { sendMailRequest } from "../Api/sendEmail";

export default function Contact() {
  const { preferences } = usePreferences();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const res = await sendMailRequest({ name, email, message });
      if (!res) return;
      if (res.status == 200) {
        setSuccess(true);
      } else {
        setSuccess(false);
      }
    } catch (error) {
      console.log(error);
      setSuccess(false);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="min-h-screen-minus-64 dottedBackground py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 dark:text-white">
            {LANGUAGE.CONTACT.TITLE[preferences.language]}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className={`bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 ${
                success != null &&
                (success
                  ? "border-b-4 border-b-green-500"
                  : "border-b-4 border-b-red-500")
              }`}
            >
              <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                {LANGUAGE.CONTACT.TOUCH[preferences.language]}
              </h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {LANGUAGE.CONTACT.NAME[preferences.language]}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border dark:text-gray-200 dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={
                      LANGUAGE.CONTACT.PLACEHOLDER_NAME[preferences.language]
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {LANGUAGE.CONTACT.EMAIL[preferences.language]}
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border dark:text-gray-200 dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={
                      LANGUAGE.CONTACT.PLACEHOLDER_EMAIL[preferences.language]
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                    {LANGUAGE.CONTACT.MESSAGE[preferences.language]}
                  </label>
                  <textarea
                    rows={4}
                    required
                    name="message"
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3 py-2 border dark:text-gray-200 dark:bg-gray-900 dark:border-gray-600 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder={
                      LANGUAGE.CONTACT.PLACEHOLDER_MESSAGE[preferences.language]
                    }
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 flex justify-center items-center text-white py-2 rounded-lg hover:bg-indigo-700"
                >
                  {loadingSubmit ? (
                    <CircleDashed className="w-6 h-6 loader"></CircleDashed>
                  ) : (
                    <span>{LANGUAGE.CONTACT.SEND[preferences.language]}</span>
                  )}
                </button>
              </form>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6 dark:text-white">
                {LANGUAGE.CONTACT.CONTACT_INFO[preferences.language]}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center mb-6">
                  <Mail className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="dark:text-white">
                    support@digitalmarket.com
                  </span>
                </div>
                <div className="flex items-center mb-6">
                  <Facebook className="h-5 w-5 text-indigo-600 mr-3" />
                  <span className="dark:text-white">
                    123 Digital Street, Tech City, TC 12345
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
