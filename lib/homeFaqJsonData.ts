import rawHomeFaqData from "@/lib/homFaqData.json";

export type HomeFaqJsonAnswer = {
  para?: string[];
  points?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  para_additional?: string[];
  cta?: string;
  [key: string]: unknown;
};

export type HomeFaqJsonFaq = {
  question: string;
  answer: HomeFaqJsonAnswer;
};

export type HomeFaqJsonBrand = {
  brand: string;
  faqs: HomeFaqJsonFaq[];
};

export type HomeFaqJsonCluster = {
  cluster: string;
  module: string;
  brands: HomeFaqJsonBrand[];
};

export const homeFaqJsonClusters = rawHomeFaqData as HomeFaqJsonCluster[];

export function getClusterLabel(clusterName: string) {
  return clusterName.replace(/^CLUSTER\s+\d+\s+[—-]\s+/, "");
}

export function getClusterId(clusterName: string) {
  return getClusterLabel(clusterName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBrandId(brand: string) {
  return brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function buildSearchText(answer: HomeFaqJsonAnswer) {
  const parts: string[] = [];

  if (answer.para) parts.push(...answer.para);
  if (answer.points) parts.push(...answer.points);
  if (answer.table) {
    parts.push(...answer.table.headers);
    answer.table.rows.forEach((row) => parts.push(...row));
  }
  if (answer.para_additional) parts.push(...answer.para_additional);
  if (typeof answer.cta === "string") parts.push(answer.cta);

  return parts.join(" ").toLowerCase();
}

export function buildQuestionSearchText(question: string, answer: HomeFaqJsonAnswer) {
  return `${question} ${buildSearchText(answer)}`.toLowerCase();
}
