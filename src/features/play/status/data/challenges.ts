import { JavaScriptChallenge } from "../../types";

export const httpStatusChallenges: JavaScriptChallenge[] = [
  {
    id: "http-200",
    category: "2xx Success",
    difficulty: "easy",
    question: "The client queries an API, and the server successfully processes the request and returns the requested payload. What status code is issued?",
    options: [
      { id: "200", label: "200 OK" },
      { id: "201", label: "201 Created" },
      { id: "204", label: "204 No Content" },
      { id: "206", label: "206 Partial Content" },
    ],
    correctAnswer: "200",
    explanation:
      "A '200 OK' represents standard success for HTTP requests. It indicates that the server successfully processed the client payload and returned the requested content in the response body."
  },
  {
    id: "http-301",
    category: "3xx Redirection",
    difficulty: "easy",
    question: "You permanently relocated your blog posts folder from '/old-posts/' to '/blog/'. You want search engines to migrate all search rank and link index authority to the new path. What status code should you return?",
    options: [
      { id: "301", label: "301 Moved Permanently" },
      { id: "302", label: "302 Found (Temporary Redirect)" },
      { id: "307", label: "307 Temporary Redirect" },
      { id: "308", label: "308 Permanent Redirect" },
    ],
    correctAnswer: "301",
    explanation:
      "A '301 Moved Permanently' instructs browser caches and search engine crawlers that the resource has permanently migrated to a new location. Search engines pass 90-99% of link authority (link juice) to the new canonical URL."
  },
  {
    id: "http-400",
    category: "4xx Client Errors",
    difficulty: "medium",
    question: "A client sends a POST request containing a malformed, invalid JSON payload that the server is completely unable to parse or validate. What status code is returned?",
    options: [
      { id: "400", label: "400 Bad Request" },
      { id: "422", label: "422 Unprocessable Entity" },
      { id: "406", label: "406 Not Acceptable" },
      { id: "415", label: "415 Unsupported Media Type" },
    ],
    correctAnswer: "400",
    explanation:
      "A '400 Bad Request' indicates that the server cannot or will not process the request due to something perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive routing)."
  },
  {
    id: "http-401",
    category: "4xx Client Errors",
    difficulty: "easy",
    question: "A user attempts to view their private dashboard route, but they are not logged in or have not provided valid authentication cookies. What status code is returned?",
    options: [
      { id: "401", label: "401 Unauthorized" },
      { id: "403", label: "403 Forbidden" },
      { id: "407", label: "407 Proxy Authentication Required" },
      { id: "451", label: "451 Unavailable For Legal Reasons" },
    ],
    correctAnswer: "401",
    explanation:
      "Despite the name 'Unauthorized', '401' actually means 'Unauthenticated'. It indicates that the request lacks valid authentication credentials for the target resource and must be resubmitted with authentication keys."
  },
  {
    id: "http-403",
    category: "4xx Client Errors",
    difficulty: "medium",
    question: "A user logs in successfully, but attempts to access the administration settings panel which is strictly restricted to administrator accounts only. What status code should be issued?",
    options: [
      { id: "401", label: "401 Unauthorized" },
      { id: "403", label: "403 Forbidden" },
      { id: "404", label: "404 Not Found" },
      { id: "405", label: "405 Method Not Allowed" },
    ],
    correctAnswer: "403",
    explanation:
      "A '403 Forbidden' means the client's identity is authenticated, but they lack permission/authorization to access the requested resource. Unlike 401, re-authenticating with the same account will not grant access."
  },
  {
    id: "http-404",
    category: "4xx Client Errors",
    difficulty: "easy",
    question: "A browser attempts to load a route path that does not exist or has been deleted on the server. What status code represents this?",
    options: [
      { id: "404", label: "404 Not Found" },
      { id: "410", label: "410 Gone" },
      { id: "400", label: "400 Bad Request" },
      { id: "502", label: "502 Bad Gateway" },
    ],
    correctAnswer: "404",
    explanation:
      "A '404 Not Found' is the classic web status indicating that the server can communicate with the client, but cannot find the requested representation or path resource."
  },
  {
    id: "http-429",
    category: "4xx Client Errors",
    difficulty: "medium",
    question: "A scraping script triggers 1,000 API searches in under 5 seconds. The server's rate-limiting middleware blocks the user's IP. What status code does the middleware issue?",
    options: [
      { id: "429", label: "429 Too Many Requests" },
      { id: "408", label: "408 Request Timeout" },
      { id: "423", label: "423 Locked" },
      { id: "503", label: "503 Service Unavailable" },
    ],
    correctAnswer: "429",
    explanation:
      "A '429 Too Many Requests' is specifically reserved for rate-limiting. It alerts the client that they have saturated their allowed request limit within a specified timeframe and must back off before retrying."
  },
  {
    id: "http-500",
    category: "5xx Server Errors",
    difficulty: "easy",
    question: "A backend database query crashes due to an unhandled syntax exception inside the server code, raising a runtime server failure. What status code is returned to the client?",
    options: [
      { id: "500", label: "500 Internal Server Error" },
      { id: "502", label: "502 Bad Gateway" },
      { id: "503", label: "503 Service Unavailable" },
      { id: "504", label: "504 Gateway Timeout" },
    ],
    correctAnswer: "500",
    explanation:
      "A '500 Internal Server Error' is a generic catch-all server-side error. It indicates that the server encountered an unexpected condition that prevented it from completing the request."
  },
  {
    id: "http-502",
    category: "5xx Server Errors",
    difficulty: "hard",
    question: "A CDN load balancer attempts to proxy requests to an node backend server, but the backend node process is crashed and refuses connection. What status does the load balancer return?",
    options: [
      { id: "500", label: "500 Internal Server Error" },
      { id: "502", label: "502 Bad Gateway" },
      { id: "503", label: "503 Service Unavailable" },
      { id: "504", label: "504 Gateway Timeout" },
    ],
    correctAnswer: "502",
    explanation:
      "A '502 Bad Gateway' indicates that the server, while acting as a gateway or proxy, received an invalid response from the upstream server it accessed in an attempt to fulfill the request (e.g. backend process is down)."
  },
  {
    id: "http-503",
    category: "5xx Server Errors",
    difficulty: "medium",
    question: "A server is down for scheduled maintenance, or is temporarily overloaded and cannot allocate any new connections. What status is returned?",
    options: [
      { id: "500", label: "500 Internal Server Error" },
      { id: "503", label: "503 Service Unavailable" },
      { id: "504", label: "504 Gateway Timeout" },
      { id: "408", label: "408 Request Timeout" },
    ],
    correctAnswer: "503",
    explanation:
      "A '503 Service Unavailable' indicates that the server is temporarily unable to handle the request due to maintenance, off-line status, or temporary overloading. Browsers should retry later."
  }
];
