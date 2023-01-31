import { useSelectorStore } from '../../hooks';

export const FabAddNew = () => {
  const {
    ui: { isDateModalOpen },
    onOpenDateModal
  } = useSelectorStore();

  return (
    <button className="btn btn-primary fab" disabled={isDateModalOpen} onClick={onOpenDateModal}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
