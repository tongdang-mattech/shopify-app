export default function calculatePrice(prices, discount){
    const materialPrice = Number(prices.material)
    const formatPrice = Number(prices.format)
    const discountValue = Number(discount)
  
    if (isNaN(materialPrice) || isNaN(formatPrice) || isNaN(discountValue)) {
      return 0
    }
  
    const totalPrice = ((materialPrice + formatPrice) * (1 - discountValue)).toFixed(2)
    return totalPrice
  }