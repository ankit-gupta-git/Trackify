import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  const res = await firecrawl.scrapeUrl(url);

  console.log("RAW FIRECRAWL:", res);

  if (!res || typeof res !== "object") {
    throw new Error("Invalid Firecrawl response");
  }

  return {
    productName: "Test Product",
    currentPrice: "999",
    currencyCode: "INR",
  };
}
