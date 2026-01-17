"use client"

export function Security() {
  return (
    <section id="security" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-3xl opacity-15 bg-gradient-to-l from-primary to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Military-Grade</span>
              <br />
              <span className="text-foreground">Security</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Your privacy is paramount. AnonChat uses industry-leading encryption protocols and decentralized
              architecture to protect your communications from prying eyes.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Zero-knowledge architecture",
                "E2E encrypted messages",
                "No IP logging",
                "Decentralized servers",
                "Regular security audits",
                "Open-source codebase",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <span className="text-primary-foreground text-sm font-bold">✓</span>
                  </div>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>

            <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
              Read Security Docs
            </button>
          </div>

          {/* Right Visual */}
          <div className="relative h-96 glow-box rounded-2xl p-8 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 gradient-bg" />
            </div>
            <div className="relative text-center">
              <div className="text-6xl font-bold gradient-text mb-4">🔐</div>
              <p className="text-xl font-semibold">Fortress of Privacy</p>
              <p className="text-sm text-muted-foreground mt-2">End-to-end encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
