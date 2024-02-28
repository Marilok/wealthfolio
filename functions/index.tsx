import { Currency } from "@/types";

export const formatMonetaryValue = (number: number, currency: Currency) => {
  return (
    number
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ") +
    " " +
    currency
  );
};

export const formatValue = (number: number) => {
  return number
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const convertNumberToPercentage = (number: number) => {
  return (number * 100).toFixed(0) + " %";
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("cs-CZ");
};

interface apiResponse {
  data: {
    [key: string]: number;
  };
}

export async function convertCurrency(
  from: Currency,
  to: Currency,
  amount: number,
) {
  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${process.env.NEXT_PUBLIC_CURRENCY_API_KEY}&currencies=${to}&base_currency=${from}`;
  const result: apiResponse = await fetch(url).then((res) => res.json());
  return result.data[to] * amount;
}
