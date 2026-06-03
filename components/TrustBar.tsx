import React from "react";
import { Truck, Globe, Clock, RotateCcw } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Truck,
    title: "Free US Shipping",
    subtitle: "On every order, no minimum",
  },
  {
    icon: Globe,
    title: "Free International Shipping",
    subtitle: "Delivered to 35+ countries",
  },
  {
    icon: Clock,
    title: "Ships in 2–5 Days",
    subtitle: "Made to order, fresh every time",
  },
  {
    icon: RotateCcw,
    title: "30-Day Guarantee",
    subtitle: "Not satisfied? We'll make it right",
  },
];

export default function TrustBar() {
  return (
    <div className="border-y border-white/8 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {TRUST_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  <Icon className="w-5 h-5 text-white/40" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-white text-sm font-medium leading-tight">
                    {item.title}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
