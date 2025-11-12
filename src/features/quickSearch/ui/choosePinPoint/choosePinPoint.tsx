import { DropDown } from "@/src/shared/ui/dropDown/deafult";
import { quickSearchPinPoint } from "../../model";

const ChoosePinPoint = () => {
  return (
    <div className="h-full">
      <DropDown
        variant={"solid"}
        size="lg"
        types="myHome"
        data={quickSearchPinPoint}
        className="rounded text-sm"
      />
    </div>
  );
};

export default ChoosePinPoint;
