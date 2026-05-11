import { useRef, useMemo, useEffect, type FC } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'

const CONTINENT_POLYGONS: [number, number][][] = [
  [[71, -156], [70, -130], [68, -100], [65, -90], [55, -80], [55, -65], [44, -58], [44, -65], [36, -75], [30, -81], [26, -80], [18, -88], [13, -87], [8, -78], [12, -90], [16, -100], [24, -110], [30, -115], [40, -124], [50, -128], [58, -135], [60, -148], [71, -156]],
  [[83, -22], [78, -18], [68, -25], [60, -43], [68, -52], [78, -58], [83, -58], [83, -22]],
  [[12, -72], [12, -65], [8, -58], [0, -50], [-5, -35], [-15, -39], [-23, -43], [-32, -52], [-38, -58], [-50, -67], [-55, -67], [-52, -72], [-40, -73], [-23, -71], [-12, -77], [-3, -80], [5, -78], [12, -72]],
  [[37, 10], [32, 11], [31, 21], [31, 30], [24, 35], [14, 42], [12, 51], [9, 49], [-2, 42], [-12, 40], [-25, 33], [-30, 32], [-34, 18], [-29, 15], [-15, 12], [-6, 12], [0, 9], [5, 2], [6, -7], [10, -12], [16, -16], [22, -17], [27, -12], [32, -9], [35, -3], [37, 10]],
  [[37, -8], [40, -9], [43, -3], [48, -2], [50, 2], [53, 3], [60, 3], [70, 18], [71, 25], [68, 40], [70, 60], [75, 90], [78, 110], [78, 130], [70, 160], [65, 170], [58, 170], [55, 162], [50, 155], [45, 148], [42, 140], [38, 128], [35, 125], [30, 122], [28, 118], [22, 110], [18, 108], [10, 107], [1, 104], [8, 98], [16, 98], [21, 93], [16, 90], [8, 77], [15, 72], [22, 68], [25, 65], [27, 57], [24, 57], [22, 60], [15, 53], [12, 45], [14, 42], [16, 40], [20, 40], [27, 34], [32, 30], [36, 32], [37, 28], [40, 22], [40, 18], [37, 16], [40, 10], [44, 10], [44, 3], [37, -8]],
  [[-11, 131], [-12, 142], [-15, 145], [-22, 150], [-28, 153], [-35, 150], [-38, 145], [-37, 141], [-35, 138], [-32, 116], [-26, 113], [-22, 114], [-15, 125], [-12, 130], [-11, 131]],
  [[-65, -180], [-65, -90], [-65, 0], [-65, 90], [-65, 180], [-90, 180], [-90, -180], [-65, -180]],
  [[-12, 49], [-15, 50], [-22, 48], [-25, 46], [-25, 43], [-15, 46], [-12, 49]],
  [[58, -7], [58, -2], [50, 1], [50, -5], [55, -9], [55, -7], [58, -7]],
  [[45, 140], [42, 141], [36, 140], [33, 131], [33, 135], [39, 140], [45, 140]],
  [[5, 95], [5, 105], [-2, 108], [-8, 114], [-9, 118], [-3, 100], [5, 95]],
  [[-35, 173], [-37, 178], [-46, 170], [-46, 166], [-40, 172], [-35, 173]],
]

const CITIES = [
  { name: 'Madrid', lat: 40.4, lng: -3.7 },
  { name: 'London', lat: 51.5, lng: -0.1 },
  { name: 'New York', lat: 40.7, lng: -74 },
  { name: 'CDMX', lat: 19.4, lng: -99.1 },
  { name: 'São Paulo', lat: -23.5, lng: -46.6 },
  { name: 'Lagos', lat: 6.5, lng: 3.4 },
  { name: 'Dubai', lat: 25.2, lng: 55.3 },
  { name: 'Mumbai', lat: 19.1, lng: 72.9 },
  { name: 'Singapore', lat: 1.35, lng: 103.8 },
  { name: 'Tokyo', lat: 35.7, lng: 139.7 },
  { name: 'Sydney', lat: -33.9, lng: 151.2 },
  { name: 'Berlin', lat: 52.5, lng: 13.4 },
]

