import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import fs from 'fs';
import path from 'path';
import jsStringEscape from 'js-string-escape';

export default defineConfig({
  esbuild: {
    keepNames: true,
    minifyIdentifiers: false,
  },
  build: {
    minify: true,

    rollupOptions: {
      preserveEntrySignatures: 'strict',
      // ...
    },
  },
  plugins: [
    viteSingleFile(),
    {
      name: 'save-as-string',
      writeBundle: (_, bundle) => {
        console.log(_.dir);
        const indexSource = (bundle['index.html'] as any).source;
        fs.writeFileSync(
          path.resolve(_.dir!, 'rn-index.html.js'),
          `export default \`${jsStringEscape(indexSource)}\`;`
        );
      },
    },
  ],
});
