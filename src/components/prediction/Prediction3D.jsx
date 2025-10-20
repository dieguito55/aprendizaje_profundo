import React, { useMemo, useState, useRef, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import * as THREE from "three";
import { DISEASES_DATA } from "../../data/diseases";

extend(THREE);

// ------- util: valida cabecera de fuente -------
async function preflightFont(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const b = new Uint8Array(buf.slice(0, 4));
    const sig = String.fromCharCode(...b); // e.g. 'OTTO'
    // TTF: 00 01 00 00
    const isTTF = b[0] === 0x00 && b[1] === 0x01 && b[2] === 0x00 && b[3] === 0x00;
    // OTF (CFF): 'OTTO'
    const isOTF = sig === "OTTO";
    // No aceptamos WOFF/WOFF2 ('wOFF'/'wOF2') para evitar el DataView error
    return (isTTF || isOTF) ? url : null;
  } catch {
    return null;
  }
}

/**
 * Nodo interactivo
 */
function DiseaseNode({
  position,
  prob,
  diseaseId,
  isTop,
  isNear,
  index,
  onNodeClick,
  hoveredNode,
  setHoveredNode,
  safeFontUrl
}) {
  const meshRef = useRef();
  const [isHovered, setIsHovered] = useState(false);

  const nodeConfig = useMemo(() => {
    const baseColors = {
      top: "#F15F79",
      near: "#4A86E8",
      normal: "#828E9D",
    };

    if (isTop) {
      return {
        color: baseColors.top,
        glowColor: baseColors.top,
        scale: 0.65 + (prob || 0) * 0.3,
        glowOpacity: 0.8,
        metalness: 0.3,
        roughness: 0.2,
      };
    }
    if (isNear) {
      return {
        color: baseColors.near,
        glowColor: baseColors.near,
        scale: 0.45 + (prob || 0) * 0.2,
        glowOpacity: 0.4,
        metalness: 0.4,
        roughness: 0.3,
      };
    }
    return {
      color: baseColors.normal,
      glowColor: baseColors.normal,
      scale: 0.3 + (prob || 0) * 0.15,
      glowOpacity: 0.15 + (prob || 0) * 0.1,
      metalness: 0.5,
      roughness: 0.4,
    };
  }, [isTop, isNear, prob]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // flotación + rotación sutil
    meshRef.current.position.y = position[1] + Math.sin(time * 2 + index) * 0.1;
    meshRef.current.rotation.y += 0.01;

    // pulso si es top o hover
    if (isTop || isHovered) {
      const pulseScale = 1 + Math.sin(time * 4) * 0.1;
      meshRef.current.scale.setScalar(nodeConfig.scale * pulseScale);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onNodeClick(diseaseId, position);
  };

  const disease = DISEASES_DATA.find((d) => d.id === diseaseId);

  return (
    <group position={position}>
      {/* halo */}
      <mesh scale={nodeConfig.scale * 2.2}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial
          color={nodeConfig.glowColor}
          transparent
          opacity={nodeConfig.glowOpacity}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* nodo */}
      <mesh
        ref={meshRef}
        scale={nodeConfig.scale}
        onClick={handleClick}
        onPointerOver={(e) => { e.stopPropagation(); setIsHovered(true); setHoveredNode(diseaseId); }}
        onPointerOut={(e) => { e.stopPropagation(); setIsHovered(false); setHoveredNode(null); }}
      >
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={nodeConfig.color}
          metalness={nodeConfig.metalness}
          roughness={nodeConfig.roughness}
          emissive={isHovered ? nodeConfig.glowColor : "#000000"}
          emissiveIntensity={isHovered ? 0.3 : 0}
        />
      </mesh>

      {/* etiqueta superior */}
      {(isTop || isHovered) && disease && Number.isFinite(prob) && (
        <Text
          position={[0, nodeConfig.scale + 0.5, 0]}
          fontSize={0.3}
          color="white"
          anchorX="center"
          anchorY="bottom"
          // si safeFontUrl es null/undefined, drei usa fuente por defecto
          font={safeFontUrl || undefined}
        >
          {disease.name}
        </Text>
      )}

      {/* probabilidad */}
      {isHovered && Number.isFinite(prob) && (
        <Text
          position={[0, -nodeConfig.scale - 0.3, 0]}
          fontSize={0.2}
          color="#cccccc"
          anchorX="center"
          anchorY="top"
          font={safeFontUrl || undefined}
        >
          {(prob * 100).toFixed(1)}%
        </Text>
      )}
    </group>
  );
}

/**
 * Sistema de nodos
 */