const ARC_PAIRS = [
  [0, 1], [0, 5], [1, 7], [2, 11], [2, 9],
  [3, 0], [4, 5], [5, 7], [6, 8], [7, 8],
  [9, 8], [10, 9], [3, 2], [6, 1], [11, 0],
  [5, 3], [9, 6], [4, 10], [7, 11], [8, 10],
]

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

function isPointInPolygons(
  lat: number,
  lng: number,
  polygons: [number, number][][],
): boolean {
  for (const poly of polygons) {
    if (isPointInPolygon(lat, lng, poly)) return true
  }
  return false
}

function isPointInPolygon(
  lat: number,
  lng: number,
  polygon: [number, number][],
): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i]
    const [xj, yj] = polygon[j]
    if (yi > lng !== yj > lng && lat < ((xj - xi) * (lng - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

function lerpColor(color1: THREE.Color, color2: THREE.Color, t: number): THREE.Color {
  return new THREE.Color().copy(color1).lerp(color2, t)
}

function GlobeModel() {
  const groupRef = useRef<THREE.Group>(null!)
  const { mouse, viewport } = useThree()

  const sphereGeo = useMemo(() => new THREE.SphereGeometry(2.2, 64, 64), [])
  const wireframeGeo = useMemo(() => new THREE.SphereGeometry(2.21, 48, 48), [])

  const innerMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#06262a'),
        roughness: 0.4,
        transmission: 0.4,
        clearcoat: 0.6,
        specularIntensity: 0.2,
      }),
    [],
  )

  const landDots = useMemo(() => {
    const total = 7000
    const positions: number[] = []
    const colors: number[] = []
    const orangeColor = new THREE.Color('#f05215')
    const tealColor = new THREE.Color('#049ea0')
    const sphereRadius = 2.22

    let added = 0
    for (let i = 0; i < total * 6 && added < total; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const lat = 90 - (phi * 180) / Math.PI
      const lng = ((theta * 180) / Math.PI - 180)

      if (isPointInPolygons(lat, lng, CONTINENT_POLYGONS)) {
        const x = sphereRadius * Math.sin(phi) * Math.cos(theta)
        const y = sphereRadius * Math.cos(phi)
        const z = sphereRadius * Math.sin(phi) * Math.sin(theta)
        positions.push(x, y, z)

        const t = Math.abs(lat) / 90
        const color = lerpColor(orangeColor, tealColor, t)
        colors.push(color.r, color.g, color.b)
        added++
      }
    }

    return { positions: new Float32Array(positions), colors: new Float32Array(colors) }
  }, [])

  const oceanDots = useMemo(() => {
    const count = 1200
    const positions = new Float32Array(count * 3)
    const sphereRadius = 2.23
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1)
      const theta = Math.random() * Math.PI * 2
      const lat = 90 - (phi * 180) / Math.PI
      const lng = ((theta * 180) / Math.PI - 180)
      if (!isPointInPolygons(lat, lng, CONTINENT_POLYGONS)) {
        positions[i * 3] = sphereRadius * Math.sin(phi) * Math.cos(theta)
        positions[i * 3 + 1] = sphereRadius * Math.cos(phi)
        positions[i * 3 + 2] = sphereRadius * Math.sin(phi) * Math.sin(theta)
      } else {
        positions[i * 3] = (Math.random() - 0.5) * 5
        positions[i * 3 + 1] = (Math.random() - 0.5) * 5
        positions[i * 3 + 2] = (Math.random() - 0.5) * 5
      }
    }
    return positions
  }, [])

  const cityPositions = useMemo(() => {
    const r = 2.25
    return CITIES.map((c) => latLngToVec3(c.lat, c.lng, r))
  }, [])

  const arcCurves = useMemo(() => {
    const r = 2.3
    return ARC_PAIRS.map(([a, b]) => {
      const start = latLngToVec3(CITIES[a].lat, CITIES[a].lng, r)
      const end = latLngToVec3(CITIES[b].lat, CITIES[b].lng, r)
      const mid = start.clone().add(end).multiplyScalar(0.5)
      const dist = start.distanceTo(end)
      mid.normalize().multiplyScalar(r + dist * 0.45)
      return new THREE.QuadraticBezierCurve3(start, mid, end)
    })
  }, [])

  const cityMeshRefs = useRef<THREE.Mesh[]>([])
  const ringRefs = useRef<THREE.Mesh[]>([])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    const mx = (mouse.x * viewport.width) / 2
    const my = (mouse.y * viewport.height) / 2
    groupRef.current.rotation.y += delta * 0.1 + mx * delta * 0.3
    groupRef.current.rotation.x += my * delta * 0.2
    groupRef.current.rotation.x = THREE.MathUtils.clamp(
      groupRef.current.rotation.x,
      -0.5,
      0.5,
    )

    const t = Date.now() * 0.001
    for (const mesh of cityMeshRefs.current) {
      if (mesh) {
        mesh.scale.setScalar(1 + Math.sin(t * 3) * 0.12)
      }
    }
    for (const ring of ringRefs.current) {
      if (ring) {
        ring.scale.setScalar(1 + Math.sin(t * 2.5) * 0.25)
      }
    }
  })

  const setCityRef = (i: number) => (el: THREE.Mesh | null) => {
    cityMeshRefs.current[i] = el!
  }
  const setRingRef = (i: number) => (el: THREE.Mesh | null) => {
    ringRefs.current[i] = el!
  }

  return (
    <group ref={groupRef}>
      <mesh geometry={sphereGeo} material={innerMaterial} />

      <lineSegments>
        <edgesGeometry args={[wireframeGeo]} />
        <lineBasicMaterial color="#049ea0" transparent opacity={0.22} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[landDots.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[landDots.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          vertexColors
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[oceanDots, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#0b3a3d"
          size={0.015}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <mesh>
        <sphereGeometry args={[2.35, 64, 64]} />
        <shaderMaterial
          side={THREE.BackSide}
          transparent
          depthWrite={false}
          uniforms={{
            glowColor: { value: new THREE.Color('#ff7a45') },
          }}
          vertexShader={`
            varying vec3 vNormal;
            varying vec3 vPosition;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              vPosition = position;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            varying vec3 vNormal;
            varying vec3 vPosition;
            uniform vec3 glowColor;
            void main() {
              float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
              gl_FragColor = vec4(glowColor, intensity * 0.5);
            }
          `}
        />
      </mesh>

      {cityPositions.map((pos, i) => (
        <group key={i}>
          <mesh ref={setCityRef(i)} position={pos}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#f05215" />
          </mesh>
          <mesh ref={setRingRef(i)} position={pos}>
            <ringGeometry args={[0.06, 0.08, 32]} />
            <meshBasicMaterial
              color="#f05215"
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}

      {arcCurves.map((curve, i) => (
        <mesh key={`arc-${i}`}>
          <tubeGeometry args={[curve, 20, 0.015, 8, false]} />
          <meshBasicMaterial color="#049ea0" transparent opacity={0.35} />
        </mesh>
      ))}

      {arcCurves.map((curve, i) => (
        <TravelingParticle key={`tp-${i}`} curve={curve} delay={i * 0.3} />
      ))}
    </group>
  )
}

function TravelingParticle({
  curve,
  delay,
}: {
  curve: THREE.QuadraticBezierCurve3
  delay: number
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = ((clock.getElapsedTime() + delay) % 4) / 4
    const point = curve.getPointAt(t)
    ref.current.position.copy(point)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color="#ff7a45" />
    </mesh>
  )
}

function Scene() {
  const { camera } = useThree()

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = 36
      camera.position.set(0, 0, 7.5)
      camera.updateProjectionMatrix()
    }
  }, [camera])

  return (
    <>
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[4, 3, 5]} intensity={1.2} color="#ff7a45" />
      <directionalLight position={[-3, -1, -3]} intensity={0.8} color="#06c4c7" />
      <directionalLight position={[0, -4, 0]} intensity={0.4} color="#049ea0" />

      <GlobeModel />
    </>
  )
}

interface PaymentGlobeProps {
  className?: string
}

const PaymentGlobe: FC<PaymentGlobeProps> = ({ className }) => {
  return (
    <div className={className}>
      <Canvas
        frameloop="demand"
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7.5], fov: 36 }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

export default PaymentGlobe
