import { DropDown } from "@/src/shared/ui/dropDown/deafult";
import { quickSearchPinPoint } from "../../model";

const ChoosePinPoint = () => {
  return (
    <div className="h-full">
      <DropDown variant={"solid"} types="myHome" data={quickSearchPinPoint} />
    </div>
  );
};

export default ChoosePinPoint;
