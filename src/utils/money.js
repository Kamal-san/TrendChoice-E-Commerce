export function formatMoney(amountRupees)
{
   return ` ₹${(amountRupees*0.25).toFixed(2)}`
}