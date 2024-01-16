export const calculateAveragePrice = (
  existingQuantity: number,
  existingPrice: number,
  newQuantity: number,
  newPrice: number,
) => {
  return (
    (existingQuantity * existingPrice + newQuantity * newPrice) /
    (existingQuantity + newQuantity)
  );
};
