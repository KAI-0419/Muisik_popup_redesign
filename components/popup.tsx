"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Sparkles, ArrowRight, Eye, Lock } from "lucide-react"

interface AnalysisPreview {
  personality: string
  dominantTrait: string
  confidence: number
  insights: number
}

export default function MuisikPopup() {
  const [stage, setStage] = useState<"idle" | "analyzing" | "preview">("idle")
  const [progress, setProgress] = useState(0)
  const [analysisPreview, setAnalysisPreview] = useState<AnalysisPreview | null>(null)

  // Simulate analysis progress
  useEffect(() => {
    if (stage === "analyzing") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setAnalysisPreview({
              personality: "ENFP",
              dominantTrait: "Creative Visionary",
              confidence: 94,
              insights: 12,
            })
            setStage("preview")
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [stage])

  const startAnalysis = () => {
    setStage("analyzing")
    setProgress(0)
  }

  const openDashboard = () => {
    // In real extension, this would open the dashboard
    console.log("Opening dashboard...")
  }

  return (
    <div className="w-[400px] h-[600px] bg-gradient-to-br from-slate-800 via-teal-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-teal-400/15 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-400/15 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Glassmorphism container */}
      <div className="absolute inset-4 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
        <div className="p-6 h-full flex flex-col">
          {/* Header */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-2xl mb-4 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>

            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
              Muisik
            </h1>

            <p className="text-white/70 text-sm leading-relaxed">
              Unlock the hidden patterns in your mind through the videos you love
            </p>
          </motion.div>

          {/* Main content area */}
          <div className="flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {/* Idle State */}
              {stage === "idle" && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-4"
                >
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-white">Discover Your Digital DNA</h2>
                    <p className="text-white/60 text-sm leading-relaxed">
                      Your YouTube likes reveal deep psychological patterns. Let AI decode your unconscious preferences.
                    </p>
                  </div>

                  <Button
                    onClick={startAnalysis}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-300 group"
                  >
                    <motion.div
                      className="flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Start Mind Analysis</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Button>
                </motion.div>
              )}

              {/* Analyzing State */}
              {stage === "analyzing" && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="text-center space-y-4"
                >
                  <motion.div
                    className="w-20 h-20 mx-auto bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center mb-6"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                      repeatType: "reverse",
                    }}
                  >
                    <Sparkles className="w-10 h-10 text-white" />
                  </motion.div>

                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-white">Analyzing Your Mind</h2>
                    <p className="text-white/60 text-sm">AI is processing your YouTube preferences...</p>
                  </div>

                  <div className="space-y-3">
                    <Progress value={progress} className="h-2 bg-white/10" />
                    <p className="text-white/50 text-xs">{Math.round(progress)}% complete</p>
                  </div>

                  <motion.div
                    className="flex justify-center space-x-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-purple-400 rounded-full"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Preview State */}
              {stage === "preview" && analysisPreview && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="text-center mb-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <Sparkles className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                    </motion.div>
                    <h2 className="text-xl font-semibold text-white mb-1">Analysis Complete!</h2>
                    <p className="text-white/60 text-sm">Your psychological profile is ready</p>
                  </div>

                  {/* Teaser Preview */}
                  <motion.div
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    {/* Blur overlay for teaser effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20 backdrop-blur-[2px] z-10" />

                    <div className="space-y-3 relative">
                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Personality Type</span>
                        <Badge className="bg-teal-500/20 text-teal-200 border-teal-500/30">
                          {analysisPreview.personality}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <span className="text-white/70 text-sm">Dominant Trait</span>
                        <p className="text-white font-medium">{analysisPreview.dominantTrait}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-white/70 text-sm">Confidence</span>
                        <span className="text-green-400 font-semibold">{analysisPreview.confidence}%</span>
                      </div>

                      <div className="pt-2 border-t border-white/10">
                        <div className="flex items-center space-x-2 text-white/50">
                          <Lock className="w-4 h-4" />
                          <span className="text-sm">+{analysisPreview.insights} detailed insights locked</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA Button */}
                  <Button
                    onClick={openDashboard}
                    className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-2xl shadow-lg transition-all duration-300 group"
                  >
                    <motion.div
                      className="flex items-center justify-center space-x-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Eye className="w-5 h-5" />
                      <span>View Full Report in Dashboard</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Button>

                  <p className="text-center text-white/40 text-xs">
                    Unlock your complete psychological profile with detailed insights, trends, and personalized
                    recommendations
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <motion.div
            className="text-center pt-4 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-white/40 text-xs">Powered by advanced AI • Privacy protected</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
