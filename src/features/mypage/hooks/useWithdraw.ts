import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { withdrawUser } from "../api/withdrawApi";
import { logout } from "@/src/features/login/utils/logout";
import { WITHDRAW_REASONS } from "../model/mypageConstants";

export const useWithdraw = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWithdrawClick = () => {
    setIsModalOpen(true);
  };

  const handleWithdrawConfirm = async () => {
    setIsLoading(true);
    try {
      // selectedReasons의 id를 label로 변환
      const reasonLabels = selectedReasons.map(id => {
        const reason = WITHDRAW_REASONS.find(r => r.id === id);
        return reason?.label || id;
      });

      await withdrawUser({ reasons: reasonLabels });
      // 탈퇴 성공 후 로그아웃 처리 및 로그인 페이지로 이동
      logout();
      //router.push("/login");
    } catch (error) {
      console.error("탈퇴 실패:", error);
      toast.error("탈퇴 처리에 실패했어요. 잠시 후 다시 시도해주세요.");
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  const handleReasonsChange = (selectedIds: string[]) => {
    setSelectedReasons(selectedIds);
  };

  return {
    selectedReasons,
    handleReasonsChange,
    handleWithdrawClick,
    handleWithdrawConfirm,
    handleModalCancel,
    isLoading,
    isModalOpen,
  };
};
