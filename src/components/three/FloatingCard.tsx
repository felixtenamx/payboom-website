import { useRef, useMemo, useEffect, type FC } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'

function createFrontTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createLinearGradient(0, 0, 1024, 640)
  gradient.addColorStop(0, '#0a1145')
  gradient.addColorStop(0.43, '#1a1640')
  gradient.addColorStop(0.74, '#f05215')
  gradient.addColorStop(1, '#049ea0')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1024, 640)

  const radial = ctx.createRadialGradient(820, 490, 30, 820, 490, 380)
  radial.addColorStop(0, 'rgba(240, 82, 21, 0.25)')
  radial.addColorStop(0.5, 'rgba(4, 158, 160, 0.12)')
  radial.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = radial
  ctx.fillRect(0, 0, 1024, 640)

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)'
  ctx.lineWidth = 1.2
  for (let i = 0; i < 18; i++) {
    ctx.beginPath()
    const x0 = i * 38 + 20
    ctx.moveTo(x0, 0)
    ctx.quadraticCurveTo(x0 - 60, 280, x0 - 20, 640)
    ctx.stroke()
  }

  ctx.fillStyle = '#f05215'
  ctx.font = 'bold 64px "Inter", sans-serif'
  ctx.fillText('PAY', 68, 118)

  ctx.fillStyle = '#049ea0'
  ctx.fillText('B', 174, 118)

  const ox = 209, oy = 100, or = 16
  ctx.beginPath()
  ctx.ellipse(ox, oy - 4, or + 2, or, 0, 0, Math.PI * 2)
  ctx.fillStyle = '#049ea0'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(ox - 8, oy - 5, 5.5, 0, Math.PI * 2)
  ctx.fillStyle = '#ffffff'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(ox + 8, oy - 5, 5.5, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#049ea0'
  ctx.fillText('M', 258, 118)

  ctx.fillStyle = '#c9a84c'
  const cx = 80, cy = 260, cw = 62, ch = 42, cr = 6
  ctx.beginPath()
  ctx.moveTo(cx + cr, cy)
  ctx.lineTo(cx + cw - cr, cy)
  ctx.quadraticCurveTo(cx + cw, cy, cx + cw, cy + cr)
  ctx.lineTo(cx + cw, cy + ch - cr)
  ctx.quadraticCurveTo(cx + cw, cy + ch, cx + cw - cr, cy + ch)
  ctx.lineTo(cx + cr, cy + ch)
  ctx.quadraticCurveTo(cx, cy + ch, cx, cy + ch - cr)
  ctx.lineTo(cx, cy + cr)
  ctx.quadraticCurveTo(cx, cy, cx + cr, cy)
  ctx.closePath()
  ctx.fillStyle = 'rgba(201, 168, 76, 0.82)'
  ctx.fill()
  ctx.strokeStyle = 'rgba(180, 145, 60, 0.5)'
  ctx.lineWidth = 1.5
  ctx.stroke()
  ctx.strokeStyle = 'rgba(180, 145, 60, 0.35)'
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.moveTo(cx + 6, cy + 20)
  ctx.lineTo(cx + cw - 15, cy + 20)
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(cx + 6, cy + 26)
  ctx.lineTo(cx + cw - 10, cy + 26)
  ctx.stroke()

  ctx.fillStyle = 'rgba(255, 255, 255, 0.55)'
  ctx.font = '26px "Inter", sans-serif'
  ctx.fillText('4242', 640, 510)
  ctx.fillText('4242', 718, 510)
  ctx.fillText('4242', 796, 510)
  ctx.fillText('4242', 874, 510)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.font = '13px "Inter", sans-serif'
  ctx.fillText('VALID THRU', 640, 545)
  ctx.fillText('12/30', 640, 563)
  ctx.fillText('FELIX TENA', 740, 563)

  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
  ctx.font = '18px "Inter", sans-serif'
  ctx.fillText('PAYBOOM', 888, 582)

  const ciX = 994, ciY = 340
  for (let r = 12; r <= 22; r += 5) {
    ctx.beginPath()
    ctx.arc(ciX, ciY, r, Math.PI * 1.55, Math.PI * 2.45)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  return canvas
}

function createBackTexture(): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = 1024
  canvas.height = 640
  const ctx = canvas.getContext('2d')!

  const gradient = ctx.createLinearGradient(0, 0, 1024, 640)
  gradient.addColorStop(0, '#1a1640')
  gradient.addColorStop(1, '#0a0a1f')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, 1024, 640)

  ctx.fillStyle = '#0a0a1f'
  ctx.fillRect(0, 80, 1024, 48)

  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 16px "Inter", sans-serif'
  ctx.fillText('CVV', 880, 108)

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(840, 40, 140, 36)

  ctx.fillStyle = '#1a1640'
  ctx.font = 'bold 24px "Inter", sans-serif'
  ctx.fillText('321', 850, 112)

  return canvas
}

