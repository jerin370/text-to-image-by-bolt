import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BarChart2, Cloud, Shield, Image } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <header className="container mx-auto py-6">
        <nav className="flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">SaaSify</div>
          <div className="space-x-4">
            <Button variant="ghost" asChild>
              <Link href="#features">Features</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="#pricing">Pricing</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-primary sm:text-6xl">
          Streamline Your Business with SaaSify
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground">
          Boost productivity, enhance collaboration, and drive growth with our all-in-one SaaS solution.
        </p>
        <div className="flex justify-center space-x-4">
          <Button size="lg" asChild>
            <Link href="/signup">
              Get Started <ArrowRight className="ml-2" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/text-to-image">
              Try Image Generator <Image className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </main>

      <section id="features" className="bg-card py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <FeatureCard
              icon={<Cloud className="h-12 w-12" />}
              title="Cloud-Based"
              description="Access your data and tools from anywhere, anytime."
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12" />}
              title="Secure"
              description="Enterprise-grade security to protect your sensitive information."
            />
            <FeatureCard
              icon={<BarChart2 className="h-12 w-12" />}
              title="Analytics"
              description="Gain insights with powerful reporting and analytics tools."
            />
            <FeatureCard
              icon={<Image className="h-12 w-12" />}
              title="AI Image Generation"
              description="Create stunning images from text descriptions."
            />
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold">Pricing Plans</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <PricingCard
              title="Basic"
              price="$9.99"
              features={["5 Users", "10GB Storage", "Basic Support"]}
            />
            <PricingCard
              title="Pro"
              price="$29.99"
              features={["25 Users", "100GB Storage", "Priority Support", "Advanced Analytics"]}
              highlighted
            />
            <PricingCard
              title="Enterprise"
              price="Custom"
              features={["Unlimited Users", "Unlimited Storage", "24/7 Support", "Custom Integration"]}
            />
          </div>
        </div>
      </section>

      <footer className="bg-card py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          © 2023 SaaSify. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card>
      <CardHeader>
        <div className="mb-4 flex justify-center">{icon}</div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function PricingCard({ title, price, features, highlighted = false }: { title: string; price: string; features: string[]; highlighted?: boolean }) {
  return (
    <Card className={highlighted ? "border-primary shadow-lg" : ""}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-muted-foreground">/month</span>}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <ArrowRight className="mr-2 h-4 w-4 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Button className="mt-6 w-full" variant={highlighted ? "default" : "outline"}>
          Choose Plan
        </Button>
      </CardContent>
    </Card>
  )
}