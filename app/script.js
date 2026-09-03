/* ─────────────────────────────────────────────────────────────────────────
   Eltropy Blog Generator — client-side, no backend.
   API key is stored in localStorage. Calls go directly to api.anthropic.com.
   Nothing is logged, saved server-side, or sent anywhere other than Anthropic.
───────────────────────────────────────────────────────────────────────────── */

/* ── Playbook system prompt ─────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are Eltropy's expert blog writing agent. Follow every rule below on every blog you write.

AUDIENCE
- Always credit union leaders (executives, VPs, operations heads).

CORE RULES
- Every blog is built from a resource the user provides. Repurpose it — the resource's underlying theme or pain point is the spine; specific names, stats, or quotes are folded in as evidence, not as the argument's starting point.
- Never fabricate names, titles, credit union names, quotes, or stats. If a speaker's full title is missing from the source, use their name alone and flag the gap.
- When a specific resource's numbers conflict with general Eltropy knowledge, the specific resource always wins.

STANDARD STRUCTURE (default for case-study resources)
1. Industry status — what is broadly happening (with a verified external stat if one exists)
2. Pain point — the generic problem, written so any credit union leader recognizes it as their own
3. The resource as evidence — introduce the specific credit union/leader naturally as proof
4. Solution — how Eltropy actually solved it, grounded in the resource's specifics
5. Results — what changed, in numbers, as flowing narrative
6. CTA — "Book a demo of Eltropy → [link]"

Default length: 500–600 words. With a FAQ block, 700–1000 is acceptable — call out any overage.

VOICE AND TONE
- Vary the opening every blog. Rotate between: a direct question, a sharp observation, a relatable thought. Never default to a recycled scene-setting story.
- Write in full, flowing sentences. No staccato fragments. No "X. Y. Z." rapid-fire lists disguised as sentences.
- Never use "it's not X, it's Y" construction.
- Second person ("you/your") throughout — not just the intro and CTA, but through the pain-point section, solution section, results section. The reader should feel spoken to, not lectured at.
- Confident, not preachy. State things as true. Don't quiz the reader or moralize.

STRUCTURAL REQUIREMENTS (every blog)
- H2 headings/sections are mandatory — even a short 400-word piece needs sections.
- At least one bullet list is mandatory.
- Results sections read as flowing narrative broken into short paragraphs, not a bare stat dump.
- Quotes always carry full credentials: name + title + institution. Flag any missing piece.

SEO/AEO/GEO REQUIREMENTS (every blog)
- Start with SEO Title: and Meta Description: lines.
- H1 + H2 structure throughout.
- A mid-article contextual CTA right after a strong quote or pain point, plus a closing CTA. Both arrow-styled: **[Book a demo of Eltropy →](#)**
- A closing FAQ block that answers conversational queries. "Eltropy" must appear in every single question AND answer — this is deliberate for answer-engine entity association.
- External stats must be real and linked with descriptive anchor text plus (Source: Publisher). Skip the stat rather than use one you can't source.

ELTROPY AI VOICE PRODUCT KNOWLEDGE (use to fill gaps — never override case study numbers)
- Core product: Eltropy AI Voice, AI Chat, AI Assistants for credit unions
- Integrations: Symitar, Fiserv Portico, CU Answers, and other core banking systems
- Authentication: knowledge-based + phone authentication
- Handles: account inquiries, loan status, balance checks, fraud alerts, appointment scheduling, loan servicing, IVR modernization
- Unlike scripted IVRs, Eltropy uses generative AI — understands natural language, not just DTMF
- Typical implementation: 60–90 days to deploy
- Outcomes credit unions report: 30–50% reduction in agent call volume, significant after-hours coverage, CSAT scores at or above human-agent benchmarks

BLOG TYPE VARIANTS
When the user specifies a type, use it. Otherwise infer from the resource:
- Case Study: Challenge → Context → Solution → Execution → Results → Quote
- Listicle: Hook → numbered items each as a mini-story (pain → impact → how Eltropy fixed it → result) with question-style H3 subheadings
- Thought Leadership: Thesis → Current state → Why it falls short → Your argument → Evidence → Implications → Recommendations
- How-To, Interview, Newsjacking, Review, Announcement, Spotlight, Personal Story as appropriate

LISTICLE RULES
- Each item: catchy question-style subheading, not a flat stat headline.
- Walk through pain → impact → how Eltropy fixed it → result, but not as rigid labeled sections every time. Let each item flow as its own varied mini-story.
- Reserve "Red Flag / Questions to Ask Yourself / Our Take" labels for evaluative/checklist listicles (buyer's guides, vendor comparisons). For proof-driven listicles, write flowing mini-stories.

OUTPUT FORMAT
- Output in clean Markdown.
- Always include SEO Title and Meta Description at the very top (as plain labeled lines, not headings).
- Use ## for section headings, ### for sub-items in listicles.
- Use > for blockquotes.
- Bold CTAs.

GUARDRAILS
- No PII from Eltropy's customers or their end-users.
- No fabricated identities, stats, or synthetic data.
- Flag any financial claims as needing independent verification.
- SOC 2 compliant output only.`;

/* ── DOM refs ─────────────────────────────────────────────────────────── */

