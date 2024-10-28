import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.stories.tsx',
    '../src/**/*.stories.ts',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-themes',
    '@storybook/addon-interactions',
    '@storybook/addon-viewport',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        // lazyCompilation: true,
        useSWC: true,
      },
    },
  },
  features: {
    experimentalRSC: true,
  },
  staticDirs: ['../public'],
  docs: {
  },
};
export default config;
