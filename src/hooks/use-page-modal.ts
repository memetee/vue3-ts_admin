import { ref } from 'vue';
import PageModal from '@/components/page-modal';

type CallbackFn = () => void;

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref({});
  const handleNewData = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    newCb && newCb();
  };
  const handleEditData = (item: any) => {
    if (pageModalRef.value) {
      defaultInfo.value = { ...item };
      pageModalRef.value.dialogVisible = true;
    }
    editCb && editCb();
  };
  return [handleNewData, handleEditData, pageModalRef, defaultInfo];
}