function Nodes({ probsVector = [], topK = [], onNodeClick, safeFontUrl }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const N = useMemo(() => Math.max(probsVector.length, 10), [probsVector]);

  const positions = useMemo(() => {
    const radius = 4.5;
    return [...Array(N)].map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / N);
      const theta = Math.sqrt(N * Math.PI) * phi;
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ];
    });
  }, [N]);

  const topIndices = useMemo(
    () => (Array.isArray(topK) ? topK.map((x) => x?.index).filter(Number.isInteger) : []),
    [topK]
  );
  const topMain = topIndices.length > 0 ? topIndices[0] : -1;

  return (
    <group>
      {positions.map((p, i) => {
        const prob = probsVector[i] ?? 0;
        const isTop = i === topMain;
        const isNear = topIndices.includes(i) && !isTop;
        const diseaseId = i;

        return (
          <DiseaseNode
            key={i}
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

      {/* líneas solo si hay topMain válido */}
      {topMain >= 0 &&
        topIndices.slice(1).map((j, idx) => (
          <line key={idx}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                array={new Float32Array([...positions[topMain], ...positions[j]])}
                count={2}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#F15F79" transparent opacity={0.6} linewidth={2} />
          </line>
        ))}
    </group>
  );
}

/**
 * Panel info
 */
function DiseaseInfoPanel({ disease, position, onClose }) {
  if (!disease) return null;
  return (
    <Html position={position} center>
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6 max-w-sm w-80 animate-scaleIn">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{disease.icon}</div>
            <div>
              <h3 className="font-bold text-[#082543] text-lg">{disease.name}</h3>
              <p className="text-[#082543]/60 text-sm italic">{disease.scientificName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-[#082543]/10 hover:bg-[#F15F79]/10 rounded-lg flex items-center justify-center transition-colors"
          >
            <span className="text-[#082543] text-lg">×</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="bg-[#082543]/5 rounded-lg p-2 text-center">
            <div className="text-xs text-[#082543]/60">Severidad</div>
            <div className="font-bold text-[#082543] text-sm">{disease.severity}</div>
          </div>
          <div className="bg-[#082543]/5 rounded-lg p-2 text-center">
            <div className="text-xs text-[#082543]/60">Contagioso</div>
            <div className="font-bold text-[#082543] text-sm">{disease.contagious ? "Sí" : "No"}</div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-[#082543] text-sm mb-2">Síntomas:</h4>
          <div className="space-y-1">
            {disease.symptoms.slice(0, 3).map((s, idx) => (
              <div key={idx} className="flex items-start space-x-2 text-xs text-[#082543]/80">
                <div className="w-1 h-1 bg-[#F15F79] rounded-full mt-1.5 flex-shrink-0"></div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        {disease.urgent && (
          <div className="bg-gradient-to-r from-[#F15F79]/10 to-[#4C2D4D]/10 border border-[#F15F79]/30 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-[#F15F79] text-lg">⚠️</span>
              <div>
                <p className="font-bold text-[#F15F79] text-sm">Condición Urgente</p>
                <p className="text-[#082543]/70 text-xs">Requiere atención médica inmediata</p>
              </div>
            </div>
          </div>
        )}

        <button className="w-full bg-gradient-to-r from-[#F15F79] to-[#4C2D4D] text-white py-2 px-4 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
          Ver Detalles Completos
        </button>
      </div>
    </Html>
  );
}

/**
 * Componente principal
 */
export default function Prediction3D({ probsVector, topK, selectedImage }) {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [infoPanelPosition, setInfoPanelPosition] = useState([0, 0, 0]);
  const [isLoading, setIsLoading] = useState(true);
  const [safeFontUrl, setSafeFontUrl] = useState(null);

  // intenta usar Inter; si no es válida, hacemos fallback silencioso
  useEffect(() => {
    let mounted = true;
    preflightFont("/fonts/Inter-Bold.ttf").then((url) => {
      if (mounted) setSafeFontUrl(url); // url o null
    });
    return () => { mounted = false; };
  }, []);

  const handleNodeClick = (diseaseId, position) => {
    const disease = DISEASES_DATA.find((d) => d.id === diseaseId);
    if (disease) {
      setSelectedDisease(disease);
      setInfoPanelPosition([position[0] * 1.5, position[1] * 1.5 + 2, position[2] * 1.5]);
    }
  };

  const handleClosePanel = () => setSelectedDisease(null);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative bg-gradient-to-br from-[#082543]/5 to-[#258CAB]/10 border border-white/20">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50, near: 0.1, far: 1000 }}
        onCreated={() => setIsLoading(false)}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        <Nodes
          probsVector={probsVector}
          topK={topK}
          onNodeClick={handleNodeClick}
          safeFontUrl={safeFontUrl}
        />

        <OrbitControls
          enablePan
          enableZoom
          enableRotate
          minDistance={5}
          maxDistance={20}
          autoRotate={!selectedDisease}
          autoRotateSpeed={0.5}
        />

        {selectedDisease && (
          <DiseaseInfoPanel disease={selectedDisease} position={infoPanelPosition} onClose={handleClosePanel} />
        )}
      </Canvas>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="relative mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-[#F15F79] to-[#258CAB] rounded-2xl animate-spin">
                <div className="absolute inset-2 bg-white rounded-lg"></div>
              </div>
            </div>
            <p className="text-[#082543] font-semibold">Cargando Visualización 3D</p>
          </div>
        </div>
      )}

      {!topK && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-[#082543]/60 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="w-20 h-20 bg-gradient-to-br from-[#082543]/10 to-[#258CAB]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="font-semibold text-[#082543] text-lg mb-2">Esperando Análisis</h3>
            <p className="text-[#082543]/60">Sube una imagen o usa la cámara para comenzar</p>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
        <div className="space-y-2 text-xs text-[#082543]">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#F15F79] rounded-full"></div>
            <span>Diagnóstico Principal</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#4A86E8] rounded-full"></div>
            <span>Otras Posibilidades</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#828E9D] rounded-full"></div>
            <span>Enfermedades</span>
          </div>
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 border border-white/20 shadow-lg">
        <p className="text-xs text-[#082543]/70 text-center">
          💡 Haz clic en cualquier nodo<br/>para ver información
        </p>
      </div>
    </div>
  );
}
