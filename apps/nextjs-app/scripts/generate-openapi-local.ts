import path from 'node:path';
import url from 'node:url';

import { localApiConfig } from '@/config/local-api.config';
import { generateOpenApiTypes } from '@/lib/generators/generate-open-api-types';

const basePath = path.resolve(
  path.dirname(url.fileURLToPath(import.meta.url)),
  '..'
);

export const schema = localApiConfig.openApiSchemaUrl;
export const generatedFile = `${basePath}/src/lib/openapi/local-api.types.generated.ts`;

await generateOpenApiTypes(schema, generatedFile);
