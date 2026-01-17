"use client"

export function CTA() {
  return (
    <section id="community" className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 bg-gradient-to-b from-primary to-transparent" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 bg-gradient-to-t from-accent to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glow-box rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Join the
            <br />
            <span className="gradient-text">Shadow Community?</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Millions of users are already enjoying anonymous, free, and secure communication. Be part of the revolution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105 text-lg">
              Get Started Free
            </button>
            <button className="px-10 py-4 border border-border/50 rounded-lg hover:bg-card/50 transition-all duration-300 font-semibold text-lg">
              Schedule Demo
            </button>
          </div>

          <p className="text-sm text-muted-foreground mt-8">
            No credit card required • Free forever plan available • Deploy in seconds
          </p>
        </div>
      </div>
    </section>
  )
}
