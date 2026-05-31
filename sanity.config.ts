import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { apiVersion, dataset, projectId } from './lib/sanity/env';

export default defineConfig({
  name: 'default',
  title: 'Mohammed Nasser Al-Qahtani — Studio',
  basePath: '/studio',
  studioHost: 'mnalqahtani',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: { types: schemaTypes },
});