const resourceInput   = document.getElementById("resource-input");
const generateBtn     = document.getElementById("generate-btn");
const attachBtn       = document.getElementById("attach-btn");
const attachFile      = document.getElementById("attach-file");
const attachFilename  = document.getElementById("attach-filename");
const outputCard      = document.getElementById("output-card");
const blogOutput      = document.getElementById("blog-output");
const listenBtn       = document.getElementById("listen-btn");
const copyBtn         = document.getElementById("copy-btn");
const downloadBtn     = document.getElementById("download-btn");
const settingsToggle  = document.getElementById("settings-toggle");
const settingsPanel   = document.getElementById("settings-panel");
const apiKeyInput     = document.getElementById("api-key-input");
const saveKeyBtn      = document.getElementById("save-key-btn");
const clearKeyBtn     = document.getElementById("clear-key-btn");
const noKeyBanner     = document.getElementById("no-key-banner");

/* ── API key management ─────────────────────────────────────────────── */

const KEY_STORE = "eltropy_anthropic_key";

function getApiKey()        { return localStorage.getItem(KEY_STORE) || ""; }
function saveApiKey(k)      { localStorage.setItem(KEY_STORE, k.trim()); }
function clearApiKey()      { localStorage.removeItem(KEY_STORE); }
function hasApiKey()        { return !!getApiKey(); }

// Pre-fill input if key already saved
apiKeyInput.value = getApiKey() ? "••••••••••••••••" : "";

settingsToggle.addEventListener("click", () => {
  const open = settingsPanel.classList.toggle("hidden") === false;
  settingsToggle.setAttribute("aria-expanded", String(open));
  if (open && hasApiKey()) apiKeyInput.value = "••••••••••••••••";
});

apiKeyInput.addEventListener("focus", () => {
  if (apiKeyInput.value === "••••••••••••••••") apiKeyInput.value = "";
});

saveKeyBtn.addEventListener("click", () => {
  const k = apiKeyInput.value.trim();
  if (!k || k === "••••••••••••••••") return;
  saveApiKey(k);
  apiKeyInput.value = "••••••••••••••••";
  settingsPanel.classList.add("hidden");
  noKeyBanner.classList.add("hidden");
  settingsToggle.setAttribute("aria-expanded", "false");
});

clearKeyBtn.addEventListener("click", () => {
  clearApiKey();
  apiKeyInput.value = "";
});

/* ── File attach ──────────────────────────────────────────────────── */

attachBtn.addEventListener("click", () => attachFile.click());

attachFile.addEventListener("change", () => {
  const file = attachFile.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    resourceInput.value = e.target.result;
    attachFilename.textContent = `Attached: ${file.name}`;
  };
  reader.readAsText(file);
});

/* ── Generate ─────────────────────────────────────────────────────── */

generateBtn.addEventListener("click", async () => {
  const text = resourceInput.value.trim();
  if (!text) {
    resourceInput.focus();
    return;
  }

  if (!hasApiKey()) {
    noKeyBanner.classList.remove("hidden");
    settingsPanel.classList.remove("hidden");
    settingsToggle.setAttribute("aria-expanded", "true");
    return;
  }

  noKeyBanner.classList.add("hidden");
  stopSpeaking();
  await runGeneration(text);
});

async function runGeneration(resourceText) {
  // Show loading state
  blogOutput.innerHTML = "";
  blogOutput.classList.add("generating");
  blogOutput.textContent = "Writing your blog…";
  outputCard.classList.remove("hidden");
  outputCard.scrollIntoView({ behavior: "smooth", block: "start" });
  generateBtn.disabled = true;
  generateBtn.textContent = "Writing…";

  try {
    const markdown = await callClaude(resourceText);
    blogOutput.classList.remove("generating");
    blogOutput.innerHTML = markdownToHtml(markdown);
  } catch (err) {
    blogOutput.classList.remove("generating");
    blogOutput.innerHTML = `<p style="color:#c0392b"><strong>Error:</strong> ${escapeHtml(err.message)}</p>
      <p>Check your API key (⚙ API Key in the header) and try again.</p>`;
  } finally {
    generateBtn.disabled = false;
    generateBtn.textContent = "Generate Blog →";
  }
}

