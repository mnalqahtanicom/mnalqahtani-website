import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: '7g0z8oo6',
    dataset: 'production',
  },
  studioHost: 'mnalqahtani',
  deployment: { autoUpdates: true },
});
