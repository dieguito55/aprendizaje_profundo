import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Text, Html, Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { DISEASES_DATA } from "../../data/diseases";
import {
  FaExpand,
  FaCompress,
  FaInfoCircle,
  FaShieldAlt,
  FaExclamationTriangle,
  FaStethoscope,
  FaTimes,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";

extend(THREE);

// ------- util: valida cabecera de fuente -------
async function preflightFont(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const b = new Uint8Array(buf.slice(0, 4));
    const sig = String.fromCharCode(...b);
    const isTTF = b[0] === 0x00 && b[1] === 0x01 && b[2] === 0x00 && b[3] === 0x00;
    const isOTF = sig === "OTTO";
    return isTTF || isOTF ? url : null;
  } catch {
    return null;
  }
}

/**
 * Nodo interactivo premium (con forwardRef para exponer posición mundial)
 */
const DiseaseNode = forwardRef(function DiseaseNode(
  {
    position,
    prob,
    diseaseId,
    isTop,
    isNear,
    index,
    onNodeClick,
    hoveredNode,
    setHoveredNode,
    safeFontUrl,
  },
  ref
) {
  const meshRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();
  const ringRef3 = useRef();
  const haloRef = useRef();
  const labelNameRef = useRef();
  const labelProbRef = useRef();

  const [isHovered, setIsHovered] = useState(false);
  const hoverScale = useRef(1);

  // Exponer método que devuelve el centro en coords mundiales (para líneas)
  useImperativeHandle(ref, () => ({
    getCenterWorld: () => {
      const v = new THREE.Vector3();
      if (meshRef.current) meshRef.current.getWorldPosition(v);
      return v;
    },
  }));

  const nodeConfig = useMemo(() => {
    const baseColors = {
      top: "#F15F79",
      near: "#8C7FE9",
      normal: "#34C759",
    };

    if (isTop) {
      return {
        color: baseColors.top,
        glowColor: baseColors.top,
        scale: 0.8 + (prob || 0) * 0.4,
        glowOpacity: 0.9,
        metalness: 0.2,
        roughness: 0.1,
        emissiveIntensity: 0.4,
      };
    }
    if (isNear) {
      return {
        color: baseColors.near,
        glowColor: baseColors.near,
        scale: 0.6 + (prob || 0) * 0.3,
        glowOpacity: 0.6,
        metalness: 0.3,
        roughness: 0.2,
        emissiveIntensity: 0.3,
      };
    }
    return {
      color: baseColors.normal,
      glowColor: baseColors.normal,
      scale: 0.4 + (prob || 0) * 0.2,
      glowOpacity: 0.3,
      metalness: 0.4,
      roughness: 0.3,
      emissiveIntensity: 0.2,
    };
  }, [isTop, isNear, prob]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Flotación del nodo: solo Y (X y Z = 0 porque el grupo ya está en "position")
    const floatY = Math.sin(time * 1.5 + index * 2) * 0.15;
    meshRef.current.position.set(0, floatY, 0);

    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.008;

    // Pulso de importancia
    if (isTop || isHovered) {
      const pulseScale = 1 + Math.sin(time * 5) * 0.15;
      hoverScale.current = pulseScale;
    } else {
      hoverScale.current = 1;
    }

    // Escala de la bola
    meshRef.current.scale.setScalar(nodeConfig.scale * hoverScale.current);

    // Halo sigue/escala con la bola
    if (haloRef.current) {
      haloRef.current.position.copy(meshRef.current.position);
      haloRef.current.scale.setScalar(nodeConfig.scale * hoverScale.current * 2.5);
    }

    // Anillos siguen a la bola
    if (ringRef1.current && isTop) {
      ringRef1.current.rotation.y += 0.02;
      ringRef1.current.rotation.x = Math.sin(time * 0.5) * 0.1;
      ringRef1.current.position.copy(meshRef.current.position);
    }
    if (ringRef2.current && isTop) {
      ringRef2.current.rotation.x += 0.015;
      ringRef2.current.rotation.z = Math.cos(time * 0.3) * 0.1;
      ringRef2.current.position.copy(meshRef.current.position);
    }
    if (ringRef3.current && isTop) {
      ringRef3.current.position.copy(meshRef.current.position);
      ringRef3.current.rotation.x = Math.PI / 4 + Math.sin(time * 0.2) * 0.02;
      ringRef3.current.rotation.y = Math.PI / 4 + Math.cos(time * 0.2) * 0.02;
    }

    // Etiquetas siguen a la bola (offset arriba/abajo)
    const upOffset = nodeConfig.scale * hoverScale.current + 0.8;
    const downOffset = nodeConfig.scale * hoverScale.current + 0.5;
    if (labelNameRef.current) {
      labelNameRef.current.position.set(
        meshRef.current.position.x,
        meshRef.current.position.y + upOffset,
        meshRef.current.position.z
      );
    }
    if (labelProbRef.current) {
      labelProbRef.current.position.set(
        meshRef.current.position.x,
        meshRef.current.position.y - downOffset,
        meshRef.current.position.z
      );
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    // Devolver posición mundial real del nodo
    const world = new THREE.Vector3();
    meshRef.current?.getWorldPosition(world);
    onNodeClick(diseaseId, [world.x, world.y, world.z]);
  };

  const disease = DISEASES_DATA.find((d) => d.id === diseaseId);

  return (
    <group position={position}>
      {/* Halo luminoso (pegado a la bola) */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={nodeConfig.glowColor}
          transparent
          opacity={nodeConfig.glowOpacity}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Anillo orbital 1 - Horizontal */}
      {isTop && (
        <mesh ref={ringRef1}>
          <ringGeometry args={[nodeConfig.scale + 1.2, nodeConfig.scale + 1.3, 64]} />
          <meshBasicMaterial
            color={nodeConfig.glowColor}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Anillo orbital 2 - Vertical */}
      {isTop && (
        <mesh ref={ringRef2} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[nodeConfig.scale + 0.8, nodeConfig.scale + 0.9, 64]} />
          <meshBasicMaterial
            color="#8C7FE9"
            transparent
            opacity={0.6}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Anillo orbital 3 - Diagonal */}
      {isTop && (
        <mesh ref={ringRef3} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <ringGeometry args={[nodeConfig.scale + 1.0, nodeConfig.scale + 1.1, 64]} />
          <meshBasicMaterial
            color="#C19CFF"
            transparent
            opacity={0.5}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Nodo principal */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setIsHovered(true);
          setHoveredNode(diseaseId);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setIsHovered(false);
          setHoveredNode(null);
        }}
      >
        <icosahedronGeometry args={[1, 2]} />
        <meshPhysicalMaterial
          color={nodeConfig.color}
          metalness={nodeConfig.metalness}
          roughness={nodeConfig.roughness}
          emissive={isHovered ? nodeConfig.glowColor : "#000000"}
          emissiveIntensity={isHovered ? nodeConfig.emissiveIntensity : 0}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Etiqueta de enfermedad */}
      {(isTop || isHovered) && disease && Number.isFinite(prob) && (
        <Text
          ref={labelNameRef}
          fontSize={0.35}
          color="white"
          anchorX="center"
          anchorY="bottom"
          font={safeFontUrl || undefined}
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {disease.name}
        </Text>
      )}

      {/* Probabilidad */}
      {(isTop || isHovered) && Number.isFinite(prob) && (
        <Text
          ref={labelProbRef}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="top"
          font={safeFontUrl || undefined}
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {(prob * 100).toFixed(1)}%
        </Text>
      )}

      {/* Partículas (dentro del grupo, acompañan la posición base) */}
      {(isTop || isHovered) && (
        <Sparkles
          count={20}
          scale={nodeConfig.scale * 3 * (hoverScale.current || 1)}
          size={2}
          speed={0.3}
          opacity={0.8}
          color={nodeConfig.glowColor}
        />
      )}
    </group>
  );
});

/**
 * Sistema de nodos premium
 */
function Nodes({ probsVector = [], topK = [], onNodeClick, safeFontUrl }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const N = useMemo(() => Math.max(probsVector.length, 12), [probsVector]);

  const positions = useMemo(() => {
    const radius = 6;
    return [...Array(N)].map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      const variation = 0.3 * Math.sin(i * 7);
      return [
        radius * Math.cos(theta) * Math.sin(phi) + variation,
        radius * Math.sin(theta) * Math.sin(phi) + variation,
        radius * Math.cos(phi) + variation,
      ];
    });
  }, [N]);

  const topIndices = useMemo(
    () => (Array.isArray(topK) ? topK.map((x) => x?.index).filter(Number.isInteger) : []),
    [topK]
  );
  const topMain = topIndices.length > 0 ? topIndices[0] : -1;

  // Refs por nodo para trazar líneas dinámicas desde sus centros reales
  const nodeRefs = useMemo(
    () => Array.from({ length: N }, () => React.createRef()),
    [N]
  );

  // Línea que se actualiza cada frame leyendo posiciones mundiales
  function ConnectionLine({ refA, refB }) {
    const lineRef = useRef();
    const a = useMemo(() => new THREE.Vector3(), []);
    const b = useMemo(() => new THREE.Vector3(), []);

    useFrame(() => {
      if (!lineRef.current || !refA.current || !refB.current) return;
      a.copy(refA.current.getCenterWorld());
      b.copy(refB.current.getCenterWorld());
      lineRef.current.geometry.setFromPoints([a, b]);
    });

    return (
      <line ref={lineRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#8C7FE9"
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </line>
    );
  }

  return (
    <group>
      {/* Fondo estelar */}
      <Stars radius={50} depth={30} count={2000} factor={4} saturation={0} fade speed={1} />

      {positions.map((p, i) => {
        const prob = probsVector[i] ?? 0;
        const isTop = i === topMain;
        const isNear = topIndices.includes(i) && !isTop;
        const diseaseId = i;

        return (
          <DiseaseNode
            key={i}
            ref={nodeRefs[i]}
            position={p}
            prob={prob}
            diseaseId={diseaseId}
            isTop={isTop}
            isNear={isNear}
            index={i}
            onNodeClick={onNodeClick}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
            safeFontUrl={safeFontUrl}
          />
        );
      })}

      {/* Conexiones entre nodo principal y los siguientes (dinámicas) */}
      {topMain >= 0 &&
        topIndices.slice(1).map((j, idx) => (
          <ConnectionLine key={idx} refA={nodeRefs[topMain]} refB={nodeRefs[j]} />
        ))}
    </group>
  );
}

