import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess'; // ✅ DAS ist korrekt

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },
  compilerOptions: {
    runes: true // ✅ Runes korrekt aktiviert
  },
  preprocess: preprocess() // ✅ das ist korrekt
};

export default config;
