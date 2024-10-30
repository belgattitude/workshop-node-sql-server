import type { Preview } from '@storybook/react';
import { fontInter } from '@/components/fonts/FontInter';
import '@/styles/globals.css';

import './global.css';
import {ReactQueryClientProvider} from "@/providers/ReactQueryClientProvider";
import {PrimeReactTailwindProvider} from "@/providers/PrimeReactTailwindProvider";

const preview: Preview = {
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export const decorators = [
  (Story, context) => {
    return (
          <ReactQueryClientProvider forceDisableDevTools={true}>
             <PrimeReactTailwindProvider>
                  <main
                    className={`${fontInter.className}`}
                  >
                    <Story />
                  </main>
              </PrimeReactTailwindProvider>
          </ReactQueryClientProvider>
    );
  },
] as const satisfies Preview['decorators'];

export default preview;
