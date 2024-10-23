import { assertQueryResultSuccess } from '@flowblade/source-kysely';

import { workshopRepo } from '@/features/workshop/workshop.config';

describe('WorkshopRepo', () => {
  it('getStarter should match snapshot', async () => {
    const result = await workshopRepo.getStarter({ limit: 10 });
    assertQueryResultSuccess(result);
    const stabletimeMs = 0.1;
    result.meta!.timeMs = stabletimeMs;
    expect(result).toMatchSnapshot();
  });
});
