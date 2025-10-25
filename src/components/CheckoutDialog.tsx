// import { useState } from "react";
// // Update the import path to the correct location of RewardsContext
// import { useRewards } from "../context/RewardsContext";
// import { toast, Toaster } from "sonner"; // or your shadcn wrapper

// type Props = {
//   userId: string;
//   open: boolean;
//   onClose: () => void;
//   priceBirr: number;
//   productName: string;
// };

// export default function CheckoutDialog({ userId, open, onClose, priceBirr, productName }: Props) {
//   const { purchaseAndAward } = useRewards();
//   const [referral, setReferral] = useState("");
//   const [isBusy, setBusy] = useState(false);
//   if (!open) return null;

//   async function handlePay() {
//     setBusy(true);
//     const orderId = `ord_${Date.now()}`;
//     try {
//       const { earned, buyerBonus } = await purchaseAndAward({
//         userId,
//         orderId,
//         orderTotalBirr: priceBirr,
//         referralCode: referral ? referral : undefined,
//       });
//       toast.success(
//         `Payment successful · +${earned} pts${buyerBonus ? ` (+${buyerBonus} referral bonus)` : ""}`
//       );
//       onClose();
//     } catch (e:any) {
//       toast.error(`${e?.message || "Payment failed"}`);
//     } finally {
//       setBusy(false);
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
//       <Toaster richColors position="top-right" />
//       <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//         <h3 className="text-lg font-semibold text-rose-700">Checkout</h3>
//         <p className="mt-1 text-sm text-stone-600">{productName}</p>

//         <div className="mt-4 rounded-xl border p-4">
//           <div className="flex items-center justify-between">
//             <span>Total</span>
//             <strong>Br {priceBirr.toLocaleString()}</strong>
//           </div>

//           <div className="mt-4">
//             <label className="block text-sm font-medium text-stone-700">Referral code (optional)</label>
//             <input
//               value={referral}
//               onChange={(e) => setReferral(e.target.value)}
//               placeholder="e.g., SELAM100"
//               className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-300"
//             />
//             <p className="mt-1 text-xs text-stone-500">
//               First time using a valid code? You’ll get a bonus.
//             </p>
//           </div>
//         </div>

//         <div className="mt-6 flex items-center justify-end gap-2">
//           <button className="rounded-xl border px-4 py-2 hover:bg-stone-50" onClick={onClose} disabled={isBusy}>
//             Cancel
//           </button>
//           <button
//             className="rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 disabled:opacity-60"
//             onClick={handlePay}
//             disabled={isBusy}
//           >
//             {isBusy ? "Processing…" : "Pay"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// src/components/CheckoutDialog.tsx
import { useState, useMemo } from "react";
import { useRewards } from "../context/RewardsContext";
import { toast, Toaster } from "sonner";

// Demo allow-list of coupons (case-insensitive)
const allowedCoupons: Record<
  string,
  { type: "percent" | "fixed"; value: number; label: string; maxDiscount?: number }
> = {
  WELCOME10: { type: "percent", value: 10, label: "10% off (new users)" },
  FREESHIP: { type: "fixed", value: 50, label: "Br 50 off" },
  BIGSAVE20: { type: "percent", value: 20, label: "20% off", maxDiscount: 500 }, // cap optional
};

type Props = {
  userId: string;
  open: boolean;
  onClose: () => void;
  priceBirr: number;
  productName: string;
};

