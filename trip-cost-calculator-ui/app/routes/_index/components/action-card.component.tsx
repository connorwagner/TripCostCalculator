import Card from "~/components/card.component";
import Icon from "~/components/icon.component";

export type ActionCardProps = {
  goEnabled: boolean;
  goClicked: () => void;
};

export default function ActionCard({ goEnabled, goClicked }: ActionCardProps) {
  const goClickHandler = () => {
    if (!goEnabled) {
      return;
    }

    goClicked();
  };

  return (
    <div
      className={`w-full flex justify-evenly items-center ${
        goEnabled ? "text-green-500" : "text-green-700"
      }`}
    >
      <Card
        colorClass={goEnabled ? undefined : "bg-gray-400"}
        className={`${!goEnabled ? "" : ""}w-fit flex items-center space-x-4`}
        onClick={goClickHandler}
      >
        <Icon name="calculate" />
        <p className="size-fit">Go</p>
      </Card>
    </div>
  );
}
