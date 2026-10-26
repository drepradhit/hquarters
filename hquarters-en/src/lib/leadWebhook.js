/**
 * Google Sheets Webhook Lead Service for HQuarters
 * Automatically records leads from all website forms into the unified Google Sheet.
 */
export const LEAD_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwk7p-1Jf_PYISNVhAeTQdIp6jkC93kqwPHr2v_iCLsTBkgA0i_2uejKoD0AqPtEiTS/exec";

/**
 * Sends lead data to Google Sheet webhook asynchronously in the background.
 * Uses text/plain to avoid CORS preflight options issues with Google Apps Script.
 *
 * @param {Object} data
 * @param {string} data.source - Form origin (e.g. "CTA WhatsApp Floating", "Event Function Room")
 * @param {string} data.name - Visitor full name
 * @param {string} [data.email] - Visitor email address
 * @param {string} data.whatsapp - Visitor WhatsApp number
 * @param {string} [data.space] - Space category / room preference
 * @param {string} [data.selectedRoom] - Alternative room preference
 * @param {string} [data.company] - Company name
 * @param {string} [data.notes] - Additional requirements or notes
 */
export async function sendLeadToSheet(data) {
  try {
    const isEn = typeof window !== "undefined" && window.location.pathname.startsWith("/en");
    const spaceVal = data.space || data.selectedRoom || data.spaceNeeds || "-";
    const formTypeVal = data.source || data.formType || "Website Form";
    const pageVal = typeof window !== "undefined" ? (window.location.pathname || "/") : "/";
    const langVal = isEn ? "EN" : "ID";
    const now = new Date();
    const timestampStr = now.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    const payload = {
      // Keys expected by Apps Script doPost:
      timestamp: timestampStr,
      formType: formTypeVal,
      name: data.name || "",
      email: data.email || "",
      whatsapp: data.whatsapp || "",
      company: data.company || "-",
      spaceNeeds: spaceVal,
      page: pageVal,
      language: langVal,

      // Also keep original keys for backward compatibility:
      source: formTypeVal,
      space: spaceVal,
      notes: data.notes || "",
    };

    // Asynchronously dispatch without blocking WhatsApp window redirect
    fetch(LEAD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    }).catch((err) => {
      console.warn("Lead webhook submission background error:", err);
    });

    return true;
  } catch (err) {
    console.warn("Lead webhook submission skipped:", err);
    return false;
  }
}
