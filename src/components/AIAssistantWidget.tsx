import React, { useState, useRef, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../components/ui/select";
import { Loader2, Upload, MessageCircle, Sparkles, User2 } from "lucide-react";
import { toast } from "sonner";

type ChatMsg = { role: "ai" | "user"; content: React.ReactNode; ts: number };

type FormDataType = {
  fullName: string;
  businessName: string;
  productType: string;
  email: string;
  phone: string;
  idDocument: File | null;
  faceVideo: File | null;
  businessRegistration: File | null;
  businessLicense: File | null;
  taxNumber: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  bankStatement: File | null;
  address: string;
  utilityBill: File | null;
  termsAccepted: boolean;
  privacyAccepted: boolean;
};

export default function UnifiedAIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "ai", content: "Hi 👋 I am Lela, your AI assistant. I can help you buy or sell on our website!", ts: Date.now() }
  ]);
  const [typing, setTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [mode, setMode] = useState<"general" | "seller">("general");
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "", businessName: "", productType: "", email: "", phone: "", idDocument: null,
    faceVideo: null, businessRegistration: null, businessLicense: null, taxNumber: "",
    bankName: "", accountNumber: "", accountHolderName: "", bankStatement: null, address: "",
    utilityBill: null, termsAccepted: false, privacyAccepted: false
  });

  const listRef = useRef<HTMLDivElement>(null);

  const sellerSteps = [
    { key: "fullName", prompt: "Hi! What’s your full name?", type: "text" },
    { key: "businessName", prompt: "What is your business name?", type: "text" },
    { key: "productType", prompt: "Select your product type.", type: "select", options: ["Handmade", "Food", "Fashion", "Beauty", "Other"] },
    { key: "email", prompt: "Your email?", type: "text" },
    { key: "phone", prompt: "Your phone number?", type: "text" },
    { key: "idDocument", prompt: "Please upload your ID document.", type: "file" },
    { key: "faceVideo", prompt: "Upload a short face verification video.", type: "file" },
    { key: "businessRegistration", prompt: "Upload your business registration document.", type: "file" },
    { key: "businessLicense", prompt: "Upload your business license.", type: "file" },
    { key: "taxNumber", prompt: "Enter your tax number.", type: "text" },
    { key: "bankName", prompt: "Your bank name?", type: "text" },
    { key: "accountNumber", prompt: "Account number?", type: "text" },
    { key: "accountHolderName", prompt: "Account holder name?", type: "text" },
    { key: "bankStatement", prompt: "Upload your bank statement.", type: "file" },
    { key: "address", prompt: "Business address?", type: "text" },
    { key: "utilityBill", prompt: "Upload a utility bill or proof of address.", type: "file" },
    { key: "termsAccepted", prompt: "Do you accept Terms & Privacy Policy?", type: "checkbox" },
  ];

  const scrollToBottom = () => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages, typing]);

  const handleInput = (key: string, value: any) => setFormData(prev => ({ ...prev, [key]: value }));

  const handleFileUpload = (key: string, file: File) => {
    handleInput(key, file);
    setMessages(prev => [...prev, { role: "user", content: <span className="flex items-center gap-1"><Upload className="h-4 w-4" /> {file.name}</span>, ts: Date.now() }]);
    toast.success(`${file.name} uploaded`);
    setTimeout(() => setCurrentStep(prev => prev + 1), 300);
  };

  const sendSellerStepPrompt = () => {
    if (currentStep >= sellerSteps.length) {
      setTyping(false);
      setMessages(prev => [...prev, { role: "ai", content: "All done! Your seller verification is submitted ✅", ts: Date.now() }]);
      return;
    }
    const step = sellerSteps[currentStep];
    setTyping(true);
    setTimeout(() => { setMessages(prev => [...prev, { role: "ai", content: step.prompt, ts: Date.now() }]); setTyping(false); }, 800 + Math.random() * 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "seller") {
      const step = sellerSteps[currentStep];
      if (!inputValue) return;
      handleInput(step.key, inputValue);
      setMessages(prev => [...prev, { role: "user", content: inputValue, ts: Date.now() }]);
      setInputValue("");
      setTimeout(() => setCurrentStep(prev => prev + 1), 300);
      return;
    }
    // General mode: simple AI responses
    const userText = inputValue.trim();
    if (!userText) return;
    setMessages(prev => [...prev, { role: "user", content: userText, ts: Date.now() }]);
    setInputValue("");
    setTyping(true);
    setTimeout(() => {
      let reply: React.ReactNode = "I am still learning. Could you rephrase that?";
      const lower = userText.toLowerCase();
      if (/(hi|hello|hey|selam)/.test(lower)) reply = "Hello 👋 I’m Lela, your assistant. Do you want to buy or sell today?";
      else if (/sell|register as seller|i want to sell/.test(lower)) {
        reply = "Great! Let's get you set up as a seller. Please provide your details step by step.";
        setMode("seller");
        setCurrentStep(0);
      }
      else if (/buy|how to buy|sign in|browse|track/.test(lower)) reply = "To buy, first create an account or sign in, then browse products, add to cart, and checkout. I can guide you step by step if you like.";
      else if (/thanks|thank you|amesegenallo/.test(lower)) reply = "You’re welcome! 😊";

      setMessages(prev => [...prev, { role: "ai", content: reply, ts: Date.now() }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  const renderInputForStep = () => {
    if (mode !== "seller" || currentStep >= sellerSteps.length) return (
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <Input placeholder="Type here..." value={inputValue} onChange={e => setInputValue(e.target.value)} className="flex-1" />
        <Button type="submit">Send</Button>
      </form>
    );

    const step = sellerSteps[currentStep];
    if (step.type === "file") return null;
    if (step.type === "checkbox") {
      return (
        <div className="flex items-center gap-2">
          <Checkbox checked={formData.termsAccepted && formData.privacyAccepted} onCheckedChange={v => { handleInput("termsAccepted", v); handleInput("privacyAccepted", v); }} />
          <span className="text-sm">I accept Terms & Privacy Policy</span>
          <Button onClick={() => setCurrentStep(prev => prev + 1)}>Submit</Button>
        </div>
      );
    }
    if (step.type === "select") {
      return (
        <Select value={formData[step.key as keyof FormDataType] as string} onValueChange={v => handleInput(step.key, v)}>
          <SelectTrigger className="w-full"><SelectValue placeholder="Select..." /></SelectTrigger>
          <SelectContent>{step.options?.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}</SelectContent>
        </Select>
      );
    }
    return (
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <Input placeholder="Type here..." value={inputValue} onChange={e => setInputValue(e.target.value)} className="flex-1" />
        <Button type="submit">Send</Button>
      </form>
    );
  };

  return (
    <>
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 z-50"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}

      {open && (
        <div className="fixed bottom-4 right-4 w-96 z-50">
          <div className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col">
            <div className="p-3 border-b font-semibold bg-rose-50 flex justify-between items-center">
              Lela AI Assistant
              <button onClick={() => setOpen(false)} className="text-rose-600 font-bold">✕</button>
            </div>

            <div ref={listRef} className="h-96 overflow-y-auto p-3 space-y-2 flex flex-col">
              {messages.map(m => (
                <div key={m.ts} className={`flex ${m.role === "ai" ? "justify-start" : "justify-end"}`}>
                  <div className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm shadow ${m.role === "ai" ? "bg-rose-50 text-rose-900 border border-rose-100" : "bg-amber-500 text-white"}`}>
                    {m.content}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="rounded-2xl px-3 py-2 text-sm bg-rose-50 text-rose-700 border border-rose-100 shadow inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    typing…
                  </div>
                </div>
              )}
            </div>

            <div className="p-3 border-t">{renderInputForStep()}</div>

            {mode === "seller" && currentStep < sellerSteps.length && sellerSteps[currentStep].type === "file" && (
              <div className="p-3 border-t flex flex-col gap-2">
                <input type="file" onChange={e => e.target.files?.[0] && handleFileUpload(sellerSteps[currentStep].key, e.target.files[0])} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
