// src/App.tsx
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { RewardsProvider } from "./context/RewardsContext";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import About from "./pages/About";
import Contact from "./pages/Contact";
import TikTokIntegration from "./pages/TikTokIntegration";
import Logistics from "./pages/Logistics";
import LogisticsLogin from "./pages/LogisticsLogin";
import TelegramBot from "./pages/TelegramBot";
import SellerDashboard from "./pages/SellerDashboard";
import SellerVerification from "./pages/SellerVerification";
import AddProduct from "./pages/AddProduct";
import BrowseSellers from "./pages/BrowseSellers";
import SellerProfile from "./pages/SellerProfile";
import ProductDetail from "./pages/ProductDetail";
import PaymentSystem from "./pages/PaymentSystem";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminVerification from "./pages/AdminVerification";
import AdminOrders from "./pages/AdminOrders";
import LogisticsDashboard from "./pages/LogisticsDashboard";
import NotFound from "./pages/NotFound";

import AIAssistantWidget from "./components/AIAssistantWidget"; // ✅ correct import

const queryClient = new QueryClient();
const userId = "u_1"; // TODO replace when authentication ready

const App = () => (
  <RewardsProvider userId={userId}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logistics" element={<Logistics />} />
            <Route path="/logs" element={<LogisticsLogin />} />
            <Route path="/telegram-bot" element={<TelegramBot />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/seller-verification" element={<SellerVerification />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/browse-sellers" element={<BrowseSellers />} />
            <Route path="/seller-profile/:id" element={<SellerProfile />} />
            <Route path="/product-detail/:id" element={<ProductDetail />} />
            <Route path="/buyer-dashboard/tiktok" element={<TikTokIntegration />} />
            <Route
              path="/payment/:id"
              element={
                <PaymentSystem
                  userId={userId}
                  open={true}
                  onClose={() => {}}
                  priceBirr={0}
                  productName=""
                />
              }
            />
            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-verification" element={<AdminVerification />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            <Route path="/logistics-dashboard" element={<LogisticsDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {/* ✅ Floating AI Widget always visible on every page */}
          <AIAssistantWidget side="right" offset={{ bottom: 24, right: 20 }} zIndex={60} />

        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </RewardsProvider>
);

export default App;
