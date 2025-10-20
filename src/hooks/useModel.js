// src/hooks/useModel.js
import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadModel } from "../lib/model";

export const useModel = () => {
  const [model, setModel]   = useState(null);
  const [loading, setLoad]  = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await tf.ready();
        // webgl suele ser más rápido; silencia si falla
        try { await tf.setBackend("webgl"); } catch {}
        await tf.nextFrame();

        const m = await loadModel();
        // warmup
        m.predict(tf.zeros([1,224,224,3])).dispose();

        if (mounted) setModel(m);
      } catch (e) {
        if (mounted) setError(e.message || "Fallo cargando el modelo");
      } finally {
        if (mounted) setLoad(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { model, loading, error };
};
