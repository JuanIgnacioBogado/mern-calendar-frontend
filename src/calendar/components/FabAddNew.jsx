import { useCalendarStore } from '../../hooks';

export const FabAddNew = () => {
  const { isDateModalOpen, onOpenDateModal } = useCalendarStore();

  return (
    <button className="btn btn-primary fab" disabled={isDateModalOpen} onClick={() => onOpenDateModal()}>
      <i className="fas fa-plus" />
    </button>
  );
};
