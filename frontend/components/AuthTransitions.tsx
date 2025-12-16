"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ReactNode, useState } from "react"

interface AuthTransitionProps {
  children: ReactNode
  isLoading?: boolean
  onSuccess?: () => void
}

export function LoginTransition({ children, isLoading, onSuccess }: AuthTransitionProps) {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSuccess = () => {
    setShowSuccess(true)
    setTimeout(() => {
      onSuccess?.()
    }, 1200)
  }

  return (
    <AnimatePresence mode="wait">
      {!showSuccess ? (
        <motion.div
          key="login-form"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ 
            opacity: isLoading ? 0.7 : 1, 
            scale: isLoading ? 0.95 : 1 
          }}
          exit={{ 
            opacity: 0, 
            scale: 0.9,
            y: -20
          }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94] 
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex items-center justify-center min-h-[400px]"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl font-semibold text-gray-900 mb-2"
            >
              Connexion réussie !
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600"
            >
              Redirection en cours...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function LogoutTransition({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Déconnexion...</p>
      </motion.div>
    </motion.div>
  )
}

export function DashboardEntrance({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }}
    >
      {children}
    </motion.div>
  )
}