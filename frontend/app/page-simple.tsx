"use client"

import React from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section id="accueil" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/modern-minimalist-interior-design-living-room-with.jpg"
            alt="Design intérieur haut de gamme"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/70 to-background" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight">
            Donnez vie à vos espaces avec DESIGNAL
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
            Studio créatif de design et de décoration d'intérieur. L'art de sublimer les espaces.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button asChild className="bg-[#022B31] text-white hover:bg-[#0A4950] font-medium px-8 py-6 text-lg shadow-lg">
              <Link href="#services">Découvrir nos services</Link>
            </Button>
            <Button variant="outline" asChild className="border-2 border-[#022B31] text-[#022B31] hover:bg-[#022B31] hover:text-white font-medium px-8 py-6 text-lg">
              <Link href="#contact">Demander un devis</Link>
            </Button>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  )
}