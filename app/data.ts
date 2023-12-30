import { Transaction } from "@/types";

  export const transactions: Transaction[] = [
		{ name: 'Alphabet', type: 'SELL', date: '2023-01-01', quantity: 100, unitPrice: 200, fee: 10,  currency: "CZK", accountId: 1, symbol: 'GOOG', id: 1 },
	{ name: 'Alphabet', type: 'BUY', date: '2021-01-01', quantity: 100, unitPrice: 100, fee: 10,  currency: "CZK", accountId: 1, symbol: 'GOOG', id: 2 },
	{ name: 'CEZ', type: 'BUY', date: '2021-01-01', quantity: 100, unitPrice: 100, fee: 10,  currency: "CZK", accountId: 1, symbol: 'CEZ.PR', id: 3 },
	{ name: 'Kofola', type: 'BUY', date: '2021-01-01', quantity: 100, unitPrice: 100, fee: 10,  currency: "CZK", accountId: 1, symbol: 'KOFOL.PR', id: 4 },
		{ name: 'EBAG', type: 'BUY', date: '2021-01-01', quantity: 100, unitPrice: 800, fee: 100,  currency: "CZK", accountId: 1, notes: 'Some note', symbol: 'ERBAG.PR', id: 5 },

  ];

  export const platforms = [
	{ name: 'Fio e-Broker',  id: 1, url: 'https://ebroker.fio.cz/e-broker.cgi', icon: 'http://localhost:3000/images/platforms/fio.svg' },
	{ name: 'Interactive Brokers',  id: 2, url: 'https://www.interactivebrokers.com/en/home.php', icon: 'http://localhost:3000/images/platforms/ibkr.svg' },
  ];

  export const accounts = [
	{ name: 'Fio',  balances: [{currency: "CZK", balance: 1000}, {currency: "EUR", balance: 100}], notes: '10 %', id: 1, platformId: 1, },
	{ name: 'Interactive Brokers',  balances: [{currency: "PLN", balance: 550}], notes: '10 %', id: 2, platformId: 2, },
  ];
