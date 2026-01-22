"use client";
import { useGlobal } from "@/src/entities/home/hooks/homeHooks";
import { GlobalListType } from "@/src/entities/home/model/type";
import { useHomeGlobalSearch } from "@/src/features/home/hooks/hooks";
import { PageTransition } from "@/src/shared/ui/animation";
import { HomeResultSectionBlock } from "./components/homeResultSectionBlock";

export const HomeResultSection = ({ q }: { q: string }) => {
  const { data: globalData } = useGlobal<GlobalListType>({ params: "overview", q: q });
  const data = useHomeGlobalSearch(globalData);

  return (
    <PageTransition>
      <section className="flex h-screen flex-col gap-5 bg-greyscale-grey-25 p-5">
        {data.map(section => (
          <HomeResultSectionBlock
            key={section.category}
            category={section.category}
            items={section.content}
            limit={5}
            q={q}
          />
        ))}
      </section>
    </PageTransition>
  );
};
