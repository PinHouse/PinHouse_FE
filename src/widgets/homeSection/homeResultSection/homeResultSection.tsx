"use client";
import { useGlobal } from "@/src/entities/home/hooks/homeHooks";
import { GlobalListType } from "@/src/entities/home/model/type";
import { HomeResultSectionHeader } from "@/src/features/home";
import { useHomeGlobalSearch } from "@/src/features/home/hooks/hooks";
import { HomeResultSectionItems } from "@/src/features/home/ui/result/homeResultSectionItem";
import { HomeResultSectionMore } from "@/src/features/home/ui/result/homeResultSectionMore";
import { PageTransition } from "@/src/shared/ui/animation";

export const HomeResultSection = ({ q }: { q: string }) => {
  const { data: globalData } = useGlobal<GlobalListType>({ params: "overview", q: q });
  const data = useHomeGlobalSearch(globalData);

  return (
    <PageTransition>
      <section className="flex h-screen flex-col gap-5 bg-greyscale-grey-25 p-5">
        {data.map(section => {
          return (
            <div key={section.category}>
              <span>
                <HomeResultSectionHeader
                  category={section.category}
                  count={section.content.length}
                />
              </span>
              <span className="flex flex-col rounded-xl border">
                <HomeResultSectionItems items={section.content} limit={5} q={q} />

                <HomeResultSectionMore total={section.content.length} limit={5} />
              </span>
            </div>
          );
        })}
      </section>
    </PageTransition>
  );
};
