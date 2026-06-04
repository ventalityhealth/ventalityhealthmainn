import React from "react"
import {
  Zap,
  Moon,
  Brain,
  Heart,
  ShieldCheck,
  Activity,
  Leaf,
  Sparkles,
  Check,
  Dumbbell,
  Droplets,
} from "lucide-react"
import type { LucideProps } from "lucide-react"

type IconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>

function getBenefitIcon(text: string): IconComponent {
  const l = text.toLowerCase()
  if (/energy|endurance|vitality|fuel|power|electro/.test(l)) return Zap
  if (/sleep|rest|recover|relax|calm|night/.test(l)) return Moon
  if (/focus|cognit|brain|mental|clarity|memory|nootropic/.test(l)) return Brain
  if (/heart|cardio|blood|circulat/.test(l)) return Heart
  if (/immune|immunit|defense|protect|shield/.test(l)) return ShieldCheck
  if (/gut|digest|probiotic|microbiome|stomach/.test(l)) return Leaf
  if (/antioxid|cellular|longevity|free radical/.test(l)) return Sparkles
  if (/metabol|thermogen|weight|fat|body comp/.test(l)) return Activity
  if (/muscle|strength|athletic|sport|perform|workout|train/.test(l)) return Dumbbell
  if (/hydrat|water|fluid|moisture/.test(l)) return Droplets
  return Check
}

interface Props {
  benefits: string[]
}

export default function ProductBenefits({ benefits }: Props) {
  if (!benefits.length) return null

  return (
    <div className="space-y-2 my-8">
      {benefits.slice(0, 4).map((benefit, i) => {
        const Icon = getBenefitIcon(benefit)
        return (
          <div
            key={i}
            className="animate-fade-in-up group flex items-start gap-3.5 p-3.5 rounded-xl transition-colors duration-200"
            style={{
              animationDelay: `${i * 90}ms`,
              animationFillMode: "both",
              border: "1px solid var(--vt-line)",
              background: "rgba(255,255,255,0.015)",
            }}
          >
            {/* Icon */}
            <div
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center mt-0.5 transition-colors duration-200"
              style={{
                background: "rgba(168,209,255,0.06)",
                border: "1px solid rgba(168,209,255,0.10)",
              }}
            >
              <Icon
                className="w-3.5 h-3.5"
                style={{ color: "var(--vt-accent-blue)" }}
                strokeWidth={1.75}
              />
            </div>

            {/* Text */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--vt-muted)", marginTop: "0.05rem" }}
            >
              {benefit}
            </p>
          </div>
        )
      })}
    </div>
  )
}
