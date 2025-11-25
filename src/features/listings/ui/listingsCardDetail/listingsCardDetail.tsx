import { LeftButton } from "@/src/assets/icons/button";
import { SmallHomeLine } from "@/src/assets/icons/home/smallHomeLine";
import { Button } from "@/src/shared/lib/headlessUi";
import { TagButton } from "@/src/shared/ui/button/tagButton";

export const ListingsCardDetail = () => {
  return (
    <div className="mx-auto w-full max-w-md bg-white">
      <header className="sticky top-0 z-10 border-b border-greyscale-grey-100 bg-white">
        <div className="flex h-12 items-center text-base font-semibold">
          <LeftButton className="h-6 w-6" />
          <p className="font-suit absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-greyscale-grey-800">
            공고 상세
          </p>
        </div>
      </header>

      <main className="px-4 pb-20">
        <section className="py-4">
          <div className="mb-2 flex items-center gap-1">
            <span className="rounded bg-primary-blue-25 px-2 py-0.5 text-xs font-medium text-primary-blue-300">
              행복주택
            </span>
            <span className="flex items-center gap-2 text-xs text-greyscale-grey-500">
              <div>
                <Button
                  variant={"outline"}
                  size={"xs"}
                  radius={"sm"}
                  className="h-5 border-greyscale-grey-200 text-[11px] font-medium text-greyscale-grey-600"
                >
                  연립주택
                </Button>
              </div>
              <p className="font-semibold">LH</p>
            </span>
          </div>
          <h1 className="line-clamp-2 truncate text-lg font-semibold leading-snug text-greyscale-grey-900">
            공고명 영역 한줄입니다 넘어갈 시 말줄임
            처리ssssssssssssssssssssssssssssssssssssssssssssssssss
          </h1>
          <p className="mt-1 text-xs text-greyscale-grey-400">모집일정 YYYY.MM.DD - YYYY.MM.DD</p>
        </section>

        <section className="pb-2">
          <button className="flex h-10 w-full items-center justify-center gap-1 rounded-lg bg-primary-blue-25 text-sm font-medium text-primary-blue-300">
            <SmallHomeLine /> 방 비교하기
          </button>
        </section>

        <section className="overflow-x-auto border-y border-greyscale-grey-75 py-3">
          <div className="flex min-w-max gap-2">
            {["거리", "지역", "비용", "면적", "주변"].map(l => (
              <TagButton key={l} size="sm" variant="ghost">
                {l}
              </TagButton>
            ))}
          </div>
        </section>

        <section className="py-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="flex gap-1 font-semibold">
              <p className="text-greyscale-grey-900">단지</p>
              <p className="text-greyscale-grey-600">00</p>
            </h2>
            <span className="text-xs font-semibold text-greyscale-grey-900">핀포인트 거리순</span>
          </div>

          {[1, 2].map(i => (
            <article key={i} className="mb-3 rounded-lg border border-greyscale-grey-100 p-3">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded bg-primary-blue-25 px-1.5 py-[2px] text-[10px] font-semibold text-primary-blue-300">
                  일반공고
                </span>
                <span className="text-[10px] text-greyscale-grey-400">D-8</span>
              </div>
              <h3 className="line-clamp-1 truncate text-sm font-semibold text-greyscale-grey-900">
                단지이름 영역 한줄이 넘어갈 시 말줄임처리 됩니다...
              </h3>
              <p className="mt-1 truncate text-[11px] text-greyscale-grey-500">
                서울시 서초구 · 약 0.4km 거리
              </p>
            </article>
          ))}

          <div className="mt-5">
            <p className="mb-2 text-xs text-greyscale-grey-600">필터 기준을 벗어난 단지예요</p>
            {[1, 2].map(i => (
              <article
                key={`out-${i}`}
                className="mb-3 rounded-lg border border-greyscale-grey-75 bg-greyscale-grey-50 p-3"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-primary-blue-25 px-1.5 py-[2px] text-[10px] font-semibold text-primary-blue-300">
                    일반공고
                  </span>
                  <span className="text-[10px] text-greyscale-grey-400">D-6</span>
                </div>
                <h3 className="line-clamp-1 text-sm font-semibold text-greyscale-grey-600">
                  단지이름 영역 한줄이 넘어갈 시 말줄임처리 됩니다...
                </h3>
                <p className="mt-1 text-[11px] text-greyscale-grey-500">
                  서울시 서초구 · 약 0.4km 거리
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
