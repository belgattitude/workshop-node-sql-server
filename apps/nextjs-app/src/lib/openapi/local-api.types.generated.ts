export interface paths {
  '/api/workshop/start': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: {
          limit?: number;
          searchName?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description 200 OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              success: boolean;
              data?: {
                id: number;
                name: string;
              }[];
              error?: {
                message: string;
              };
              meta?: {
                affectedRows?: number;
                timeMs?: number;
                query?: {
                  sql?: string;
                  params?: unknown[];
                };
              };
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/workshop/brands': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: {
          limit?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description 200 OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              success: boolean;
              data?: {
                id: number;
                name: string;
              }[];
              error?: {
                message: string;
              };
              meta?: {
                affectedRows?: number;
                timeMs?: number;
                query?: {
                  sql?: string;
                  params?: unknown[];
                };
              };
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/workshop/products': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: {
          limit?: number;
          searchName?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description 200 OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              success: boolean;
              data?: {
                id: number;
                reference: string;
                name: string;
                barcode_ean13: string | null;
                brand_id: number | null;
                brand_name: string | null;
              }[];
              error?: {
                message: string;
              };
              meta?: {
                affectedRows?: number;
                timeMs?: number;
                query?: {
                  sql?: string;
                  params?: unknown[];
                };
              };
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/workshop/advanced': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: {
          limit?: number;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description 200 OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              success: boolean;
              data?: {
                countryId: string;
                productId: string;
                productName: string;
              }[];
              error?: {
                message: string;
              };
              meta?: {
                affectedRows?: number;
                timeMs?: number;
                query?: {
                  sql?: string;
                  params?: unknown[];
                };
              };
            };
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
  '/api/products/search': {
    parameters: {
      query?: never;
      header?: never;
      path?: never;
      cookie?: never;
    };
    get: {
      parameters: {
        query?: {
          limit?: number;
          searchName?: string;
        };
        header?: never;
        path?: never;
        cookie?: never;
      };
      requestBody?: never;
      responses: {
        /** @description 200 OK */
        200: {
          headers: {
            [name: string]: unknown;
          };
          content: {
            'application/json': {
              id: number;
              reference: string;
              name: string;
              barcode_ean13: string | null;
              brand_id: number | null;
              brand_name: string | null;
            }[];
          };
        };
      };
    };
    put?: never;
    post?: never;
    delete?: never;
    options?: never;
    head?: never;
    patch?: never;
    trace?: never;
  };
}
export type webhooks = Record<string, never>;
export interface components {
  schemas: never;
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}
export type $defs = Record<string, never>;
export type operations = Record<string, never>;
