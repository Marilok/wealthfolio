export const formatMonetaryValue = (number: number, currency: string) => {
    return (
      number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + currency
    );
  };