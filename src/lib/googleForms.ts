// Google Form URL and entry IDs
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSelMtH5vc-xGL3pwotuTjIINEE26NFLG6IVEDjRCia-0PgFTg/formResponse';

const FORM_ENTRY_IDS = {
    firstName: 'entry.815969767',         // First Name
    phone: 'entry.1798824959',           // Phone Number
};

/**
 * Submits data to Google Forms. Only fullName and phone are mapped.
 * No fields are required. Returns true if the request is sent.
 */
export async function submitToGoogleForms(data: { fullName?: string; phone?: string }) {
    try {
        const formBody = new URLSearchParams();
        formBody.append(FORM_ENTRY_IDS.firstName, data.fullName || '');
        formBody.append(FORM_ENTRY_IDS.phone, data.phone || '');

        await fetch(GOOGLE_FORM_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formBody.toString(),
            mode: 'no-cors',
            credentials: 'omit',
        });
        return true;
    } catch (error) {
        // Silently fail, do not throw
        return false;
    }
} 