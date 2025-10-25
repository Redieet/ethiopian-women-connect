import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getWallet, setWallet, pushLedger, uid, calcEarnedPoints,
  findUserByReferralCode, REWARD_RULES,
  hasUsedReferral, markReferralUsedBy, ensureDemoUsers,
  type RewardsWallet
} from "../lib/rewards";

type PurchaseInput = {
  userId: string;
  orderId?: string;
  orderTotalBirr: number;
  referralCode?: string;
};

type RewardsContextType = {
  wallet: RewardsWallet;
  refresh: (userId: string) => void;
  purchaseAndAward: (input: PurchaseInput) => Promise<{ earned: number; buyerBonus: number; referrerBonus: number }>;
};

const RewardsContext = createContext<RewardsContextType | null>(null);
export const useRewards = () => {
  const ctx = useContext(RewardsContext);
  if (!ctx) throw new Error("useRewards must be used within RewardsProvider");
  return ctx;
};

export function RewardsProvider({ userId, children }: { userId: string; children: React.ReactNode }) {
  const [wallet, setW] = useState<RewardsWallet>(() => getWallet(userId));

  useEffect(() => {
    ensureDemoUsers();
    setW(getWallet(userId));
  }, [userId]);

  function refresh(uid: string) { setW(getWallet(uid)); }

  async function purchaseAndAward({ userId, orderId, orderTotalBirr, referralCode }: PurchaseInput) {
    await new Promise(r => setTimeout(r, 800)); // demo delay

    const base = calcEarnedPoints(orderTotalBirr);
    let buyerBonus = 0, referrerBonus = 0;

    const codeOwner = referralCode ? findUserByReferralCode(referralCode) : null;
    const firstTime = referralCode && !hasUsedReferral(userId);

    if (codeOwner && firstTime) {
      buyerBonus = REWARD_RULES.buyerReferralBonus;
      referrerBonus = REWARD_RULES.referrerBonus;
      markReferralUsedBy(userId);

      const rw = getWallet(codeOwner.userId);
      setWallet({ ...rw, balance: rw.balance + referrerBonus });
      pushLedger({ id: uid(), userId: codeOwner.userId, delta: referrerBonus, reason: "referral-referrer-bonus", orderId, at: new Date().toISOString() });
    }

    const w = getWallet(userId);
    const newBalance = w.balance + base + buyerBonus;
    const nw = { ...w, balance: newBalance };
    setWallet(nw);
    pushLedger({ id: uid(), userId, delta: base, reason: "purchase", orderId, at: new Date().toISOString() });
    if (buyerBonus) pushLedger({ id: uid(), userId, delta: buyerBonus, reason: "referral-buyer-bonus", orderId, at: new Date().toISOString() });

    setW(nw);
    return { earned: base, buyerBonus, referrerBonus };
  }

  return (
    <RewardsContext.Provider value={{ wallet, refresh, purchaseAndAward }}>
      {children}
    </RewardsContext.Provider>
  );
}