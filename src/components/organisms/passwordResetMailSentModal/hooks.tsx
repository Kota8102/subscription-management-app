import { useRouter } from "next/router";

import { useTranslation } from "@utils/useTranslation";

import { useCommonContext } from "src/context/commonContext";

export const usePasswordResetMailSentModal = () => {
  const { t } = useTranslation();

  return { t };
};

export const useOkayButton = () => {
  const router = useRouter();
  const { toggleIsModalOpen } = useCommonContext();

  const handleClick = () => {
    toggleIsModalOpen(false);
    router.push("/");
  };

  return { handleClick };
};
