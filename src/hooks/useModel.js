// src/hooks/useModel.js
import { useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadManifest, resolveVersion } from "../lib/manifest";
import { loadModelFrom } from "../lib/model";

export const useModel = () => {
  const [model, setModel] = useState(null);
  const [labels, setLabels] = useState([]);
  const [version, setVersion] = useState("");
  const [loading, setLoad] = useState(true);
  const [error, setErr] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        console.log('🔄 Iniciando carga del modelo...');
        await tf.ready();
        console.log('✅ TensorFlow.js listo');
        
        try { 
          await tf.setBackend("webgl"); 
          console.log('✅ Backend WebGL configurado');
        } catch (e) {
          console.warn('⚠️ WebGL no disponible, usando CPU:', e.message);
        }
        await tf.nextFrame();

        console.log('📄 Cargando manifest...');
        const manifest = await loadManifest();
        console.log('✅ Manifest cargado:', manifest);
        
        const v = resolveVersion(manifest);
        console.log('📦 Versión seleccionada:', v);
        
        console.log('🧠 Cargando modelo desde:', `/models/${v}/model.json`);
        const m = await loadModelFrom(manifest, v);
        console.log('✅ Modelo cargado exitosamente');
        
        // warmup
        console.log('🔥 Calentando modelo...');
        const warmup = m.predict(tf.zeros([1,224,224,3]));
        warmup.dispose();
        console.log('✅ Warmup completado');

        if (!mounted) return;
        setModel(m);
        setLabels(manifest.labels || []);
        setVersion(v);
        console.log('🎉 Modelo listo para usar');
      } catch (e) {
        console.error('❌ Error cargando modelo:', e);
        if (mounted) setErr(e.message || "Fallo cargando el modelo");
      } finally {
        if (mounted) setLoad(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { model, labels, version, loading, error };
};
