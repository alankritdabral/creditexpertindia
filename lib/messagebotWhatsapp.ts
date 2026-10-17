import dns from "dns";

// Ensure Node.js prioritizes IPv4 over IPv6 to avoid connection timeouts
try {
  dns.setDefaultResultOrder("ipv4first");
} catch {
  // Ignore in environments where this method is unavailable
}

const DEFAULT_BASE_URL = "https://papi.messagebot.in";

export interface WhatsappBaseResponse<T = any> {
  IsSuccess: boolean;
  ErrorCode: number;
  ErrorDescription: string;
  ReturnData?: T;
}

export interface SendWhatsappOtpOptions {
  phoneNumber: string; // 10 digits or with 91 country code
  otpCode: string;
  templateId?: string | number;
  callbackUrl?: string;
  apiToken?: string;
}

export interface SendWhatsappMessageOptions {
  templateId: string | number;
  quickNumber: string; // Recipient phone number
  sample?: string; // e.g. "User, 1234" for {{1}}, {{2}}
  buttonExample?: string; // e.g. "www.example.com"
  campaignName?: string;
  callbackUrl?: string;
  templateFile?: File | Blob | Buffer;
  templateFileExtension?: string;
  isScheduled?: boolean;
  timeZoneId?: number;
  finalEffectiveDate?: string; // YYYY-MM-DD
  finalEffectiveTime?: string; // HH:mm:ss
  apiToken?: string;
}

export interface TimeZoneItem {
  TimeZoneId: number;
  TimeZoneName: string;
}

export interface CampaignDlrStatus {
  DlrStatus: string;
  NumberofSms: number;
}

export interface WhatsappDlrData {
  TotalSms: number;
  TotalCost: number;
  Currency: string;
  CampaignStatus: CampaignDlrStatus[];
}

export interface WhatsappCampaignItem {
  WhatsAppCampaignId: number;
  WhatsAppCampaignParentId?: number | null;
  CampaignStatus: number;
  CampaignStatusName: string;
  UserName?: string;
  CampaignName?: string;
  TotalAudience?: number;
  IsScheduled?: boolean;
  ReOccurringSchedule?: boolean;
  ScheduledDateTime?: string | null;
  SubmittedDateTime?: string;
  FirstRunDateTime?: string;
  ScheduleTypeId?: number;
  ScheduleTypeName?: string | null;
}

export interface WhatsappTemplateItem {
  WhatsAppTemplateId: number;
  CustomerHttpConnectionId?: number;
  CustomerWhatsAppCredentialId?: number;
  CustomerWhatsAppConnectionId?: number;
  CompanyId?: number;
  ShortName?: string | null;
  TemplateName: string;
  TemplateType?: number;
  FbTemplateId?: string;
  TemplateCategoryId?: number;
  TemplateCategory?: string; // "Utility" | "Marketing" | "Authentication"
  Language?: string;
  CreateDateTime?: string;
  TemplateStatus?: number;
  TemplateStatusDescription: string; // "APPROVED" | "PENDING" | "REJECTED"
  TemplateTypeDescription?: string;
  HeaderText?: string | null;
  BodyText?: string | null;
  FooterText?: string | null;
  ButtonTypeId?: number | null;
  ButtonText?: string | null;
  ButtonPhoneNumber?: string | null;
  ButtonUrl?: string | null;
  ButtonExample?: string | null;
  ExampleBodyText?: string | null;
  ButtonTypeIdDescription?: string | null;
  WhatsAppNo?: string | null;
  TemplateErrorDescription?: string | null;
}

export interface AddWhatsappTemplateOptions {
  templateName: string;
  templateCategoryId: 1 | 2 | 3; // 1=Marketing, 2=Utility, 3=Authentication
  customerWhatsAppNumber: string | number;
  bodyText?: string;
  buttonTypeId?: 1 | 2 | 3 | 4; // 1=OTP, 2=Quick Reply, 3=Phone Number, 4=URL
  buttonText?: string;
  buttonPhoneNumber?: string;
  buttonUrl?: string;
  buttonExample?: string;
  componentFormatId: 1 | 2 | 3 | 4; // 1=Text, 2=Image, 3=Video, 4=Document
  headerText?: string;
  exampleBodyText?: string;
  footerText?: string;
  apiToken?: string;
}

