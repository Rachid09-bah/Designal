"use client"

import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface Model3DViewerProps {
  modelUrl: string
  className?: string
}

function Model({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url)
  const meshRef = useRef<any>()

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
    }
  })

  return <primitive ref={meshRef} object={gltf.scene} scale={1} />
}

export function Model3DViewer({ modelUrl, className = "" }: Model3DViewerProps) {
  return (
    <div className={`w-full h-96 bg-gray-900 rounded-lg ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Model url={modelUrl} />
          <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
        </Suspense>
      </Canvas>
    </div>
  )
}