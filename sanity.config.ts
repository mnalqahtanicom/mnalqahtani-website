import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { apiVersion, dataset, projectId } from './lib/sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Mohammed Al-Qahtani — Studio',
  basePath: '/studio',
  projectId,
  dataset,
  plugins: [structureTool(), visionTool({ defaultApiVersion: apiVersion })],
  schema: { types: schemaTypes },
});