/**
 * Resolves API Token with prioritized fallback:
 * 1. Explicitly passed in call
 * 2. MESSAGEBOT_WHATSAPP_API_TOKEN
 * 3. MESSAGEBOT_API_TOKEN
 */
export function getWhatsappApiToken(overrideToken?: string): string {
  return (
    overrideToken?.trim() ||
    process.env.MESSAGEBOT_WHATSAPP_API_TOKEN?.trim() ||
    process.env.MESSAGEBOT_API_TOKEN?.trim() ||
    ""
  );
}

/**
 * Standardize phone number for WhatsApp (format: 91XXXXXXXXXX)
 * Automatically adds '91' prefix for 10-digit Indian numbers or handles leading '0'
 */
export function formatWhatsappNumber(raw: string): string {
  if (!raw) return "";
  const digits = String(raw).replace(/\D/g, "");

  // 10-digit mobile number: e.g. 9827322519 -> 919827322519
  if (digits.length === 10) {
    return `91${digits}`;
  }

  // 11 digits starting with 0: e.g. 09827322519 -> 919827322519
  if (digits.length === 11 && digits.startsWith("0")) {
    return `91${digits.slice(1)}`;
  }

  // 13 digits starting with 091: e.g. 0919827322519 -> 919827322519
  if (digits.length === 13 && digits.startsWith("091")) {
    return digits.slice(1);
  }

  // 12 digits starting with 91: already has 91 country code
  if (digits.length === 12 && digits.startsWith("91")) {
    return digits;
  }

  return digits;
}

/**
 * 1. WhatsApp Send OTP API
 * POST https://papi.messagebot.in/whatsapp/SendOtp
 */
export async function sendWhatsappOtp({
  phoneNumber,
  otpCode,
  templateId,
  callbackUrl,
  apiToken,
}: SendWhatsappOtpOptions): Promise<{ success: boolean; campaignId?: number; data?: any; error?: string }> {
  const token = getWhatsappApiToken(apiToken);
  if (!token) {
    return { success: false, error: "MessageBot API Token is not configured." };
  }

  const effectiveTemplateId =
    templateId ||
    process.env.MESSAGEBOT_WHATSAPP_OTP_TEMPLATE_ID ||
    "3"; // Default demo ID from doc if unspecified

  const effectivePhone = formatWhatsappNumber(phoneNumber);
  if (effectivePhone.length < 10) {
    return { success: false, error: "Invalid phone number format." };
  }

  const payload: Record<string, any> = {
    PhoneNumber: effectivePhone,
    OtpCode: String(otpCode),
    ApiToken: token,
    TemplateId: String(effectiveTemplateId),
  };

  const cb = callbackUrl || process.env.MESSAGEBOT_WHATSAPP_CALLBACK_URL;
  if (cb) {
    payload.CallbackUrl = cb;
  }

  try {
    const url = `${process.env.MESSAGEBOT_WHATSAPP_BASE_URL || DEFAULT_BASE_URL}/whatsapp/SendOtp`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });

    const resJson: WhatsappBaseResponse = await response.json();
    console.log("[WhatsApp API: SendOtp]", resJson);

    if (resJson.IsSuccess || resJson.ErrorCode === 0) {
      return {
        success: true,
        campaignId: Number(resJson.ReturnData),
        data: resJson,
      };
    }

    return {
      success: false,
      error: resJson.ErrorDescription || `Failed to send WhatsApp OTP (Code ${resJson.ErrorCode})`,
      data: resJson,
    };
  } catch (err: any) {
    console.error("[WhatsApp API: SendOtp Exception]", err);
    return {
      success: false,
      error: err.message || "Network exception while contacting WhatsApp OTP gateway.",
    };
  }
}

