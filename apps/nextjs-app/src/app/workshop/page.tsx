import { DynamicShikiCodeEditor } from '@/components/code/DynamicShikiCodeEditor';
import { productRepo } from '@/features/products/config/product-repo.config';
import { workshopRepo } from '@/features/workshop/workshop.config';

const getWorkshopDataExamples = async () => {
  return {
    product: await productRepo.search({ searchName: 'bio', limit: 10 }),
    query1: await workshopRepo.query1({ searchName: 'test', limit: 10 }),
  };
};

export default async function WorkshopRoute() {
  const data = await getWorkshopDataExamples();
  return (
    <div className={'container flex'}>
      {Object.entries(data).map(([key, value]) => {
        const { data, meta = null } = value;
        return (
          <div key={key} className={'p-5 border flex'}>
            <DynamicShikiCodeEditor
              filename={`${key}`}
              code={JSON.stringify(data, null, 2)}
              lang={'json'}
            />
            <DynamicShikiCodeEditor
              filename={`${key}`}
              code={JSON.stringify(meta, null, 2)}
              lang={'json'}
            />
          </div>
        );
      })}
    </div>
  );
}
