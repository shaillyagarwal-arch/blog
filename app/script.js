/* ---------------------------------------------------------------------
   Eltropy Blog Generator — static, client-side only.

   generateBlog() below is a PLACEHOLDER. It builds a structural scaffold
   from the pasted resource using the rules in ELTROPY_BLOG_PLAYBOOK.md,
   but it does not call any AI model — it's just formatting.

   TO WIRE UP REAL AI GENERATION LATER, replace the body of generateBlog()
   with a call to your model of choice. Example shape (commented out,
   not live code — do not paste a real API key into this file or any
   file committed to the repo):

     async function generateBlog(resourceText) {
       const response = await fetch("https://api.anthropic.com/v1/messages", {
         method: "POST",
         headers: {
           "content-type": "application/json",
           "x-api-key": localStorage.getItem("userApiKey"), // user-supplied, never hardcoded
           "anthropic-version": "2023-06-01",
           "anthropic-dangerous-direct-browser-access": "true",
         },
         body: JSON.stringify({
           model: "claude-sonnet-5",
           max_tokens: 2000,
           messages: [{ role: "user", content: buildPrompt(resourceText) }],
         }),
       });
       const data = await response.json();
       return data.content[0].text;
     }

   See the three options discussed for how to handle the API key safely
   (bring-your-own-key stored in localStorage, a serverless proxy, etc.)
   before wiring this up for real.
------------------------------------------------------------------------ */

const resourceInput = document.getElementById("resource-input");
const generateBtn = document.getElementById("generate-btn");
const attachBtn = document.getElementById("attach-btn");
const attachFile = document.getElementById("attach-file");
const attachFilename = document.getElementById("attach-filename");
const outputCard = document.getElementById("output-card");
const blogOutput = document.getElementById("blog-output");
const listenBtn = document.getElementById("listen-btn");
const copyBtn = document.getElementById("copy-btn");
const downloadBtn = document.getElementById("download-btn");

/* ---------------- Attach a file into the textarea ---------------- */

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

/* ---------------- Generate (placeholder logic) ---------------- */

generateBtn.addEventListener("click", () => {
  const text = resourceInput.value.trim();
  if (!text) {
    resourceInput.focus();
    resourceInput.placeholder = "Paste something first…";
    return;
  }
  stopSpeaking();
  blogOutput.innerHTML = generateBlog(text);
  outputCard.classList.remove("hidden");
  outputCard.scrollIntoView({ behavior: "smooth", block: "start" });
});

function generateBlog(resourceText) {
  const firstLine = resourceText.split("\n").find((l) => l.trim().length > 0) || resourceText.slice(0, 80);
  const excerpt = resourceText.length > 400 ? resourceText.slice(0, 400).trim() + "…" : resourceText.trim();

  return `
    <h1>[Working Title] — Replace with a hooky, specific headline</h1>
    <p><em>Opening hook: a question, thought, or observation relevant to credit union leaders — not a recycled template. Draft starting point based on your resource:</em></p>
    <p>"${escapeHtml(firstLine)}"</p>

    <h2>What Credit Union Leaders Are Dealing With</h2>
    <p>[Generic industry framing + the pain point this resource speaks to. Add one verified, linked external stat here.]</p>
    <ul>
      <li>[Pain point one]</li>
      <li>[Pain point two]</li>
      <li>[Pain point three]</li>
    </ul>

    <h2>The Evidence</h2>
    <blockquote>${escapeHtml(excerpt)}</blockquote>
    <p>[Weave in the specific names, titles, and stats from your resource here as proof of the argument above.]</p>

    <h2>How Eltropy Solves It</h2>
    <p>[Connect the pain point to the relevant Eltropy product, grounded in what your resource actually shows.]</p>

    <h2>What Changed</h2>
    <p>[Results, in flowing narrative, not a bare stat dump.]</p>

    <p><strong><a href="#">Book a demo of Eltropy →</a></strong></p>
  `;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ---------------- Listen (Web Speech API text-to-speech) ---------------- */

let utterance = null;

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

  utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 1;
  utterance.onend = () => setListenState("idle");
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

/* ---------------- Copy ---------------- */

copyBtn.addEventListener("click", async () => {
  await navigator.clipboard.writeText(blogOutput.innerText);
  const original = copyBtn.innerHTML;
  copyBtn.innerHTML = `<span class="icon">✓</span> Copied`;
  setTimeout(() => (copyBtn.innerHTML = original), 1500);
});

/* ---------------- Download as .md ---------------- */

downloadBtn.addEventListener("click", () => {
  const markdown = htmlToMarkdown(blogOutput);
  const blob = new Blob([markdown], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "blog-draft.md";
  a.click();
  URL.revokeObjectURL(url);
});

function htmlToMarkdown(root) {
  let md = "";
  root.childNodes.forEach((node) => {
    md += nodeToMarkdown(node);
  });
  return md.trim() + "\n";
}

function nodeToMarkdown(node) {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  const tag = node.tagName ? node.tagName.toLowerCase() : "";
  const inner = Array.from(node.childNodes).map(nodeToMarkdown).join("");
  switch (tag) {
    case "h1": return `# ${inner}\n\n`;
    case "h2": return `## ${inner}\n\n`;
    case "h3": return `### ${inner}\n\n`;
    case "p": return `${inner}\n\n`;
    case "strong": case "b": return `**${inner}**`;
    case "em": case "i": return `*${inner}*`;
    case "blockquote": return `> ${inner}\n\n`;
    case "ul": return `${inner}\n`;
    case "li": return `- ${inner}\n`;
    case "a": return `[${inner}](${node.getAttribute("href") || "#"})`;
    default: return inner;
  }
}
