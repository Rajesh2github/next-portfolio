import { DetectiveChallenge } from "../../types";

export const secureChallenges: DetectiveChallenge[] = [
  {
    id: "secure-csp",
    title: "Case #1: The Missing CSP Banner",
    description: "An app has zero Content Security Policy headers defined. A script injection vulnerability in a dependency is letting attackers pull malicious CDNs and run inline inline-hashes.",
    difficulty: "easy",
    symptom: "Script injections execute freely. Browser loads script resources from unvetted domain names.",
    code: `// Node Express secure server config
app.use((req, res, next) => {
  // No Content-Security-Policy is set
  res.setHeader("X-Frame-Options", "DENY");
  next();
});`,
    consoleLogs: [
      "🖥️ Security headers compiled.",
      "⚠️ [Shield Auditor] Critical: Document lacks a Content-Security-Policy header. Inline scripts can run unchecked."
    ],
    options: [
      { id: "wrong-1", label: "Change X-Frame-Options from 'DENY' to 'SAMEORIGIN'.", correct: false },
      { id: "correct", label: "Apply CSP header: 'Content-Security-Policy: default-src \\'self\\'; script-src \\'self\\' https://apis.vetted.com'.", correct: true },
      { id: "wrong-2", label: "Add 'Access-Control-Allow-Origin: *' to block script cross loading.", correct: false },
      { id: "wrong-3", label: "Encrypt your Express responses using local server salts.", correct: false }
    ],
    explanation:
      "A Content Security Policy (CSP) header is a powerful defense-in-depth tool. It restricts the origins from which the browser is allowed to load resources (scripts, stylesheets, images, fonts). Setting `default-src 'self'` prevents the browser from loading scripts from unauthorized, malicious external domains even if an XSS injection occurs."
  },
  {
    id: "secure-cors",
    title: "Case #2: The Wildcard CORS Leak",
    description: "To fix a local API request block, a developer applied wildcard origin headers inside Express. Now, any third-party external website can query your database through client-side API requests.",
    difficulty: "medium",
    symptom: "Data leakage risk. Credentials and session queries are readable by cross-origin scripts.",
    code: `// Express API Endpoint CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});`,
    consoleLogs: [
      "🖥️ API Route mounted.",
      "🛑 [CORS Auditor] Error: Access-Control-Allow-Origin cannot be set to '*' when credentials are enabled."
    ],
    options: [
      { id: "wrong-1", label: "Remove the 'Access-Control-Allow-Credentials' header entirely.", correct: false },
      { id: "correct", label: "Restrict origin to your specific domain: 'Access-Control-Allow-Origin: https://rajesh.com'.", correct: true },
      { id: "wrong-2", label: "Convert the server response payload into a secure buffer chunk.", correct: false },
      { id: "wrong-3", label: "Change HTTP Request method from GET to PATCH.", correct: false }
    ],
    explanation:
      "Using the wildcard origin `Access-Control-Allow-Origin: *` allows literally *any* origin to read your API responses. Combined with credentials enabled, this represents a severe vulnerability. Restricting the origin header to your precise, vetted web address (`https://rajesh.com`) seals the api pipeline against cross-origin data theft."
  },
  {
    id: "secure-dns-hsts",
    title: "Case #3: The Unencrypted TLS Leak",
    description: "An app runs over HTTPS, but users typing 'http://app.com' are vulnerable to packet sniffing or redirection attacks before they get redirected to the secure TLS route.",
    difficulty: "hard",
    symptom: "Man-in-the-middle vector. The initial HTTP request can be intercepted or stripped down to plain text.",
    code: `// Server redirection config
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect("https://" + req.headers.host + req.url);
  }
  next();
});`,
    consoleLogs: [
      "🖥️ Redirect middleware active.",
      "⚠️ [DNS Auditor] Warn: Initial query transition lacks HSTS (HTTP Strict Transport Security) policies."
    ],
    options: [
      { id: "wrong-1", label: "Change redirects to use HTTP status code 302.", correct: false },
      { id: "correct", label: "Add the HSTS header: 'Strict-Transport-Security: max-age=63072000; includeSubDomains; preload'.", correct: true },
      { id: "wrong-2", label: "Verify requests using client-side Web Cryptography APIs.", correct: false },
      { id: "wrong-3", label: "Block all incoming connections that don't pass an SSL handshake directly.", correct: false }
    ],
    explanation:
      " Redirections are helpful, but the very first connection is still made over unencrypted HTTP, presenting a window for interception (SSL Stripping). The `Strict-Transport-Security` (HSTS) header instructs browsers to *only* communicate with your domain over secure HTTPS automatically, transforming all subsequent HTTP clicks to HTTPS before the request even leaves the client."
  },
  {
    id: "secure-headers-xss",
    title: "Case #4: The MIME Type Attack",
    description: "Users upload simple avatar text/jpg files. An attacker uploaded an executable script file disguised as a JPEG, which the browser compiles and runs as JavaScript because it infers the mime type.",
    difficulty: "medium",
    symptom: "MIME-sniffing execution. Script assets execute because the browser sniffs content types.",
    code: `// Static assets server response
app.use("/avatars", express.static("uploads"));
// No content sniffing protection is declared`,
    consoleLogs: [
      "🖥️ Static file system mounted.",
      "⚠️ [Header Auditor] Warning: Missing X-Content-Type-Options header. Browser may sniff MIME categories."
    ],
    options: [
      { id: "wrong-1", label: "Add a file extension check in client-side HTML forms.", correct: false },
      { id: "correct", label: "Configure server to send: 'X-Content-Type-Options: nosniff'.", correct: true },
      { id: "wrong-2", label: "Set the response status code of static files to 201 Created.", correct: false },
      { id: "wrong-3", label: "Block all uploads that exceed 100KB in size limit.", correct: false }
    ],
    explanation:
      "Browsers historically try to 'sniff' or infer the correct MIME content-type of an asset if it differs from the declared header. This lets scripts disguised as images execute inside browser context. Setting the `X-Content-Type-Options: nosniff` header blocks this behavior, forcing the browser to strictly follow the MIME type declared by the server."
  }
];
