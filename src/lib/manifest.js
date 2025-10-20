// src/lib/manifest.js
export async function loadManifest() {
  const bust = Date.now();
  const res = await fetch(`/models/manifest.json?_=${bust}`);
  if (!res.ok) throw new Error(`No se pudo cargar manifest.json (${res.status})`);
  return res.json();
}

export function resolveVersion(manifest) {
  const urlParam = new URLSearchParams(window.location.search).get("model");
  if (urlParam && manifest.available.includes(urlParam)) return urlParam;
  return manifest.latest;
}
