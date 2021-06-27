import reactRefresh from "@vitejs/plugin-react-refresh";
import vite from "vite";

const config = vite.defineConfig({
  base: '/15puzzle/',
  plugins: [reactRefresh()],
});

export default config;