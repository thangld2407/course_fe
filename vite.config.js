import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    plugins: [react()],
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": `${__dirname}/src`,
        // eslint-disable-next-line no-undef
        "@components": `${__dirname}/src/components`,
      },
    },
  };
});
