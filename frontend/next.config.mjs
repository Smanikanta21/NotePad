/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  /* config options here */
  // Disable React Compiler to avoid requiring external babel plugin
  reactCompiler: false,
  // Ensure Turbopack knows the workspace root (parent folder)
  turbopack: {
    root: path.resolve(__dirname, '..')
  }
};

export default nextConfig;
