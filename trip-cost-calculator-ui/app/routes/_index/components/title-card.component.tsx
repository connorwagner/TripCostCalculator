import Card from "~/components/card.component";
import Icon from "~/components/icon.component";

export type TitleCardProps = {
  addNewRow: () => void;
};

export default function TitleCard({ addNewRow }: TitleCardProps) {
  return (
    <Card className="flex justify-center mb-4">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-3xl text-center">Trip Cost Calculator</h1>
        <Card
          colorClass="bg-white"
          className="w-full flex justify-evenly items-center text-green-500"
          onClick={addNewRow}
        >
          <Icon name="add" className="text-5xl" />
          <p className="size-fit">Add another person</p>
        </Card>
      </div>
    </Card>
  );
}
