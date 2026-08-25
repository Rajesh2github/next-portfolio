import { DetectiveChallenge } from "../../types";

export const securityChallenges: DetectiveChallenge[] = [
  {
    id: "xss-vulnerability",
    title: "Case #1: The Injected Script (XSS)",
    description: "A simple profile review section lets users write text reviews. A malicious attacker submitted a review containing standard script tags, which executes in other users' browsers and steals session tokens.",
    difficulty: "medium",
    symptom: "Stored Cross-Site Scripting (XSS). Custom script strings execute immediately upon page load.",
    code: `export default function ProductReview({ review }) {
  // Rendering the user's review description safely?
  return (
    <div className="review-card">
      <h4>{review.author}</h4>
      <div dangerouslySetInnerHTML={{ __html: review.content }} />
    </div>
  );
}`,
    consoleLogs: [
      "🖥️ Product Reviews loaded.",
      "⚠️ [XSS Auditor] Vulnerability: html injection detected inside dangerouslySetInnerHTML.",
      "🛑 [Browser] Executing injected script: alert(document.cookie)"
    ],
    options: [
      { id: "wrong-1", label: "Replace the 'div' wrapper with an 'iframe' element pointing to review.", correct: false },
      { id: "correct", label: "Avoid 'dangerouslySetInnerHTML' and render content as a standard React text child: '<div>{review.content}</div>'.", correct: true },
      { id: "wrong-2", label: "Apply 'aria-hidden=\"true\"' to the review div container.", correct: false },
      { id: "wrong-3", label: "Write a client-side regex filter inside the React component to find '<script>' tags.", correct: false }
    ],
    explanation:
      "React's standard curly brace text rendering `{review.content}` automatically escapes string inputs (encoding `<`, `>`, `&`, etc. into entities), neutralizing active scripts. Using `dangerouslySetInnerHTML` bypasses this safety shield. Unless rendering vetted rich HTML (which should still be sanitized with libraries like DOMPurify), standard text nodes are the secure default."
  },
  {
    id: "api-secret-exposure",
    title: "Case #2: The Leaked Key",
    description: "An engineer is using a paid Map API service. They committed the backend service private admin key into their client-side Next.js environment file, resulting in an automated bot stealing the key and draining the API balance.",
    difficulty: "easy",
    symptom: "Paid balance depletion. Third-party providers alert you that your admin credentials are exposed publicly.",
    code: `# local environment config
# NEXT_PUBLIC_ prefixes make variables available to client bundle!

NEXT_PUBLIC_MAP_ADMIN_API_KEY="sk_live_51M2b_admin_private_token_secret"`,
    consoleLogs: [
      "🖥️ Hydrating client-side bundle.",
      "⚠️ [Build Analyzer] Warning: Exposed NEXT_PUBLIC_ key detected in client asset chunks (map-api.js:154)."
    ],
    options: [
      { id: "wrong-1", label: "Add the env file to your gitignore file after committing it to GitHub.", correct: false },
      { id: "wrong-2", label: "Encrypt the key inside the client code using a static Javascript function.", correct: false },
      { id: "correct", label: "Remove the 'NEXT_PUBLIC_' prefix to restrict the variable to the server, and proxy requests through a Next.js API Route.", correct: true },
      { id: "wrong-3", label: "Rename the environment variable to 'MAP_API_KEY_PUBLIC_ONLY'.", correct: false }
    ],
    explanation:
      "Next.js automatically injects any environment variables prefixed with `NEXT_PUBLIC_` directly into the client-side JavaScript bundles, making them visible to anyone who inspects source files. To secure private tokens, remove the public prefix (keeping them strictly on the secure server) and query APIs through an intermediary serverless API route (`/app/api/`), hiding the key completely."
  },
  {
    id: "sql-injection",
    title: "Case #3: The Escaped SQL Query",
    description: "A database search query matches username inputs using raw string concatenation. An attacker entered \"admin' OR '1'='1\" into the search field, logging them in as admin and exposing the full database.",
    difficulty: "hard",
    symptom: "Unauthorized database extraction. Attacker executes raw SQL commands via user input fields.",
    code: `// Secure Database Fetch API?
const query = 
  \`SELECT * FROM users WHERE username = '\${input}'\`;

const result = await db.execute(query);`,
    consoleLogs: [
      "🖥️ Query executed on database.",
      "⚠️ [SQL Compiler] Query parsed: SELECT * FROM users WHERE username = 'admin' OR '1'='1'",
      "🛑 [Security Monitor] Alert: Statement bypass triggered. Returned complete users collection."
    ],
    options: [
      { id: "wrong-1", label: "Strip out all spaces from the user input before compiling the query.", correct: false },
      { id: "correct", label: "Use parameterized queries (prepared statements): 'SELECT * FROM users WHERE username = ?' passing the input as a bind parameter.", correct: true },
      { id: "wrong-2", label: "Convert the input to a base64 encoded string before concatenation.", correct: false },
      { id: "wrong-3", label: "Double up all single quotes in the input string via client-side javascript.", correct: false }
    ],
    explanation:
      "Raw string concatenation inside SQL statements lets input parameters bleed into the executable query syntax. This allows attackers to terminate string boundaries and inject custom instructions (SQL Injection). Using parameterized queries (Prepared Statements) treats inputs strictly as literal values, never as executable commands, entirely eliminating SQL injection risks."
  },
  {
    id: "insecure-cookie",
    title: "Case #4: The Hijacked Cookie",
    description: "A developer is storing session authentication tokens inside standard document cookies. An attacker used an XSS script to read 'document.cookie' and hijacked the user's active session.",
    difficulty: "medium",
    symptom: "Session hijacking. Credentials stored in document cookies are compromised via script execution.",
    code: `// Express server session set cookie header
res.setHeader("Set-Cookie", "session_token=xyz789; Path=/");`,
    consoleLogs: [
      "🖥️ Session started.",
      "⚠️ [Client Auditor] Cookie accessible via script tree (document.cookie: session_token=xyz789)."
    ],
    options: [
      { id: "wrong-1", label: "Encrypt the cookie content on the client side using a localStorage key.", correct: false },
      { id: "correct", label: "Set the 'HttpOnly' flag and 'Secure' directive on the cookie header.", correct: true },
      { id: "wrong-2", label: "Store the token inside a standard sessionStorage container instead of cookies.", correct: false },
      { id: "wrong-3", label: "Change the cookie key name to an unrecognizable random hash.", correct: false }
    ],
    explanation:
      "Standard cookies are readable by JavaScript scripts via `document.cookie`, meaning XSS vulnerabilities can instantly leak session tokens. Adding the `HttpOnly` flag prevents client-side scripts from reading or accessing the cookie, while the `Secure` flag forces transmission only over encrypted HTTPS connections, completely shielding session identifiers from theft."
  }
];