/**
 * 2. WhatsApp Send Message API
 * POST https://papi.messagebot.in/whatsapp/SendMessage
 */
export async function sendWhatsappMessage(
  options: SendWhatsappMessageOptions
): Promise<{ success: boolean; campaignId?: number; data?: any; error?: string }> {
  const token = getWhatsappApiToken(options.apiToken);
  if (!token) {
    return { success: false, error: "MessageBot API Token is not configured." };
  }

  const effectivePhone = formatWhatsappNumber(options.quickNumber);
  const formData = new FormData();

  formData.append("ApiToken", token);
  formData.append("TemplateId", String(options.templateId));
  formData.append("QuickNumber", effectivePhone);

  const cb = options.callbackUrl || process.env.MESSAGEBOT_WHATSAPP_CALLBACK_URL;
  if (cb) formData.append("CallbackUrl", cb);
  if (options.campaignName) formData.append("CampaignName", options.campaignName);
  if (options.sample?.trim()) {
    formData.append("Sample", options.sample.trim());
  }
  if (options.buttonExample?.trim()) {
    formData.append("ButtonExample", options.buttonExample.trim());
  }

  if (options.templateFile) {
    let fileBlob: Blob;
    if (options.templateFile instanceof Blob) {
      fileBlob = options.templateFile;
    } else {
      fileBlob = new Blob([options.templateFile as any]);
    }
    const ext = options.templateFileExtension || "png";
    formData.append("TemplateFile", fileBlob, `image.${ext}`);
    formData.append("TemplateFileExtension", ext);
  }

  if (options.isScheduled) {
    formData.append("IsScheduled", "true");
    if (options.timeZoneId !== undefined) {
      formData.append("TimeZoneId", String(options.timeZoneId));
    }
    if (options.finalEffectiveDate) {
      formData.append("FinalEffectiveDate", options.finalEffectiveDate);
      formData.append("ActualScheduleDateTime", options.finalEffectiveDate);
    }
    if (options.finalEffectiveTime) {
      formData.append("FinalEffectiveTime", options.finalEffectiveTime);
    }
  } else {
    formData.append("IsScheduled", "false");
  }

  try {
    const url = `${process.env.MESSAGEBOT_WHATSAPP_BASE_URL || DEFAULT_BASE_URL}/whatsapp/SendMessage`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(15000),
    });

    const resJson: WhatsappBaseResponse = await response.json();
    console.log("[WhatsApp API: SendMessage]", resJson);

    // Note in doc: ErrorCode 40 or 0 indicates message accepted
    if (resJson.IsSuccess || resJson.ErrorCode === 0 || resJson.ErrorCode === 40) {
      return {
        success: true,
        campaignId: Number(resJson.ReturnData),
        data: resJson,
      };
    }

    return {
      success: false,
      error: resJson.ErrorDescription || `Message rejected with ErrorCode: ${resJson.ErrorCode}`,
      data: resJson,
    };
  } catch (err: any) {
    console.error("[WhatsApp API: SendMessage Exception]", err);
    return {
      success: false,
      error: err.message || "Network exception while dispatching WhatsApp message.",
    };
  }
}

/**
 * 3. Get Time Zone List API
 * POST/GET https://papi.messagebot.in/common/GetTimeZoneList
 */
export async function getWhatsappTimeZoneList(
  apiToken?: string
): Promise<{ success: boolean; timezones?: TimeZoneItem[]; error?: string }> {
  const token = getWhatsappApiToken(apiToken);
  if (!token) {
    return { success: false, error: "MessageBot API Token is not configured." };
  }

  try {
    const url = `${process.env.MESSAGEBOT_WHATSAPP_BASE_URL || DEFAULT_BASE_URL}/common/GetTimeZoneList?apiToken=${encodeURIComponent(token)}`;
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(10000),
    });

    const resJson: WhatsappBaseResponse<TimeZoneItem[]> = await response.json();
    if (resJson.IsSuccess || resJson.ErrorCode === 0) {
      return {
        success: true,
        timezones: resJson.ReturnData || [],
      };
    }

    return {
      success: false,
      error: resJson.ErrorDescription || "Failed to retrieve time zones list.",
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error fetching time zones.",
    };
  }
}

