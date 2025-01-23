import { workshopRepo } from '@/features/workshop/workshop.config';

describe('WorkshopRepo', () => {
  it('getStarter should match snapshot', async () => {
    const result = await workshopRepo.getStarter({ limit: 10 });
    expect(result.isOk()).toBe(true);
    const spans = result.meta.getSpans().map((span) => {
      return {
        ...span,
        timeMs: 1,
      };
    });
    expect(spans).toMatchSnapshot('spans');
  });
});
