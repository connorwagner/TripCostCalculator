import ReactModal from "react-modal";
import Card from "../card.component";
import { pageRootElementId } from "~/constants";

export type AddMemberModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  containerClassName?: string;
};

export default function AddMemberModal({
  isOpen,
  setIsOpen,
}: AddMemberModalProps) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      parentSelector={() => document.querySelector(`#${pageRootElementId}`)!}
      className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
      overlayClassName="absolute inset-0 bg-gray-700 bg-opacity-80"
    >
      <Card>
        <h1>test content 3</h1>
      </Card>
    </ReactModal>
  );
}