function createRoundedRectShape(
  width: number,
  height: number,
  depth: number,
  radius: number,
): THREE.Shape {
  const shape = new THREE.Shape()
  shape.moveTo(-width / 2 + radius, -height / 2)
  shape.lineTo(width / 2 - radius, -height / 2)
  shape.quadraticCurveTo(width / 2, -height / 2, width / 2, -height / 2 + radius)
  shape.lineTo(width / 2, height / 2 - radius)
  shape.quadraticCurveTo(width / 2, height / 2, width / 2 - radius, height / 2)
  shape.lineTo(-width / 2 + radius, height / 2)
  shape.quadraticCurveTo(-width / 2, height / 2, -width / 2, height / 2 - radius)
  shape.lineTo(-width / 2, -height / 2 + radius)
  shape.quadraticCurveTo(-width / 2, -height / 2, -width / 2 + radius, -height / 2)
  return shape
}

function CardModel() {
  const meshRef = useRef<THREE.Mesh>(null!)
  const frontTex = useMemo(() => new THREE.CanvasTexture(createFrontTexture()), [])
  const backTex = useMemo(() => new THREE.CanvasTexture(createBackTexture()), [])

  const geometry = useMemo(() => {
    const shape = createRoundedRectShape(3.4, 2.15, 0.06, 0.18)
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelSegments: 3,
    }
    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings)
    geo.center()
    geo.computeVertexNormals()
    return geo
  }, [])

  const frontMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: frontTex,
        metalness: 0.7,
        roughness: 0.18,
        clearcoat: 1,
        sheen: 1,
        sheenColor: new THREE.Color('#ff7a45'),
        specularIntensity: 0.3,
        specularColor: new THREE.Color('#ffffff'),
      }),
    [frontTex],
  )

  const backMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        map: backTex,
        metalness: 0.55,
        roughness: 0.32,
        clearcoat: 0.7,
        specularIntensity: 0.2,
        specularColor: new THREE.Color('#ffffff'),
      }),
    [backTex],
  )

  const sideMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0a0a1f'),
        metalness: 0.6,
        roughness: 0.4,
        clearcoat: 0.6,
      }),
    [],
  )

  const materials = useMemo(
    () => [sideMaterial, sideMaterial, frontMaterial, backMaterial, sideMaterial, sideMaterial],
    [frontMaterial, backMaterial, sideMaterial],
  )

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.15
    meshRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.08
  })

  return (
    <mesh ref={meshRef} geometry={geometry} material={materials}>
      <primitive object={geometry} attach="geometry" />
    </mesh>
  )
}

function CardParticles() {
  const count = 90
  const pointsRef = useRef<THREE.Points>(null!)
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const velocities = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 5
      pos[i * 3 + 1] = (Math.random() - 0.5) * 3.5
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5
      velocities[i] = 0.2 + Math.random() * 0.8
    }
    return { pos, velocities }
  }, [])

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += positions.velocities[i] * delta * 0.5
      if (pos[i * 3 + 1] > 1.8) {
        pos[i * 3 + 1] = -1.8
        pos[i * 3] = (Math.random() - 0.5) * 5
        pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.pos, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ff7a45"
        size={0.04}
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function OrbitingSymbols() {
  const symbols = useMemo(
    () => [
      { color: '#ff7a45', radius: 2.4, speed: 0.5, phase: 0 },
      { color: '#049ea0', radius: 2.5, speed: 0.7, phase: Math.PI / 3 },
      { color: '#f05215', radius: 2.6, speed: 0.45, phase: Math.PI / 2 },
      { color: '#06c4c7', radius: 2.7, speed: 0.65, phase: Math.PI },
      { color: '#ff7a45', radius: 2.55, speed: 0.55, phase: Math.PI * 1.3 },
      { color: '#049ea0', radius: 2.8, speed: 0.4, phase: Math.PI * 1.6 },
    ],
    [],
  )

  const torusGeo = useMemo(() => new THREE.TorusGeometry(0.18, 0.05, 16, 32), [])

  return symbols.map((s, i) => (
    <OrbitingRing
      key={i}
      geometry={torusGeo}
      color={s.color}
      radius={s.radius}
      speed={s.speed}
      phase={s.phase}
    />
  ))
}

function OrbitingRing({
  geometry,
  color,
  radius,
  speed,
  phase,
}: {
  geometry: THREE.TorusGeometry
  color: string
  radius: number
  speed: number
  phase: number
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed + phase
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = Math.sin(t * 1.7) * 0.7
    ref.current.rotation.x += 0.02
    ref.current.rotation.y += 0.03
  })

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.4} />
    </mesh>
  )
}

function Scene() {
  const { camera } = useThree()

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 35
      camera.position.set(0, 0, 7)
      camera.updateProjectionMatrix()
    }
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.55} color="#ffffff" />
      <directionalLight position={[5, 6, 4]} intensity={1.7} color="#ff7a45" />
      <directionalLight position={[-5, -3, 3]} intensity={1.3} color="#06c4c7" />
      <directionalLight position={[2, -4, -3]} intensity={0.5} color="#f05215" />

      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        <CardModel />
      </Float>

      <CardParticles />
      <OrbitingSymbols />
    </>
  )
}

interface FloatingCardProps {
  className?: string
}

const FloatingCard: FC<FloatingCardProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas
        frameloop="demand"
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 35 }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default FloatingCard
