import { OptimizerChallenge } from "../../types";

export const cloudChallenge: OptimizerChallenge = {
  id: "cloud-architecture",
  category: "Cloud & Architecture",
  title: "Multi-Region Cloud Architecture Builder",
  description: "Your cloud setup is locked to a single server region, yielding poor availability (90%), slow international connections (380ms), and a low concurrency limit (100k). Re-architect the stack!",
  difficulty: "hard",
  targetDescription: "Maximize availability to 99% or higher, expand user load limits to 1 Million, and cut latency to under 50ms.",
  initialMetrics: {
    availability: 90.0,
    loadHandling: 100000,
    latency: 380,
  },
  targetConditions: {
    availability: { min: 99.0 },
    loadHandling: { min: 1000000 },
    latency: { max: 50 },
  },
  metricFormats: {
    availability: { unit: "%", higherIsBetter: true, label: "System Availability" },
    loadHandling: { unit: " Users", higherIsBetter: true, label: "Concurrency Capacity" },
    latency: { unit: "ms", higherIsBetter: false, label: "Avg Request Latency" },
  },
  actions: [
    {
      id: "alb",
      label: "Provision Multi-AZ Application Load Balancer",
      description: "Distributes incoming traffic across multiple Availability Zones, immediately raising system failover redundancy.",
      impacts: { availability: 5.0, loadHandling: 200000, latency: -20 },
    },
    {
      id: "s3-cloudfront",
      label: "Migrate Static Assets to AWS S3 + CloudFront CDN",
      description: "Offloads all static storage to object buckets and global edge locations, trimming payload latencies.",
      impacts: { availability: 2.5, loadHandling: 400000, latency: -150 },
    },
    {
      id: "multi-az-db",
      label: "Deploy Multi-AZ RDS DB Replicas",
      description: "Creates synchronous replica standby nodes in an alternative AZ with read replicas to handle massive DB query loads.",
      impacts: { availability: 1.5, loadHandling: 250000, latency: -100 },
    },
    {
      id: "elasticache",
      label: "Deploy AWS ElastiCache Cluster",
      description: "Saves high-concurrency database queries inside secure serverless caching nodes to handle intense read loads.",
      impacts: { availability: 0.5, loadHandling: 150000, latency: -80 },
    },
  ],
  explanation:
    "Architecting high-availability infrastructure involves separating static content (S3/CloudFront), load balancing across isolated Availability Zones (ALBs), replicating transactional databases (Multi-AZ RDS), and caching at memory roots (ElastiCache). Combining these modular systems guarantees high fault tolerance and scalable performance."
};