async function callClaude(resourceText) {
  const apiKey = getApiKey();

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-opus-5",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Write a blog using this resource:\n\n${resourceText}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message || `HTTP ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  return data.content?.[0]?.text || "";
}

/* ── Markdown → HTML ─────────────────────────────────────────────── */

function markdownToHtml(md) {
  // Escape HTML in text nodes only (applied after block processing)
  let html = md
    // SEO/Meta lines at top — render as styled info block
    .replace(/^SEO Title:\s*(.+)$/m, '<p class="seo-meta"><strong>SEO Title:</strong> $1</p>')
    .replace(/^Meta Description:\s*(.+)$/m, '<p class="seo-meta"><strong>Meta Description:</strong> $1</p>')

    // Headings
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")

    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>")

    // Horizontal rules
    .replace(/^---$/gm, "<hr />")

    // Unordered lists (group consecutive - lines)
    .replace(/((?:^- .+\n?)+)/gm, (block) => {
      const items = block.trim().split("\n").map(l => `<li>${l.replace(/^- /, "")}</li>`).join("");
      return `<ul>${items}</ul>`;
    })

    // Numbered lists
    .replace(/((?:^\d+\. .+\n?)+)/gm, (block) => {
      const items = block.trim().split("\n").map(l => `<li>${l.replace(/^\d+\. /, "")}</li>`).join("");
      return `<ol>${items}</ol>`;
    })

    // Inline: bold, italic, links
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')

    // Paragraphs: wrap lines that aren't already block elements
    .replace(/^(?!<[h1-6|ul|ol|li|blockquote|hr|p])(.+)$/gm, "<p>$1</p>")

    // Clean up blank lines / double-wraps
    .replace(/<p><\/p>/g, "")
    .replace(/<p>\s*(<(?:h[1-6]|ul|ol|blockquote|hr))/g, "$1")
    .replace(/((?:h[1-6]|ul|ol|blockquote|hr)[^>]*>)\s*<\/p>/g, "$1");

  return html;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ── TTS ────────────────────────────────────────────────────────── */

listenBtn.addEventListener("click", () => {
  if (!("speechSynthesis" in window)) {
    alert("Text-to-speech isn't supported in this browser.");
    return;
  }

  if (speechSynthesis.speaking && !speechSynthesis.paused) {
    speechSynthesis.pause();
    setListenState("paused");
    return;
  }

  if (speechSynthesis.paused) {
    speechSynthesis.resume();
    setListenState("speaking");
    return;
  }

  const text = blogOutput.innerText.trim();
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.onend   = () => setListenState("idle");
  utterance.onerror = () => setListenState("idle");
  speechSynthesis.speak(utterance);
  setListenState("speaking");
});

function setListenState(state) {
  listenBtn.classList.toggle("active", state === "speaking");
  const label = { idle: "Listen", speaking: "Pause", paused: "Resume" }[state];
  listenBtn.innerHTML = `<span class="icon">🔊</span> ${label}`;
}

function stopSpeaking() {
  if ("speechSynthesis" in window) speechSynthesis.cancel();
  setListenState("idle");
}

/* ── Copy ───────────────────────────────────────────────────────── */

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(blogOutput.innerText);
  const orig = copyBtn.innerHTML;
  copyBtn.innerHTML = `<span class="icon">✓</span> Copied`;
  setTimeout(() => (copyBtn.innerHTML = orig), 1500);
});

/* ── Download .md ────────────────────────────────────────────────── */

downloadBtn.addEventListener("click", () => {
  const markdown = htmlToMarkdown(blogOutput);
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = "blog-draft.md";
  a.click();
  URL.revokeObjectURL(url);
});

function htmlToMarkdown(root) {
  let md = "";
  root.childNodes.forEach((node) => { md += nodeToMarkdown(node); });
  return md.trim() + "\n";
}

function nodeToMarkdown(node) {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  const tag   = node.tagName ? node.tagName.toLowerCase() : "";
  const inner = Array.from(node.childNodes).map(nodeToMarkdown).join("");
  switch (tag) {
    case "h1":         return `# ${inner}\n\n`;
    case "h2":         return `## ${inner}\n\n`;
    case "h3":         return `### ${inner}\n\n`;
    case "p":          return `${inner}\n\n`;
    case "strong": case "b": return `**${inner}**`;
    case "em":    case "i": return `*${inner}*`;
    case "blockquote": return `> ${inner}\n\n`;
    case "ul":         return `${inner}\n`;
    case "ol":         return `${inner}\n`;
    case "li":         return `- ${inner}\n`;
    case "hr":         return `---\n\n`;
    case "a":          return `[${inner}](${node.getAttribute("href") || "#"})`;
    default:           return inner;
  }
}
