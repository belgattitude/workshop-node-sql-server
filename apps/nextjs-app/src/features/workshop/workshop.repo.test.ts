import { workshopRepo } from '@/features/workshop/workshop.config';

describe('workshop.repo', () => {
  it('should work', async () => {
    const result = await workshopRepo.getBrands({ limit: 10 });
    expect(result).toMatchSnapshot();
  });
});
