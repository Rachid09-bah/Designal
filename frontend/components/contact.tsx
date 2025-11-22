"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { contactAPI } from "@/lib/api"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    
    try {
      await contactAPI.sendMessage(formData)
      setMessage("Message envoyé avec succès !")
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setMessage("Erreur lors de l'envoi du message")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-balance">Demander un devis</h2>
          <div className="w-24 h-px bg-accent mx-auto" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Parlons de votre prochain projet !
          </p>
        </div>

        <Card className="max-w-2xl mx-auto border-border/50">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nom complet
                </label>
                <Input
                  id="name"
                  placeholder="Votre nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Décrivez votre projet..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="min-h-32 resize-none"
                />
              </div>

              {message && (
                <div className={`text-center p-3 rounded ${message.includes('succès') ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                  {message}
                </div>
              )}
              
              <Button
                type="submit"
                size="lg"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
              >
                {isLoading ? "Envoi..." : "Envoyer ma demande"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