export default function CheckoutDialog({ userId, open, onClose, priceBirr, productName }: Props) {
  const { purchaseAndAward } = useRewards();

  const [referral, setReferral] = useState("");
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponErr, setCouponErr] = useState<string | null>(null);

  const [isBusy, setBusy] = useState(false);

  if (!open) return null;

  // --- Discount calculation
  const discountBirr = useMemo(() => {
    if (!appliedCoupon) return 0;
    const key = appliedCoupon.toUpperCase();
    const c = allowedCoupons[key];
    if (!c) return 0;

    if (c.type === "fixed") {
      return Math.min(priceBirr, Math.max(0, Math.floor(c.value)));
    } else {
      // percent
      const raw = Math.floor((priceBirr * c.value) / 100);
      const capped = typeof c.maxDiscount === "number" ? Math.min(raw, c.maxDiscount) : raw;
      return Math.min(priceBirr, Math.max(0, capped));
    }
  }, [appliedCoupon, priceBirr]);

  const totalBirr = useMemo(() => Math.max(0, priceBirr - discountBirr), [priceBirr, discountBirr]);

  function applyCoupon() {
    setCouponErr(null);
    const code = (couponInput || "").trim().toUpperCase();
    if (!code) {
      setCouponErr("Enter a coupon code.");
      return;
    }
    if (!allowedCoupons[code]) {
      setCouponErr("Invalid coupon code.");
      return;
    }
    setAppliedCoupon(code);
    toast.info(`Coupon applied: ${allowedCoupons[code].label}`);
  }

  function clearCoupon() {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponErr(null);
  }

  async function handlePay() {
    setBusy(true);
    const orderId = `ord_${Date.now()}`;

    try {
      const { earned, buyerBonus } = await purchaseAndAward({
        userId,
        orderId,
        orderTotalBirr: totalBirr,          // <- charge after discount
        referralCode: referral ? referral : undefined // <- still honors referral bonus
      });

      const savingsText = discountBirr ? `(saved Br ${discountBirr.toLocaleString()})` : "";
      toast.success(
        `Payment successful${savingsText} · +${earned} pts${buyerBonus ? ` (+${buyerBonus} referral bonus)` : ""}`
      );
      onClose();
    } catch (e: any) {
      toast.error(e?.message || "Payment failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h3 className="text-lg font-semibold text-rose-700">Checkout</h3>
        <p className="mt-1 text-sm text-stone-600">{productName}</p>

        {/* Price box */}
        <div className="mt-4 rounded-xl border p-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>Br {priceBirr.toLocaleString()}</span>
          </div>

          {discountBirr > 0 && (
            <div className="flex items-center justify-between text-sm text-emerald-700">
              <span>Coupon discount{appliedCoupon ? ` (${appliedCoupon})` : ""}</span>
              <span>- Br {discountBirr.toLocaleString()}</span>
            </div>
          )}

          <hr className="border-stone-200" />

          <div className="flex items-center justify-between text-base font-semibold">
            <span>Total</span>
            <span>Br {totalBirr.toLocaleString()}</span>
          </div>
        </div>

        {/* Referral + Coupon inputs */}
        <div className="mt-4 grid gap-4">
          {/* Referral code */}
          <div>
            <label className="block text-sm font-medium text-stone-700">Referral code (optional)</label>
            <input
              value={referral}
              onChange={(e) => setReferral(e.target.value)}
              placeholder="e.g., SELAM100"
              className="mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-300"
            />
            <p className="mt-1 text-xs text-stone-500">
              First time using a valid code? You’ll get a bonus.
            </p>
          </div>

          {/* Coupon code */}
          <div>
            <label className="block text-sm font-medium text-stone-700">Coupon code (optional)</label>
            <div className="mt-1 flex gap-2">
              <input
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="WELCOME10 / FREESHIP"
                className="flex-1 rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-amber-300"
              />
              {appliedCoupon ? (
                <button
                  type="button"
                  className="rounded-xl border px-3 py-2 hover:bg-stone-50"
                  onClick={clearCoupon}
                  disabled={isBusy}
                >
                  Remove
                </button>
              ) : (
                <button
                  type="button"
                  className="rounded-xl bg-amber-500 px-3 py-2 text-white hover:bg-amber-600 disabled:opacity-60"
                  onClick={applyCoupon}
                  disabled={isBusy}
                >
                  Apply
                </button>
              )}
            </div>
            {couponErr && (
              <div className="mt-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-rose-700 text-sm">
                {couponErr}
              </div>
            )}
            {appliedCoupon && (
              <p className="mt-1 text-xs text-emerald-700">
                Applied: {allowedCoupons[appliedCoupon]?.label}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-2">
          <button className="rounded-xl border px-4 py-2 hover:bg-stone-50" onClick={onClose} disabled={isBusy}>
            Cancel
          </button>
          <button
            className="rounded-xl bg-amber-500 px-4 py-2 text-white hover:bg-amber-600 disabled:opacity-60"
            onClick={handlePay}
            disabled={isBusy}
          >
            {isBusy ? "Processing…" : "Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}