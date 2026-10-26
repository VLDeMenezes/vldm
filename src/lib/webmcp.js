import { profile } from "@/data/profile";
import { track } from "@/lib/analytics";

/**
 * WebMCP (https://webmachinelearning.github.io/webmcp) exposes page features to
 * AI agents through `document.modelContext`. It is a progressive enhancement:
 * browsers without the API simply keep the normal UI.
 *
 * The tool descriptions stay in English on purpose — agents parse them
 * regardless of the locale the visitor is browsing in.
 */

export const RNFACTORY_URL = "https://rn-factory.com/";
export const CV_FILENAME = "Victor-De-Menezes-CV.pdf";

const CONTACT_UTM =
  "utm_source=portfolio&utm_medium=webmcp&utm_campaign=agent";
const CONTACT_CHANNELS = ["email", "linkedin", "github"];

const NO_INPUT = Object.freeze({
  type: "object",
  properties: {},
  additionalProperties: false,
});

function absoluteUrl(path) {
  if (typeof window === "undefined") return path;

  try {
    return new URL(path, window.location.origin).toString();
  } catch {
    return path;
  }
}

function recordAction(tool, source) {
  track("webmcp_action", { tool, source });
}

/**
 * Anchor clicks work without a popup blocker in more cases than window.open,
 * and mailto links keep the visitor's mail client in charge of the draft.
 */
function openLink(url) {
  if (typeof document === "undefined") return false;

  const link = document.createElement("a");
  link.href = url;
  link.rel = "noopener noreferrer";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link.remove();

  return true;
}

export function getPortfolioSummary() {
  return {
    name: profile.fullName,
    displayName: profile.name,
    role: profile.role,
    location: profile.location,
    availability: profile.availability,
    yearsOfExperience: profile.yearsOfExperience,
    languages: profile.languages,
    stack: [
      "React",
      "React Native",
      "Next.js",
      "TypeScript",
      "Angular",
      "Node.js",
      "AWS",
    ],
    links: {
      portfolio: profile.url,
      email: `mailto:${profile.email}`,
      linkedin: profile.linkedin,
      github: profile.github,
      cv: absoluteUrl(profile.cv),
      rnfactory: RNFACTORY_URL,
    },
  };
}

