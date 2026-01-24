import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrape({
      url,
      formats: ["markdown"],
    });

    if (!result?.markdown) {
      throw new Error("No markdown returned from Firecrawl");
    }

    const markdown = result.markdown;

    // 🔎 VERY BASIC PRICE EXTRACTION (works reliably)
    const priceMatch = markdown.match(/([₹$£€]\s?\d+[.,]?\d*)/);

    if (!priceMatch) {
      throw new Error("Price not found in page");
    }

    const rawPrice = priceMatch[1];

    return {
      productName: markdown.split("\n")[0]?.slice(0, 100) || "Unknown Product",
      currentPrice: rawPrice,
      currencyCode: rawPrice[0],
    };
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}
