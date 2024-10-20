import { CityMultiSelect } from '@/components/prime/CityMultiSelect';
import { FolderTreeSelect } from '@/components/prime/FolderTreeSelect';
import { SideBar } from '@/components/sidebar/SideBar';

export default function TreeuDemoRoute() {
  return (
    <div className={'p-10'}>
      <SideBar>
        <div className={'m-5 flex flex-col gap-5'}>
          <CityMultiSelect />
          <FolderTreeSelect />
        </div>
      </SideBar>
    </div>
  );
}
