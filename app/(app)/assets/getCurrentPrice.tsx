"use server";

export async function getCurrentPrice({ symbol }: { symbol: string }) {
  const url = `https://yahoo-finance127.p.rapidapi.com/price/${symbol}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    return result.regularMarketPrice.raw;
  } catch (error) {
    console.error(error);
  }
}
