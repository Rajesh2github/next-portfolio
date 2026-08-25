import { SequenceChallenge } from "../../types";

export const httpChallenge: SequenceChallenge = {
  id: "http-sequence",
  category: "Browser & Networking",
  title: "HTTPS Connection Journey",
  description: "Arrange the chronological networking and browser rendering steps that execute immediately after a user types 'https://rajesh.com' and hits Enter.",
  difficulty: "medium",
  targetDescription: "DNS Resolution ➔ TCP Handshake ➔ TLS Negotiation ➔ HTTP GET Request ➔ Server Processing ➔ Browser Paint.",
  correctOrder: ["dns", "tcp", "tls", "request", "response", "render"],
  steps: [
    {
      id: "dns",
      label: "DNS Resolution Lookup",
      description: "Query UDP domain registers to resolve human-readable 'rajesh.com' addresses into numerical target server IP locations.",
    },
    {
      id: "tcp",
      label: "TCP Handshake Synchronize",
      description: "Perform the reliable three-way packet handshake (SYN ➔ SYN-ACK ➔ ACK) to secure network sockets.",
    },
    {
      id: "tls",
      label: "TLS/SSL Session Key Exchange",
      description: "Negotiate cryptographic handshake parameters and securely trade session keys to encrypt packet payloads.",
    },
    {
      id: "request",
      label: "Transmit HTTP GET Headers",
      description: "Transmit raw headers (User-Agent, Cookies, Accept) requesting document resources from the server.",
    },
    {
      id: "response",
      label: "Receive Server Payload Response",
      description: "Server receives request, queries DB rows, compiles layout templates, and returns status payloads (e.g. 200 OK).",
    },
    {
      id: "render",
      label: "Browser Engine DOM/CSSOM Paint",
      description: "Client engine parses HTML strings to build DOM trees, resolves stylesheets to CSSOM, and draws pixels (LCP / INP).",
    },
  ],
  explanation:
    "Every HTTPS connection executes this rigorous sequential loop. DNS maps names to numbers; TCP establishes connectivity; TLS negotiates cryptographic keys to secure data; HTTP executes requests and server responses; and finally, client browser rendering engines translate files into glowing pixels!"
};
