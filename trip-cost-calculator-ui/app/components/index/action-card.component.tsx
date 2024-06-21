import Card from "../card.component";
import Icon from "../icon.component";

export default function ActionCard() {
  return (
    <Card className="w-full flex justify-evenly items-center text-green-500">
      <Card colorClass="bg-white" className="w-fit flex items-center space-x-4">
        <Icon name="calculate" />
        <p className="size-fit">Go</p>
      </Card>
    </Card>
  );
}
