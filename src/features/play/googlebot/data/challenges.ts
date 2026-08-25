import { SequenceChallenge } from "../../types";

export const googlebotChallenge: SequenceChallenge = {
  id: "googlebot-sequence",
  category: "SEO",
  title: "Googlebot Web Crawler Simulator",
  description: "Map the step-by-step pipeline of search engine spiders. Sequence the crawler traversal lifecycle from parsing domains to final database index listings.",
  difficulty: "medium",
  targetDescription: "DNS Fetch ➔ robots.txt Audit ➔ Download HTML ➔ Extract Links ➔ Database Indexing.",
  correctOrder: ["dns", "robots", "fetch", "parse", "index"],
  steps: [
    {
      id: "dns",
      label: "DNS Server IP Lookup",
      description: "Googlebot queries DNS records to resolve server location IP strings, opening a pathway to the network host.",
    },
    {
      id: "robots",
      label: "robots.txt Permission Audit",
      description: "Crawler fetches and audits robots.txt to ensure the target URL is not disallowed or blocked from crawl queues.",
    },
    {
      id: "fetch",
      label: "Fetch & Download HTML",
      description: "Spiders send an HTTP request, download the document's body bytes (HTML strings), and log response statuses (e.g. 200).",
    },
    {
      id: "parse",
      label: "Extract DOM Link Anchors",
      description: "Spiders parse document tags, resolve absolute link paths, and queue new URLs to continue the crawl path.",
    },
    {
      id: "index",
      label: "Database Indexing Registration",
      description: "Search engines analyze text content, process metadata schemas, compute ranking algorithms, and register pages to index lists.",
    },
  ],
  explanation:
    "Web crawlers like Googlebot navigate the web using a highly optimized queue. Before loading any webpage, spiders resolve DNS ips and verify crawl permissions in the robots.txt folder. If allowed, they fetch the HTML, parse nested link tags to expand their discovery queues, and finally submit index structures to search directories."
};
