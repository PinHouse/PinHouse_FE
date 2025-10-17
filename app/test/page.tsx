import { Button } from "@/src/shared/ui/button";

export default function DefaultTest() {
  return (
    <div>
      <Button size={"md"}>다음</Button>
      <Button variant="outline">아웃라인 버튼</Button>
      <Button variant="ghost">고스트 버튼</Button>
      <Button size="lg" variant="solid">
        다음
      </Button>
    </div>
  );
}
