"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { contactAPI } from "@/lib/api"

const projectTypes = [
  "Appartement / Maison",
  "Studio créatif",
  "Boutique",
  "Galerie d'art",
  "Bureau / Coworking",
  "Restaurant / Café",
  "Pharmacie / Agence",
  "Autre"
]

const budgetRanges = [
  "Moins de 5 000€",
  "5 000€ - 15 000€",
  "15 000€ - 30 000€",
  "30 000€ - 50 000€",
  "Plus de 50 000€"
]

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage("")
    
    try {
      await contactAPI.sendMessage(formData)
      setMessage("Votre demande a été envoyée avec succès ! Nous vous recontacterons sous 24h.")
      setFormData({ name: "", email: "", phone: "", projectType: "", budget: "", timeline: "", message: "" })
      setStep(1)
    } catch (error) {
      setMessage("Erreur lors de l'envoi. Veuillez réessayer ou nous contacter directement.")
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section id="contact" className="py-32 bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <motion.div 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center space-y-8 mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-semibold text-white">Demander un devis</h2>
          <div className="w-24 h-1 bg-white mx-auto" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Transformons ensemble vos idées en réalité. Partagez-nous votre vision et recevez un devis personnalisé.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Informations de contact */}
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-white">Contactez-nous</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Email</h4>
                    <p className="text-gray-300">contact@designal.fr</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Téléphone</h4>
                    <p className="text-gray-300">+33 1 23 45 67 89</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Horaires</h4>
                    <p className="text-gray-300">Lun-Ven: 9h-18h</p>
                    <p className="text-gray-300">Sam: 10h-16h</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/70 rounded-2xl p-6 border border-blue-200">
              <h4 className="font-semibold text-gray-900 mb-3">Pourquoi nous choisir ?</h4>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Expertise reconnue depuis 10 ans
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Visualisation 3D photoréaliste
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Suivi personnalisé de A à Z
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  Garantie satisfaction client
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Formulaire */}
          <motion.div 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true }}
            variants={fadeUp}
            className="lg:col-span-2"
          >
            <Card className="bg-gray-800 border-gray-700 shadow-2xl">
              <CardContent className="p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-gray-300">Étape {step} sur 3</span>
                    <span className="text-sm text-gray-400">{Math.round((step / 3) * 100)}% complété</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-white h-2 rounded-full transition-all duration-500 ease-out" 
                      style={{ width: `${(step / 3) * 100}%` }}
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Étape 1: Informations personnelles */}
                  {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Vos informations</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-300">Nom complet *</label>
                          <Input
                            id="name"
                            placeholder="Votre nom"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            className="h-12 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-sm font-medium text-gray-300">Téléphone</label>
                          <Input
                            id="phone"
                            placeholder="06 12 34 56 78"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="h-12 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300">Email *</label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="h-12 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Étape 2: Détails du projet */}
                  {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Votre projet</h3>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Type de projet *</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {projectTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({ ...formData, projectType: type })}
                              className={`p-3 rounded-lg border text-sm transition-all ${
                                formData.projectType === type
                                  ? 'bg-white text-gray-900 border-white'
                                  : 'bg-gray-700 text-gray-300 border-gray-600 hover:border-gray-500'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-300">Budget estimé</label>
                          <select
                            value={formData.budget}
                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                            className="w-full h-12 bg-gray-700 border-gray-600 text-white rounded-md px-3 focus:border-white focus:outline-none"
                          >
                            <option value="">Sélectionnez un budget</option>
                            {budgetRanges.map((range) => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="timeline" className="text-sm font-medium text-gray-300">Délai souhaité</label>
                          <Input
                            id="timeline"
                            placeholder="Ex: 3 mois"
                            value={formData.timeline}
                            onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                            className="h-12 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Étape 3: Message */}
                  {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                      <h3 className="text-xl font-semibold text-white mb-4">Décrivez votre projet</h3>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium text-gray-300">Message *</label>
                        <Textarea
                          id="message"
                          placeholder="Décrivez votre projet, vos goûts, vos contraintes, vos inspirations..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="min-h-40 resize-none bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-white"
                        />
                      </div>
                      
                      <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600">
                        <h4 className="font-medium text-white mb-2">Récapitulatif</h4>
                        <div className="space-y-1 text-sm text-gray-300">
                          <p><span className="font-medium">Nom:</span> {formData.name}</p>
                          <p><span className="font-medium">Email:</span> {formData.email}</p>
                          {formData.phone && <p><span className="font-medium">Téléphone:</span> {formData.phone}</p>}
                          {formData.projectType && <p><span className="font-medium">Type:</span> {formData.projectType}</p>}
                          {formData.budget && <p><span className="font-medium">Budget:</span> {formData.budget}</p>}
                          {formData.timeline && <p><span className="font-medium">Délai:</span> {formData.timeline}</p>}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Messages */}
                  {message && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-center p-4 rounded-lg ${
                        message.includes('succès') 
                          ? 'text-green-400 bg-green-900/20 border border-green-800' 
                          : 'text-red-400 bg-red-900/20 border border-red-800'
                      }`}
                    >
                      {message}
                    </motion.div>
                  )}
                  
                  {/* Navigation */}
                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      onClick={prevStep}
                      disabled={step === 1}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                    >
                      Précédent
                    </Button>
                    
                    {step < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={step === 1 && (!formData.name || !formData.email)}
                        className="bg-white text-gray-900 hover:bg-gray-200"
                      >
                        Suivant
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isLoading || !formData.message}
                        className="bg-white text-gray-900 hover:bg-gray-200 min-w-32"
                      >
                        {isLoading ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                            Envoi...
                          </div>
                        ) : (
                          "Envoyer ma demande"
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
