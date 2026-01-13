import { useState } from "react";
import { useRouter } from "next/navigation";
import { withdrawUser } from "../api/withdrawApi";
import { logout } from "@/src/features/login/utils/logout";

export const useWithdraw = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleWithdrawClick = () => {
    console.log("탈퇴하기 버튼 클릭됨");
    console.log("현재 isModalOpen:", isModalOpen);
    setIsModalOpen(true);
    console.log("setIsModalOpen(true) 호출 후");
  };

  const handleWithdrawConfirm = async () => {
    setIsLoading(true);
    try {
      await withdrawUser({ reason: selectedReason ?? "" });
      // 탈퇴 성공 후 로그아웃 처리 및 로그인 페이지로 이동
      logout();
      router.push("/login");
    } catch (error) {
      console.error("탈퇴 실패:", error);
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
  };

  return {
    selectedReason,
    setSelectedReason,
    handleWithdrawClick,
    handleWithdrawConfirm,
    handleModalCancel,
    isLoading,
    isModalOpen,
  };
};