/**
 * 4. Get WhatsApp Delivery Report (DLR)
 * POST https://papi.messagebot.in/Whatsapp/GetDlrDetails
 */
export async function getWhatsappDlrDetails({
  campaignId,
  apiToken,
}: {
  campaignId: string | number;
  apiToken?: string;
}): Promise<{ success: boolean; dlr?: WhatsappDlrData; error?: string; raw?: any }> {
  const token = getWhatsappApiToken(apiToken);
  if (!token) {
    return { success: false, error: "MessageBot API Token is not configured." };
  }

  try {
    const url = `${process.env.MESSAGEBOT_WHATSAPP_BASE_URL || DEFAULT_BASE_URL}/Whatsapp/GetDlrDetails`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiToken: token,
        WhatsAppCampaignId: String(campaignId),
      }),
      signal: AbortSignal.timeout(10000),
    });

    const resJson: WhatsappBaseResponse<WhatsappDlrData> = await response.json();
    if (resJson.IsSuccess || resJson.ErrorCode === 0) {
      return {
        success: true,
        dlr: resJson.ReturnData,
        raw: resJson,
      };
    }

    return {
      success: false,
      error: resJson.ErrorDescription || "Failed to retrieve delivery report.",
      raw: resJson,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error fetching delivery report.",
    };
  }
}

/**
 * 5. Get WhatsApp Campaign Details
 * POST https://papi.messagebot.in/whatsapp/GetWhatsAppCampaignDetails
 */
export async function getWhatsappCampaignDetails({
  campaignIds,
  apiToken,
}: {
  campaignIds: string | number | (string | number)[];
  apiToken?: string;
}): Promise<{ success: boolean; campaigns?: WhatsappCampaignItem[]; error?: string; raw?: any }> {
  const token = getWhatsappApiToken(apiToken);
  if (!token) {
    return { success: false, error: "MessageBot API Token is not configured." };
  }

  const formattedCampaignIds = Array.isArray(campaignIds)
    ? campaignIds.join(",")
    : String(campaignIds);

  try {
    const url = `${process.env.MESSAGEBOT_WHATSAPP_BASE_URL || DEFAULT_BASE_URL}/whatsapp/GetWhatsAppCampaignDetails`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiToken: token,
        campaignId: formattedCampaignIds,
      }),
      signal: AbortSignal.timeout(10000),
    });

    const resJson: WhatsappBaseResponse<WhatsappCampaignItem[]> = await response.json();
    if (resJson.IsSuccess || resJson.ErrorCode === 0) {
      return {
        success: true,
        campaigns: resJson.ReturnData || [],
        raw: resJson,
      };
    }

    return {
      success: false,
      error: resJson.ErrorDescription || "Failed to retrieve campaign details.",
      raw: resJson,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error fetching campaign details.",
    };
  }
}

/**
 * 6. Add WhatsApp Template API
 * POST https://papi.messagebot.in/whatsapp/templates/add
 */