export function downloadCv(source = "menu") {
  const url = absoluteUrl(profile.cv);

  if (typeof document !== "undefined") {
    const link = document.createElement("a");
    link.href = url;
    link.download = CV_FILENAME;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  recordAction("download_cv", source);

  return {
    action: "download_cv",
    url,
    filename: CV_FILENAME,
    note: "The download was triggered. If the browser blocked it, the url can be opened directly.",
  };
}

export function contactVictor(options = {}, source = "menu") {
  const { channel = "email", subject, message } = options ?? {};
  const safeChannel = CONTACT_CHANNELS.includes(channel) ? channel : "email";

  let url;

  if (safeChannel === "email") {
    const params = [];

    if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
    if (message) params.push(`body=${encodeURIComponent(message)}`);

    url = `mailto:${profile.email}${
      params.length > 0 ? `?${params.join("&")}` : ""
    }`;

    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  } else if (safeChannel === "linkedin") {
    url = `${profile.linkedin}?${CONTACT_UTM}`;
    openLink(url);
  } else {
    url = `${profile.github}?${CONTACT_UTM}`;
    openLink(url);
  }

  recordAction("contact_victor", source);

  return {
    action: "contact_victor",
    channel: safeChannel,
    url,
    note:
      safeChannel === "email"
        ? "A draft was opened in the visitor's email client. Nothing was sent."
        : "The profile was opened in a new tab.",
  };
}

export function openRnfactory(source = "menu") {
  openLink(RNFACTORY_URL);
  recordAction("open_rnfactory", source);

  return {
    action: "open_rnfactory",
    name: "RNFactory",
    url: RNFACTORY_URL,
    note: "RNFactory was opened in a new tab.",
  };
}

export function createPortfolioTools() {
  return [
    {
      name: "get_portfolio_profile",
      description:
        "Return Víctor De Menezes' portfolio profile: role, location, availability, years of experience, languages, stack, and links to email, LinkedIn, GitHub, CV and RNFactory. Read-only.",
      inputSchema: NO_INPUT,
      annotations: {
        readOnlyHint: true,
        untrustedContentHint: false,
        consequentialHint: false,
      },
      execute: () => {
        recordAction("get_portfolio_profile", "agent");
        return getPortfolioSummary();
      },
    },
    {
      name: "download_cv",
      description:
        "Download Víctor De Menezes' CV as a PDF. Use it when the user asks for his CV, résumé, or a document with his experience. Returns the direct URL as a fallback.",
      inputSchema: NO_INPUT,
      annotations: {
        readOnlyHint: false,
        untrustedContentHint: false,
        consequentialHint: false,
      },
      execute: () => downloadCv("agent"),
    },
    {
      name: "contact_victor",
      description:
        "Open a prefilled way to contact Víctor. The channel can be email (default), linkedin or github. For email, the optional subject and message are pre-filled in a draft; the tool composes the message but never sends it.",
      inputSchema: {
        type: "object",
        properties: {
          channel: {
            type: "string",
            enum: CONTACT_CHANNELS,
            description:
              "Contact channel. Defaults to email, which opens a prefilled draft.",
          },
          subject: {
            type: "string",
            description: "Optional email subject, used only for email.",
          },
          message: {
            type: "string",
            description: "Optional email body, used only for email.",
          },
        },
        additionalProperties: false,
      },
      annotations: {
        readOnlyHint: false,
        untrustedContentHint: false,
        consequentialHint: false,
      },
      execute: (input) => contactVictor(input, "agent"),
    },
    {
      name: "open_rnfactory",
      description:
        "Open RNFactory at https://rn-factory.com/, Víctor's React Native and Expo app factory for bootstrapping mobile projects with AI workflows and monetization.",
      inputSchema: NO_INPUT,
      annotations: {
        readOnlyHint: false,
        untrustedContentHint: false,
        consequentialHint: false,
      },
      execute: () => openRnfactory("agent"),
    },
  ];
}

export function isWebMcpSupported() {
  return (
    typeof document !== "undefined" &&
    "modelContext" in document &&
    typeof document.modelContext?.registerTool === "function"
  );
}

async function getRegisteredNames() {
  const context = document.modelContext;

  if (!context || typeof context.getTools !== "function") return null;

  try {
    const tools = await context.getTools();
    return new Set(tools.map((tool) => tool.name));
  } catch {
    return null;
  }
}

async function registerAll(signal) {
  const existing = await getRegisteredNames();
  const registered = [];
  const failed = [];

  for (const tool of createPortfolioTools()) {
    // Another mount may have registered these tools already (React Strict Mode,
    // locale navigation, or a same-origin frame). Registering twice would throw.
    if (existing?.has(tool.name)) {
      registered.push(tool.name);
      continue;
    }

    try {
      await document.modelContext.registerTool(tool, { signal });
      registered.push(tool.name);
    } catch (error) {
      if (signal?.aborted) break;

      failed.push({
        name: tool.name,
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return { supported: true, registered, failed };
}

// Registration is shared by every mount, so Strict Mode's mount → cleanup →
// mount cycle (and locale switches) does not tear the tools down and rebuild
// them in the middle of an agent call.
let sharedController = null;
let sharedPromise = null;
let consumers = 0;
let releaseTimer = null;

export function acquirePortfolioTools() {
  consumers += 1;

  if (releaseTimer) {
    clearTimeout(releaseTimer);
    releaseTimer = null;
  }

  if (!sharedPromise) {
    if (!isWebMcpSupported()) {
      sharedPromise = Promise.resolve({
        supported: false,
        registered: [],
        failed: [],
      });
    } else {
      sharedController = new AbortController();
      sharedPromise = registerAll(sharedController.signal);
    }
  }

  return sharedPromise;
}

export function releasePortfolioTools() {
  consumers = Math.max(0, consumers - 1);
  if (consumers > 0) return;

  // Defer the teardown by a tick so a remount can reuse the registration.
  releaseTimer = setTimeout(() => {
    releaseTimer = null;
    if (consumers > 0) return;

    sharedController?.abort();
    sharedController = null;
    sharedPromise = null;
  }, 0);
}
