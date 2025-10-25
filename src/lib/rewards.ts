// Simple, centralized rules for points & referral bonuses
export const REWARD_RULES = {
  birrPerPoint: 50,          // 1 point per 50 Birr
  buyerReferralBonus: 100,   // first-time code usage
  referrerBonus: 200,        // awarded to the code owner
};

export function calcEarnedPoints(orderTotalBirr: number): number {
  const { birrPerPoint } = REWARD_RULES;
  return Math.max(0, Math.floor(orderTotalBirr / birrPerPoint));
}

// --- Demo in-memory/localStorage store keys
export const LS_KEYS = {
  wallet: "rewards.wallet",           // { userId: string, balance: number }
  ledger: "rewards.ledger",           // array of ledger entries
  referrals: "rewards.referrals",     // { usedByUserId: string[] } keyed by ref code owner or map
  firstUse: "rewards.firstUse",       // map of userId => boolean (has used referral before)
  users: "rewards.users",             // minimal user directory with referralCode
};

// Types
export type RewardsWallet = { userId: string; balance: number };
export type LedgerEntry = {
  id: string;
  userId: string;
  delta: number;
  reason: string; // "purchase", "referral-buyer-bonus", "referral-referrer-bonus"
  orderId?: string;
  at: string;
};
export type MinimalUser = { userId: string; email: string; referralCode: string };

// Helpers
export const uid = () => Math.random().toString(36).slice(2, 10);

function load<T>(key: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key) || "") as T; } catch { return fallback; }
}
function save<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }

// Minimal user directory demo (seed once if empty)
export function ensureDemoUsers() {
  const users = load<Record<string, MinimalUser>>(LS_KEYS.users, {});
  if (Object.keys(users).length === 0) {
    const demo: Record<string, MinimalUser> = {
      "u_1": { userId: "u_1", email: "selam@example.com", referralCode: "SELAM100" },
      "u_2": { userId: "u_2", email: "abay@example.com",  referralCode: "ABAY200"  },
      "u_3": { userId: "u_3", email: "sky@example.com",   referralCode: "SKY300"   },
    };
    save(LS_KEYS.users, demo);
  }
}

export function findUserByReferralCode(code: string): MinimalUser | null {
  const users = load<Record<string, MinimalUser>>(LS_KEYS.users, {});
  const normalized = (code || "").trim().toUpperCase();
  const match = Object.values(users).find(u => u.referralCode.toUpperCase() === normalized);
  return match || null;
}

export function getWallet(userId: string): RewardsWallet {
  const w = load<RewardsWallet | null>(LS_KEYS.wallet, null);
  if (!w || w.userId !== userId) {
    const nw = { userId, balance: 0 };
    save(LS_KEYS.wallet, nw);
    return nw;
  }
  return w;
}
export function setWallet(wallet: RewardsWallet) { save(LS_KEYS.wallet, wallet); }

export function pushLedger(e: LedgerEntry) {
  const arr = load<LedgerEntry[]>(LS_KEYS.ledger, []);
  arr.push(e);
  save(LS_KEYS.ledger, arr);
}

export function markReferralUsedBy(userId: string) {
  const firstUse = load<Record<string, boolean>>(LS_KEYS.firstUse, {});
  if (!firstUse[userId]) {
    firstUse[userId] = true;
    save(LS_KEYS.firstUse, firstUse);
  }
}
export function hasUsedReferral(userId: string) {
  const firstUse = load<Record<string, boolean>>(LS_KEYS.firstUse, {});
  return !!firstUse[userId];
}