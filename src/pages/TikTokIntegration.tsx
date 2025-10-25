import React, { useEffect, useMemo, useState } from "react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Loader2, RefreshCw, Sparkles, Heart, Film, Link as LinkIcon } from "lucide-react";
import { cn } from "../lib/utils";

/* Dummy “TikTok collection” tags and simulated recommendations */
const sampleTikTokData = [
  { tag: "handmade", recs: ["Handmade Bag", "Leather Purse", "Beaded Bracelet"] },
  { tag: "dress", recs: ["Traditional Dress", "Cultural Scarf", "Handwoven Shawl"] },
  { tag: "accessory", recs: ["Necklace", "Anklet", "Earrings"] },
] as const;

type TikTag = (typeof sampleTikTokData)[number]["tag"];

const imageCatalog: Record<string, { img: string; base: number }> = {
  "Handmade Bag": { img: "/assets/handmade-bag.jpg", base: 1200 },
  "Leather Purse": { img: "/assets/leather-purse.jpg", base: 1450 },
  "Beaded Bracelet": { img: "/assets/beaded-bracelet.jpg", base: 450 },
  "Traditional Dress": { img: "/assets/traditional-dress.jpg", base: 2100 },
  "Cultural Scarf": { img: "/assets/cultural-scarf.jpg", base: 950 },
  "Handwoven Shawl": { img: "/assets/handwoven-shawl.jpg", base: 1300 },
  Necklace: { img: "/assets/necklace.jpg", base: 850 },
  Anklet: { img: "/assets/anklet.jpg", base: 520 },
  Earrings: { img: "/assets/earrings.jpg", base: 780 },
};

const fallback = (name: string) =>
  `https://picsum.photos/seed/${encodeURIComponent(name)}/600/400`;

function birr(n: number) {
  return `${n.toLocaleString()} ETB`;
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type RecItem = { name: string; price: number; img: string };

export default function TikTokIntegration() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [activeTag, setActiveTag] = useState<TikTag | null>(null);
  const [recs, setRecs] = useState<RecItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 20);
    return () => clearTimeout(t);
  }, []);

  function simulateAnalyze() {
    setIsConnecting(true);
    setRecs([]);
    setActiveTag(null);

    const delay = randInt(3000, 4000);

    setTimeout(() => {
      const pick = sampleTikTokData[randInt(0, sampleTikTokData.length - 1)];
      setActiveTag(pick.tag);

      const items: RecItem[] = pick.recs.map((name) => {
        const cat = imageCatalog[name];
        const price = (cat?.base ?? randInt(500, 2500)) + randInt(-100, 180);
        const img = cat?.img ?? fallback(name);
        return { name, price: Math.max(150, price), img };
      });

      setRecs(items);
      setIsConnecting(false);
    }, delay);
  }

  function refresh() {
    if (!isConnecting) simulateAnalyze();
  }

  const headingText = useMemo(() => {
    if (isConnecting) return "Analyzing your saved TikToks… please wait";
    if (recs.length) return "Based on your TikTok saves";
    return "Connect your TikTok Collection";
  }, [isConnecting, recs.length]);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8 py-8">
      {/* Header */}
      <div
        className={cn(
          "rounded-2xl border p-6 sm:p-8 mb-8 shadow-sm",
          "bg-gradient-to-br from-rose-50 via-pink-50 to-amber-50"
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-rose-700 tracking-tight">
              TikTok Collection Integration
            </h1>
            <p className="mt-1 text-sm sm:text-base text-stone-600">
              A demo of AI surfacing products inspired by your saved TikToks.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={simulateAnalyze}
              disabled={isConnecting}
              className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white shadow"
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting…
                </>
              ) : (
                <>
                  <LinkIcon className="mr-2 h-4 w-4" />
                  Connect TikTok Collection
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={refresh}
              disabled={isConnecting}
              className="rounded-xl border-amber-300 hover:bg-amber-50"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Get New Recommendations
            </Button>
          </div>
        </div>

        {/* Status row */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-white/80 text-rose-700 border border-rose-200 rounded-lg"
          >
            <Film className="mr-1 h-3.5 w-3.5" />
            TikTok (simulated)
          </Badge>
          {activeTag && (
            <Badge className="bg-rose-100 text-rose-800 border border-rose-200 rounded-lg">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              interest: {activeTag}
            </Badge>
          )}
          {recs.length > 0 && (
            <Badge className="bg-amber-100 text-amber-800 border border-amber-200 rounded-lg">
              {recs.length} matches
            </Badge>
          )}
        </div>
      </div>

      {/* Body */}
      <div className={cn("transition-opacity duration-500", mounted ? "opacity-100" : "opacity-0")}>
        {isConnecting && (
          <Card className="p-8 rounded-2xl border-2 border-rose-100 bg-white shadow-sm">
            <div className="flex flex-col items-center text-center">
              <Loader2 className="h-8 w-8 animate-spin text-rose-600" />
              <p className="mt-3 text-lg font-medium text-rose-700">{headingText}</p>
              <p className="text-sm text-stone-600 mt-1">
                We are scanning your collection folder to understand your style preferences.
              </p>
            </div>
          </Card>
        )}

        {!isConnecting && recs.length === 0 && (
          <Card className="p-8 rounded-2xl border-2 border-amber-100 bg-white shadow-sm text-center">
            <Heart className="mx-auto h-10 w-10 text-amber-500" />
            <h2 className="mt-3 text-xl font-semibold text-rose-700">{headingText}</h2>
            <p className="mt-1 text-stone-600">
              Click Connect TikTok Collection to see AI-curated products.
            </p>
          </Card>
        )}

        {!isConnecting && recs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-semibold text-rose-700">{headingText}</h3>
              <Button
                variant="ghost"
                onClick={refresh}
                className="text-amber-700 hover:text-amber-800 hover:bg-amber-50 rounded-xl"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                New Set
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {recs.map((item, idx) => (
                <RecommendationCard key={item.name} item={item} delay={100 + idx * 80} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RecommendationCard({ item, delay = 0 }: { item: RecItem; delay?: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border-2 border-rose-100 bg-white shadow-sm",
        "transform transition duration-500",
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-rose-50">
        <img
          src={item.img}
          alt={item.name}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = fallback(item.name);
          }}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-base font-semibold text-stone-800">{item.name}</h4>
            <p className="text-sm text-rose-700 font-medium mt-0.5">{birr(item.price)}</p>
          </div>
          <Badge className="rounded-lg bg-amber-100 text-amber-800 border border-amber-200">
            AI pick
          </Badge>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button className="rounded-xl bg-amber-500 hover:bg-amber-600 text-white">
            View Product
          </Button>
          <Button variant="outline" className="rounded-xl border-rose-200 hover:bg-rose-50">
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  );
}
