export function rupiahFormatter(currency) {
  const formattedNumber = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(currency);

  return formattedNumber;
}
