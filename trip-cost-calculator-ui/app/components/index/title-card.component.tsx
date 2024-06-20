import Card from "../card.component";
import Icon from "../icon.component";

export type TitleCardProps = {
  addNewRow: () => void;
};

export default function TitleCard({ addNewRow }: TitleCardProps) {
  return (
    <Card className="flex justify-center">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl text-center">Trip Cost Calculator</h1>
        <Card
          className="bg-white w-full flex justify-evenly items-center text-green-500"
          onClick={addNewRow}
        >
          <Icon name="add" className="text-5xl" />
          <p className="size-fit">Add another person</p>
        </Card>
      </div>
    </Card>
  );
}
