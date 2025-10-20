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
        await tf.ready();
        try { await tf.setBackend("webgl"); } catch {}
        await tf.nextFrame();

        const manifest = await loadManifest();
        const v = resolveVersion(manifest);
        const m = await loadModelFrom(manifest, v);
        // warmup
        m.predict(tf.zeros([1,224,224,3])).dispose();

        if (!mounted) return;
        setModel(m);
        setLabels(manifest.labels || []);
        setVersion(v);
      } catch (e) {
        if (mounted) setErr(e.message || "Fallo cargando el modelo");
      } finally {
        if (mounted) setLoad(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { model, labels, version, loading, error };
};
