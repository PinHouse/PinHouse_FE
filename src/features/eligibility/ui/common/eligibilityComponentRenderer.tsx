"use client";

import { useRouter } from "next/navigation";
import { useEligibilityStore } from "../../model/eligibilityStore";
import { ComponentConfig } from "../../model/eligibilityDecisionTree";
import { EligibilityStatusBanner } from "./eligibilityStatusBanner";
import { EligibilityOptionSelector } from "./eligibilityOptionSelector";
import { EligibilitySelect } from "./eligibilitySelect";
import { EligibilityPriceInput } from "./eligibilityPriceInput";
import { EligibilityNumberInputList } from "./eligibilityNumberInputList";
import { EligibilityInfoButton } from "./eligibilityInfoButton";
import { DatePicker } from "@/src/shared/ui/datePicker/datePicker";
import { Checkbox } from "@/src/shared/lib/headlessUi/checkBox/checkbox";
import { motion, AnimatePresence } from "framer-motion";

export interface EligibilityComponentRendererProps {
  /** 컴포넌트 설정 */
  config: ComponentConfig;
}

/**
 * ComponentConfig를 실제 컴포넌트로 렌더링
 * - store와 자동 연결
 * - showWhen 조건 처리
 * - children 재귀적 렌더링
 */
export const EligibilityComponentRenderer = ({ config }: EligibilityComponentRendererProps) => {
  const router = useRouter();
  const store = useEligibilityStore();
  // 최신 store 데이터 직접 사용 (실시간 조건부 렌더링을 위해)
  const data = useEligibilityStore();

  // showWhen 조건 확인 (최신 store 데이터 사용)
  const shouldShow = !config.showWhen || config.showWhen(data);

  if (!shouldShow) {
    return null;
  }

  // disabledWhen 조건 확인
  const isDisabled = config.disabledWhen ? config.disabledWhen(data) : false;

  // storeKey를 기반으로 store 값과 setter 연결
  const getStoreValue = (key: string): any => {
    return (store as any)[key];
  };

  const getStoreSetter = (key: string): ((value: any) => void) | undefined => {
    const setterName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    return (store as any)[setterName];
  };

  // 컴포넌트 타입별 렌더링
  const renderComponent = () => {
    switch (config.type) {
      case "statusBanner": {
        // title과 description이 함수인 경우 실행 (동적 메시지용)
        const title =
          typeof config.props.title === "function" ? config.props.title(data) : config.props.title;
        const description =
          typeof config.props.description === "function"
            ? config.props.description(data)
            : config.props.description || "";

        return (
          <EligibilityStatusBanner
            title={title}
            description={description}
            className={config.props.className}
          />
        );
      }

      case "optionSelector": {
        const value = config.storeKey ? getStoreValue(config.storeKey) : undefined;
        const setter = config.storeKey ? getStoreSetter(config.storeKey) : undefined;

        // boolean 필드 목록
        const booleanFields = ["isNewlyMarried", "isMultiChildVulnerable", "isSingleParent"];

        return (
          <EligibilityOptionSelector
            title={config.props.title}
            description={config.props.description}
            options={config.props.options}
            direction={config.props.direction}
            multiselect={config.props.multiselect}
            required={config.props.required}
            selectedIds={
              value !== null && value !== undefined
                ? Array.isArray(value)
                  ? value
                  : // boolean 필드인 경우 boolean을 문자열로 변환
                    booleanFields.includes(config.storeKey || "")
                    ? value === true
                      ? ["1"]
                      : value === false
                        ? ["2"]
                        : []
                    : [value]
                : []
            }
            onChange={selectedIds => {
              if (setter) {
                // 단일 선택인 경우 첫 번째 값만 저장
                if (config.props.multiselect === undefined) {
                  const selectedValue = selectedIds[0] || null;
                  // boolean 필드인 경우 문자열을 boolean으로 변환
                  if (config.storeKey && booleanFields.includes(config.storeKey)) {
                    setter(selectedValue === "1" ? true : selectedValue === "2" ? false : null);
                  } else {
                    setter(selectedValue);
                  }
                } else {
                  // 멀티셀렉트인 경우 배열 저장
                  setter(selectedIds);
                }
              }
            }}
            className={config.props.className}
          />
        );
      }

      case "select": {
        const value = config.storeKey ? getStoreValue(config.storeKey) : undefined;
        const setter = config.storeKey ? getStoreSetter(config.storeKey) : undefined;

        return (
          <EligibilitySelect
            title={config.props.title}
            description={config.props.description}
            required={config.props.required}
            options={config.props.options}
            value={value || undefined}
            placeholder={config.props.placeholder}
            error={config.props.error}
            onChange={(key, _value) => {
              if (setter) {
                setter(key || null);
              }
            }}
            className={config.props.className}
          />
        );
      }

      case "priceInput": {
        const value = config.storeKey ? getStoreValue(config.storeKey) : undefined;
        const setter = config.storeKey ? getStoreSetter(config.storeKey) : undefined;

        return (
          <EligibilityPriceInput
            title={config.props.title}
            description={config.props.description}
            required={config.props.required}
            error={config.props.error}
            value={value || undefined}
            placeholder={config.props.placeholder}
            disabled={isDisabled}
            onChange={value => {
              if (setter) {
                setter(value || null);
              }
            }}
            onFocus={config.props.onFocus}
            onBlur={config.props.onBlur}
            className={config.props.className}
          />
        );
      }

      case "numberInputList": {
        // numberInputList는 여러 필드를 관리하므로 특별 처리 필요
        const value = config.storeKey ? getStoreValue(config.storeKey) : null;
        const setter = config.storeKey ? getStoreSetter(config.storeKey) : undefined;

        // value가 객체인지 문자열인지 확인
        const isObjectValue = value && typeof value === "object" && !Array.isArray(value);

        // options에 value와 onChange 연결
        const optionsWithStore = config.props.options.map((option: any) => ({
          ...option,
          value: isObjectValue
            ? option.id === "under6"
              ? String(value.under6)
              : String(value.over7)
            : value
              ? String(value)
              : undefined,
          onChange: (id: string, val: string) => {
            if (setter) {
              if (isObjectValue) {
                // 기존 객체 형태 (childrenInfo 등)
                const current = value || { under6: 0, over7: 0 };
                const updated = {
                  ...current,
                  [id === "under6" ? "under6" : "over7"]: Number(val) || 0,
                };
                setter(updated);
              } else {
                // 단일 숫자 값 (housingDisposalYears 등)
                setter(val || null);
              }
            }
          },
        }));

        return (
          <EligibilityNumberInputList
            title={config.props.title}
            description={config.props.description}
            required={config.props.required}
            options={optionsWithStore}
            summary={config.props.summary}
            className={config.props.className}
          />
        );
      }

      case "infoButton": {
        // action prop이 있으면 동적으로 핸들러 생성
        let onClick = config.props.onClick;
        if (config.props.action === "home") {
          onClick = () => router.push("/home");
        } else if (config.props.action === "back") {
          onClick = () => router.back();
        }

        return (
          <EligibilityInfoButton
            text={config.props.text}
            onClick={onClick}
            className={config.props.className}
          />
        );
      }

      case "datePicker": {
        const value = config.storeKey ? getStoreValue(config.storeKey) : undefined;
        const setter = config.storeKey ? getStoreSetter(config.storeKey) : undefined;

        return (
          <DatePicker
            value={value || undefined}
            onChange={date => {
              if (setter) {
                setter(date || null);
              }
            }}
            label={config.props.label}
            placeholder={config.props.placeholder}
            className={config.props.className}
          />
        );
      }

      case "checkbox": {
        const value = config.storeKey ? getStoreValue(config.storeKey) : false;
        const setter = config.storeKey ? getStoreSetter(config.storeKey) : undefined;

        return (
          <div className="flex items-center gap-2">
            <Checkbox
              checked={value || false}
              onCheckedChange={(checked: boolean) => {
                if (setter) {
                  setter(checked === true);
                }
              }}
            />
            {config.props.label && (
              <label
                className="cursor-pointer text-sm font-medium leading-[140%] tracking-[-0.01em] text-greyscale-grey-900"
                onClick={() => {
                  if (setter) {
                    setter(!value);
                  }
                }}
              >
                {config.props.label}
              </label>
            )}
          </div>
        );
      }

      default:
        console.warn(`Unknown component type: ${(config as any).type}`);
        return null;
    }
  };

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          key={`${config.type}-${config.storeKey || "component"}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* 메인 컴포넌트 */}
          {renderComponent()}

          {/* children 재귀적 렌더링 (같은 페이지 내 조건부 질문들) */}
          {config.children && config.children.length > 0 && (
            <div className="mt-4 flex flex-col gap-4">
              {config.children.map((childConfig, index) => (
                <EligibilityComponentRenderer
                  key={`${childConfig.type}-${childConfig.storeKey || index}`}
                  config={childConfig}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
