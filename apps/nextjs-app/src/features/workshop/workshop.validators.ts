import { z } from 'zod';

import type { WorkshopValidator } from '@/features/workshop/workshop.utils';

const zBrand = z.object({
  id: z.number(),
  name: z.string(),
});

const zProductWithBrand = z.object({
  id: z.number(),
  reference: z.string(),
  name: z.string(),
  barcode_ean13: z.string().nullable(),
  brand_id: z.number().nullable(),
  brand_name: z.string().nullable(),
});

type WorkshopValidatorObject = Record<string, WorkshopValidator>;

export const workshopValidators = {
  getStarter: {
    params: z.object({
      limit: z.coerce.number().optional().default(100),
      searchName: z.string().optional(),
    }),
    result: z.array(zBrand),
  },
  getBrands: {
    params: z.object({
      limit: z.coerce.number().optional().default(100),
    }),
    result: z.array(zBrand),
  },
  getProducts: {
    params: z.object({
      limit: z.coerce.number().optional().default(100),
      searchName: z.string().optional(),
    }),
    result: z.array(zProductWithBrand),
  },
  getAdvanced: {
    params: z.object({
      limit: z.coerce.number().optional().default(100),
    }),
    result: z.array(
      z.object({
        countryId: z.string(),
        productId: z.string(),
        productName: z.string(),
      })
    ),
  },
} as const satisfies WorkshopValidatorObject;

export type WorkshopValidators = typeof workshopValidators;
