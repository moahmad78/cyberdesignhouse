"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ConsultationModal } from "../components/ui/ConsultationModal";

interface ConsultationModalContextType {
  isOpen: boolean;
  prefilledService?: string;
  openModal: (service?: string) => void;
  closeModal: () => void;
}

const ConsultationModalContext = createContext<ConsultationModalContextType>({
  isOpen: false,
  prefilledService: undefined,
  openModal: () => {},
  closeModal: () => {},
});

export const useConsultationModal = () => useContext(ConsultationModalContext);

export const ConsultationModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefilledService, setPrefilledService] = useState<string | undefined>(undefined);

  const openModal = (service?: string) => {
    if (service) setPrefilledService(service);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPrefilledService(undefined);
  };

  // Global interception for any "Book Consultation" or "/contact" triggers
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Allow modifier keys (cmd/ctrl for new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = (e.target as HTMLElement).closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href");
      const text = target.textContent?.trim().toLowerCase() || "";

      // Triggers: explicit attribute, or button text match for "book consultation" / "get free consultation"
      const isExplicitTrigger = target.hasAttribute("data-consultation-modal");
      const isTextMatch =
        target.tagName === "BUTTON" &&
        (text.includes("book consultation") ||
          text.includes("get free consultation") ||
          text.includes("book free consultation") ||
          text.includes("consult team"));

      // Do NOT intercept navigation links like /contact - let users visit the Contact page
      if (isExplicitTrigger || isTextMatch) {
        e.preventDefault();
        e.stopPropagation();

        const serviceAttr = target.getAttribute("data-service-prefill");
        openModal(serviceAttr || undefined);
      }
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => document.removeEventListener("click", handleGlobalClick, { capture: true });
  }, []);

  return (
    <ConsultationModalContext.Provider value={{ isOpen, prefilledService, openModal, closeModal }}>
      {children}
      <ConsultationModal isOpen={isOpen} onClose={closeModal} defaultService={prefilledService} />
    </ConsultationModalContext.Provider>
  );
};