/**
 * Panel de información premium
 */
function DiseaseInfoPanel({ disease, position, onClose }) {
  if (!disease) return null;

  const getSeverityColor = (severity) => {
    const colors = {
      Alta: "#F15F79",
      "Moderada-Alta": "#FF6B35",
      Moderada: "#FFA726",
      "Leve-Moderada": "#34C759",
      Leve: "#8C7FE9",
      "Muy Baja": "#828E9D",
    };
    return colors[severity] || "#828E9D";
  };

  return (
    <Html position={position} center>
      <div
        className="
        bg-white/95 backdrop-blur-2xl 
        rounded-3xl 
        shadow-2xl 
        border border-white/40
        p-6 
        max-w-sm w-80 
        animate-scaleIn
        relative
        overflow-hidden
      "
      >
        {/* Efectos de fondo */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-[#8C7FE9]/10 rounded-full blur-2xl -translate-y-10 translate-x-10"></div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">{disease.icon}</div>
              <div>
                <h3 className="font-bold text-[#342B7C] text-lg font-sans">{disease.name}</h3>
                <p className="text-[#342B7C]/60 text-sm italic font-light">{disease.scientificName}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="
                w-8 h-8 
                bg-white/80 hover:bg-[#F15F79]/10 
                rounded-xl 
                flex items-center justify-center 
                transition-all duration-300
                border border-white/40
                hover:scale-110
              "
            >
              <FaTimes className="w-3 h-3 text-[#342B7C]" />
            </button>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9] rounded-xl p-3 text-center">
              <div className="text-xs text-[#342B7C]/60 font-medium">Severidad</div>
              <div
                className="font-bold text-[#342B7C] text-sm"
                style={{ color: getSeverityColor(disease.severity) }}
              >
                {disease.severity}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9] rounded-xl p-3 text-center">
              <div className="text-xs text-[#342B7C]/60 font-medium">Contagioso</div>
              <div className={`font-bold text-sm ${disease.contagious ? "text-[#F15F79]" : "text-[#34C759]"}`}>
                {disease.contagious ? "Sí" : "No"}
              </div>
            </div>
          </div>

          {/* Síntomas */}
          <div className="mb-4">
            <h4 className="font-semibold text-[#342B7C] text-sm mb-3 flex items-center space-x-2">
              <FaStethoscope className="w-3 h-3 text-[#8C7FE9]" />
              <span>Síntomas Principales</span>
            </h4>
            <div className="space-y-2">
              {disease.symptoms.slice(0, 3).map((s, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-sm text-[#342B7C]/80">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-full mt-1.5 flex-shrink-0"></div>
                  <span className="font-light leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alerta urgente */}
          {disease.urgent && (
            <div
              className="
              bg-gradient-to-r from-[#F15F79]/10 to-[#C19CFF]/10 
              border border-[#F15F79]/30 
              rounded-xl p-3 mb-4
            "
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-[#F15F79] to-[#C19CFF] rounded-lg flex items-center justify-center">
                  <FaExclamationTriangle className="text-white w-3 h-3" />
                </div>
                <div>
                  <p className="font-bold text-[#F15F79] text-sm">Condición Urgente</p>
                  <p className="text-[#342B7C]/70 text-xs font-light">Requiere atención médica inmediata</p>
                </div>
              </div>
            </div>
          )}

          {/* Botón de acción */}
          <button
            className="
            w-full 
            bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] 
            text-white py-3 px-4 
            rounded-2xl 
            font-semibold 
            hover:shadow-xl 
            transition-all duration-500 
            transform hover:scale-105
            flex items-center justify-center space-x-2
            group
            overflow-hidden
          "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <FaLightbulb className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Ver Detalles Completos</span>
          </button>
        </div>
      </div>
    </Html>
  );
}

/**
 * Componente principal premium
 */
export default function Prediction3D({ probsVector, topK, selectedImage }) {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [infoPanelPosition, setInfoPanelPosition] = useState([0, 0, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const [safeFontUrl, setSafeFontUrl] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef();

  // Cargar fuente
  useEffect(() => {
    let mounted = true;
    preflightFont("/fonts/Inter-Bold.ttf").then((url) => {
      if (mounted) setSafeFontUrl(url);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const handleNodeClick = (diseaseId, position) => {
    const disease = DISEASES_DATA.find((d) => d.id === diseaseId);
    if (disease) {
      setSelectedDisease(disease);
      setInfoPanelPosition([position[0] * 1.8, position[1] * 1.8 + 3, position[2] * 1.8]);
    }
  };

  const handleClosePanel = () => setSelectedDisease(null);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`
        w-full h-full rounded-3xl overflow-hidden relative 
        bg-gradient-to-br from-[#342B7C]/10 to-[#8C7FE9]/10 
        border border-white/40
        shadow-2xl
        group/canvas
        ${isFullscreen ? "fixed inset-0 z-50" : ""}
      `}
    >
      <Canvas camera={{ position: [0, 0, 15], fov: 45, near: 0.1, far: 1000 }} onCreated={() => setIsLoading(false)} gl={{ antialias: true }}>
        <color attach="background" args={["#0A0F2C"]} />

        <ambientLight intensity={0.4} />
        <directionalLight position={[15, 15, 10]} intensity={1.2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8C7FE9" />
        <pointLight position={[10, 10, 10]} intensity={0.3} color="#F15F79" />

        <fog attach="fog" args={["#0A0F2C", 20, 50]} />

        <Nodes probsVector={probsVector} topK={topK} onNodeClick={handleNodeClick} safeFontUrl={safeFontUrl} />

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={8}
          maxDistance={25}
          autoRotate={!selectedDisease}
          autoRotateSpeed={1}
          dampingFactor={0.05}
        />

        {selectedDisease && <DiseaseInfoPanel disease={selectedDisease} position={infoPanelPosition} onClose={handleClosePanel} />}
      </Canvas>

      {/* Loading State Premium */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#342B7C] to-[#0A0F2C] backdrop-blur-xl">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-[#8C7FE9] to-[#C19CFF] rounded-3xl animate-spin">
                <div className="absolute inset-3 bg-[#0A0F2C] rounded-2xl"></div>
              </div>
              <FaRocket className="w-8 h-8 text-[#8C7FE9] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <h3 className="text-white font-semibold text-xl mb-2">Inicializando Visualización 3D</h3>
            <p className="text-white/60 font-light">Cargando universo de diagnósticos...</p>

            {/* Indicador de progreso */}
            <div className="flex justify-center space-x-2 mt-6">
              {[1, 2, 3, 4, 5].map((dot) => (
                <div key={dot} className="w-2 h-2 bg-[#8C7FE9] rounded-full animate-bounce" style={{ animationDelay: `${dot * 0.1}s` }}></div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Estado vacío premium */}
      {!topK && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="
            text-center 
            bg-white/90 backdrop-blur-2xl 
            rounded-3xl p-8 
            border border-white/40 
            shadow-2xl
            max-w-md
            mx-4
          "
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#FDEEFD] to-[#D8DFF9] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <FaRocket className="w-10 h-10 text-[#8C7FE9]" />
            </div>
            <h3 className="font-bold text-[#342B7C] text-2xl mb-3 font-sans">Universo de Diagnósticos</h3>
            <p className="text-[#342B7C]/70 text-lg mb-2 font-light">Esperando análisis para mostrar resultados</p>
            <p className="text-[#342B7C]/50 text-sm">Sube una imagen o usa la cámara para comenzar el viaje</p>
          </div>
        </div>
      )}

      {/* Controles de interfaz premium */}
      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-2xl">
        <div className="space-y-3 text-sm text-[#342B7C]">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-[#F15F79] rounded-full shadow-lg"></div>
            <span className="font-semibold">Diagnóstico Principal</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-[#8C7FE9] rounded-full shadow-lg"></div>
            <span className="font-semibold">Otras Posibilidades</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-[#34C759] rounded-full shadow-lg"></div>
            <span className="font-semibold">Enfermedades</span>
          </div>
        </div>
      </div>

      {/* Panel de información premium */}
      <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-2xl max-w-xs">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-xl flex items-center justify-center">
            <FaLightbulb className="text-white w-3 h-3" />
          </div>
          <p className="text-[#342B7C] font-semibold text-sm">Interactúa con la Visualización</p>
        </div>
        <ul className="text-[#342B7C]/70 text-xs space-y-2 font-light">
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-[#8C7FE9] rounded-full"></div>
            <span>Haz clic en cualquier nodo para ver detalles</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-[#8C7FE9] rounded-full"></div>
            <span>Arrastra para rotar la vista</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-[#8C7FE9] rounded-full"></div>
            <span>Usa la rueda para hacer zoom</span>
          </li>
        </ul>
      </div>

      {/* Botón de pantalla completa premium */}
      <button
        onClick={toggleFullscreen}
        className="
          absolute top-6 left-6
          bg-white/90 backdrop-blur-xl 
          rounded-2xl p-3 
          border border-white/40 
          shadow-2xl
          transition-all duration-500
          hover:scale-110 hover:shadow-3xl
          group/fs
        "
      >
        {isFullscreen ? (
          <FaCompress className="w-5 h-5 text-[#342B7C] group-hover/fs:text-[#8C7FE9] transition-colors duration-300" />
        ) : (
          <FaExpand className="w-5 h-5 text-[#342B7C] group-hover/fs:text-[#8C7FE9] transition-colors duration-300" />
        )}
      </button>

      {/* Disclaimer premium */}
      <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white/40 shadow-2xl max-w-xs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-[#342B7C] to-[#8C7FE9] rounded-xl flex items-center justify-center">
            <FaShieldAlt className="text-white w-3 h-3" />
          </div>
          <p className="text-[#342B7C] text-xs font-semibold">Visualización Educativa</p>
        </div>
        <p className="text-[#342B7C]/60 text-xs mt-2 font-light">
          Representación 3D de probabilidades diagnósticas con fines educativos
        </p>
      </div>
    </div>
  );
}
