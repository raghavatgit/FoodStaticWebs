/**
 * Tiered Promotional Discount Engine
 * Calculates order subtotal, volume discounts, and coupon code reductions.
 */

export class DiscountCalculator {
  static calculate(subtotal, couponCode = "") {
    let discountAmount = 0;
    let couponDiscount = 0;

    // Tier 1: Volume discount for orders over 50
    if (subtotal >= 100) {
      discountAmount = subtotal * 0.15; // 15% discount
    } else if (subtotal >= 50) {
      discountAmount = subtotal * 0.10; // 10% discount
    }

    // Coupon verification
    const normalizedCoupon = couponCode.trim().toUpperCase();
    if (normalizedCoupon === "WELCOME20") {
      couponDiscount = (subtotal - discountAmount) * 0.20;
    } else if (normalizedCoupon === "FESTIVE10") {
      couponDiscount = 10.0;
    }

    const totalDiscount = Math.min(subtotal, discountAmount + couponDiscount);
    const finalTotal = Math.max(0, subtotal - totalDiscount);

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      volumeDiscount: Math.round(discountAmount * 100) / 100,
      couponDiscount: Math.round(couponDiscount * 100) / 100,
      totalDiscount: Math.round(totalDiscount * 100) / 100,
      finalTotal: Math.round(finalTotal * 100) / 100,
    };
  }
}
