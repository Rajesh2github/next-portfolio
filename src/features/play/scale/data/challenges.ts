import { OptimizerChallenge } from "../../types";

export const scaleChallenge: OptimizerChallenge = {
  id: "scale-architecture",
  category: "Cloud & Architecture",
  title: "Application Scaling Simulator",
  description: "A sudden traffic surge from a viral post is crashing your single-node backend. Response latency is a sluggish 450ms and the database is locked up. Scale the system within a $100/mo budget!",
  difficulty: "hard",
  targetDescription: "Minimize latency to under 75ms and expand throughput to over 5,000 req/s within a $100 monthly budget.",
  initialMetrics: {
    latency: 450,
    throughput: 500,
    cost: 20,
  },
  targetConditions: {
    latency: { max: 75 },
    throughput: { min: 5000 },
    cost: { max: 100 },
  },
  metricFormats: {
    latency: { unit: "ms", higherIsBetter: false, label: "Server Latency" },
    throughput: { unit: " req/s", higherIsBetter: true, label: "System Throughput" },
    cost: { unit: "/mo", higherIsBetter: false, label: "Monthly Cloud Cost" },
  },
  actions: [
    {
      id: "cdn-static",
      label: "Deploy Global Edge CDN",
      description: "Caches and serves images, scripts, and static HTML from global edge locations, offloading 70% of static traffic.",
      impacts: { latency: -180, throughput: 2500, cost: 15 },
    },
    {
      id: "load-balancer",
      label: "Add Load Balancer + 2 Server Nodes",
      description: "Deploys a round-robin Load Balancer with 2 additional virtual app server replicas to distribute compute demands.",
      impacts: { latency: -100, throughput: 1200, cost: 30 },
    },
    {
      id: "redis-cache",
      label: "Deploy Redis Database Cache",
      description: "Speeds up expensive database reads by caching key-value query results inside a lightning-fast memory layer.",
      impacts: { latency: -120, throughput: 1800, cost: 10 },
    },
    {
      id: "rabbitmq-queue",
      label: "Provision RabbitMQ Message Queue",
      description: "Decouples heavy email notification dispatches and reporting tasks, handling them asynchronously in the background.",
      impacts: { latency: -30, throughput: 600, cost: 15 },
    },
  ],
  explanation:
    "Scaling an application to manage millions of requests within a strict budget demands targeted architectural enhancements. Notice that caching (Redis) and static edge offloading (CDN) are highly cost-effective, providing massive drops in latency and increases in throughput for a fraction of the cost of raw server scaling!"
};
