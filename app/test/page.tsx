import { HomeIcon } from "@/src/assets/icons/home";
import { LogoIcon } from "@/src/assets/icons/logo";
import { Button } from "@/src/shared/ui/button/deafult";
import { Input } from "@/src/shared/ui/input/deafult";

export default function DefaultTest() {
  return (
    <div>
      <Button size={"lg"}>다음</Button>
      <Button variant="outline">아웃라인 버튼</Button>
      <Button variant="ghost">고스트 버튼</Button>
      <Button size="lg" variant="solid">
        다음
      </Button>
      <LogoIcon />
      <HomeIcon />
      <Input variant={"outline"} size={"lg"} />
    </div>
  );
}