export async function addWhatsappTemplate(
  options: AddWhatsappTemplateOptions
): Promise<{ success: boolean; message?: string; error?: string; raw?: any }> {
  const token = getWhatsappApiToken(options.apiToken);
  if (!token) {
    return { success: false, error: "MessageBot API Token is not configured." };
  }

  const formData = new FormData();
  formData.append("ApiToken", token);
  formData.append("TemplateName", options.templateName);
  formData.append("TemplateCategoryId", String(options.templateCategoryId));
  formData.append("CustomerWhatsAppNumber", String(options.customerWhatsAppNumber));
  formData.append("ComponentFormatId", String(options.componentFormatId));

  if (options.bodyText) formData.append("BodyText", options.bodyText);
  if (options.headerText) formData.append("HeaderText", options.headerText);
  if (options.footerText) formData.append("FooterText", options.footerText);
  if (options.exampleBodyText) formData.append("ExampleBodyText", options.exampleBodyText);

  if (options.buttonTypeId) {
    formData.append("ButtonTypeId", String(options.buttonTypeId));
    if (options.buttonText) formData.append("ButtonText", options.buttonText);
    if (options.buttonPhoneNumber) formData.append("ButtonPhoneNumber", options.buttonPhoneNumber);
    if (options.buttonUrl) formData.append("ButtonUrl", options.buttonUrl);
    if (options.buttonExample) formData.append("ButtonExample", options.buttonExample);
  }

  try {
    const url = `${process.env.MESSAGEBOT_WHATSAPP_BASE_URL || DEFAULT_BASE_URL}/whatsapp/templates/add`;
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      signal: AbortSignal.timeout(15000),
    });

    const resJson: WhatsappBaseResponse = await response.json();
    if (resJson.IsSuccess || resJson.ErrorCode === 0) {
      return {
        success: true,
        message: String(resJson.ReturnData || "Template added successfully"),
        raw: resJson,
      };
    }

    return {
      success: false,
      error: resJson.ErrorDescription || "Failed to add WhatsApp template.",
      raw: resJson,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error while submitting WhatsApp template.",
    };
  }
}

/**
 * 7. Get All WhatsApp Templates List
 * POST /whatsapp/templates/getlist?apitoken=...
 */
export async function getWhatsappTemplatesList(
  apiToken?: string
): Promise<{ success: boolean; templates?: WhatsappTemplateItem[]; error?: string; raw?: any }> {
  const token = getWhatsappApiToken(apiToken);
  if (!token) {
    return { success: false, error: "MessageBot API Token is not configured." };
  }

  try {
    const url = `${process.env.MESSAGEBOT_WHATSAPP_BASE_URL || DEFAULT_BASE_URL}/whatsapp/templates/getlist?apitoken=${encodeURIComponent(token)}`;
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(12000),
    });

    const resJson: WhatsappBaseResponse<WhatsappTemplateItem[]> = await response.json();
    if (resJson.IsSuccess || resJson.ErrorCode === 0) {
      return {
        success: true,
        templates: Array.isArray(resJson.ReturnData) ? resJson.ReturnData : [],
        raw: resJson,
      };
    }

    return {
      success: false,
      error: resJson.ErrorDescription || "Failed to load WhatsApp templates list.",
      raw: resJson,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error fetching WhatsApp templates.",
    };
  }
}

/**
 * 8. Get WhatsApp Template Approval Status & Details by ID
 * GET https://papi.messagebot.in/whatsapp/templates/GetById?whatsAppTemplateId=...&apitoken=...
 */
export async function getWhatsappTemplateById({
  templateId,
  apiToken,
}: {
  templateId: string | number;
  apiToken?: string;
}): Promise<{ success: boolean; template?: WhatsappTemplateItem; error?: string; raw?: any }> {
  const token = getWhatsappApiToken(apiToken);
  if (!token) {
    return { success: false, error: "MessageBot API Token is not configured." };
  }

  try {
    const url = `${process.env.MESSAGEBOT_WHATSAPP_BASE_URL || DEFAULT_BASE_URL}/whatsapp/templates/GetById?whatsAppTemplateId=${encodeURIComponent(templateId)}&apiToken=${encodeURIComponent(token)}&apitoken=${encodeURIComponent(token)}`;
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(10000),
    });

    const resJson: WhatsappBaseResponse<WhatsappTemplateItem> = await response.json();
    if (resJson.IsSuccess || resJson.ErrorCode === 0) {
      return {
        success: true,
        template: resJson.ReturnData,
        raw: resJson,
      };
    }

    return {
      success: false,
      error: resJson.ErrorDescription || `Failed to fetch template #${templateId}`,
      raw: resJson,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Network error retrieving template status.",
    };
  }
}
