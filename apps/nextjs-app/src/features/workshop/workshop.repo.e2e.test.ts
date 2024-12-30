import { assertQueryResultSuccess } from '@flowblade/core';

import { workshopRepo } from '@/features/workshop/workshop.config';

describe('WorkshopRepo', () => {
  it('getStarter should match snapshot', async () => {
    const result = await workshopRepo.getStarter({ limit: 10 });
    assertQueryResultSuccess(result);
    result.meta!.timeMs = 0.1;
    expect(result).toMatchSnapshot();
  });
});
