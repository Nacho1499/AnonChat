"use client"

import { Lock, Users, Zap, Globe, Eye, Shield } from "lucide-react"

const features = [
  {
    icon: Eye,
    title: "Complete Anonymity",
    description: "Chat without revealing your identity. No profile data, no tracking, no surveillance.",
  },
  {
    icon: Lock,
    title: "End-to-End Encrypted",
    description: "Military-grade encryption ensures your conversations stay private and secure.",
  },
  {
    icon: Users,
    title: "Decentralized Communities",
    description: "Build communities on your terms. No central authority can censor or control.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Real-time messaging with minimal latency across distributed networks.",
  },
  {
    icon: Globe,
    title: "Borderless Communication",
    description: "Connect with anyone, anywhere. No geographical restrictions or censorship.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Your data is yours alone. We never sell, share, or exploit your information.",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="gradient-text">Powerful Features</span>
            <br />
            <span className="text-foreground">for Private Communication</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to communicate freely and securely in the digital age.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glow-box p-8 rounded-2xl group hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-1"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
