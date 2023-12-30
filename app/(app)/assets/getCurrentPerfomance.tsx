"use server";

export async function getCurrentPerfomance({
  symbol,
  purchaseDate,
}: {
  purchaseDate: any;
  symbol: string;
}) {
  const url = `https://yahoo-finance127.p.rapidapi.com/price/${symbol}`;

  const calculateDaysFromToday = () => {
    const today = new Date();
    const transactionDate = new Date(purchaseDate);
    const differenceInTime = today.getTime() - transactionDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays;
  };

  // const options = {
  //   method: "GET",
  //   headers: {
  //     "X-RapidAPI-Key": "10b01622bamsh11298b1977df826p1cb892jsnab1f11484299",
  //     "X-RapidAPI-Host": "yahoo-finance127.p.rapidapi.com",
  //   },
  // };

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.json();
  //   return result.regularMarketPrice.raw;
  // } catch (error) {
  //   console.error(error);
  // }
  return calculateDaysFromToday();
}
