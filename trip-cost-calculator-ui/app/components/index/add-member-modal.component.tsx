import ReactModal from "react-modal";
import Card from "../card.component";

export type AddMemberModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  appElement: HTMLElement | null;
  parentElement: HTMLElement | null;
};

export default function AddMemberModal({
  isOpen,
  setIsOpen,
  appElement,
  parentElement,
}: AddMemberModalProps) {
  if (!appElement || !parentElement) return <></>;

  return (
    <ReactModal
      appElement={appElement}
      parentSelector={() => parentElement}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      overlayClassName="absolute inset-0 bg-gray-700 bg-opacity-80"
    >
      <Card>
        <h1>Add a person</h1>
      </Card>
    </ReactModal>
  );
}
