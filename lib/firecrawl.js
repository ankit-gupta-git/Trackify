import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  const result = await firecrawl.scrape({
    url,
    formats: ["markdown"], // ✅ ONLY markdown
  });

  console.log("FIRECRAWL RESULT:", JSON.stringify(result, null, 2));

  const markdown =
    result?.markdown ||
    result?.data?.markdown ||
    result?.content;

  if (!markdown) {
    throw new Error("No markdown returned by Firecrawl");
  }

  const priceMatch = markdown.match(/([₹$£€]\s?\d+[.,]?\d*)/);
  if (!priceMatch) {
    throw new Error("Price not found in markdown");
  }

  return {
    productName: "Test Product",
    currentPrice: priceMatch[1],
    currencyCode: priceMatch[1][0],
  };
}
