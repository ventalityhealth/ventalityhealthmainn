import React from "react";
import { ShieldCheck, FlaskConical, Building2, RotateCcw } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "cGMP-Compliant",
    subtitle: "Manufacturing",
  },
  {
    icon: Building2,
    title: "FDA-Registered",
    subtitle: "Facilities",
  },
  {
    icon: FlaskConical,
    title: "Certificate of Analysis",
    subtitle: "Available on Request",
  },
  {
    icon: RotateCcw,
    title: "30-Day Guarantee",
    subtitle: "Satisfaction Backed",
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
              <div
                key={item.title}
                className="flex items-center gap-3"
              >
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
