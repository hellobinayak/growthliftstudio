import React, { createContext, useContext, useState, useCallback } from "react";
import SurveyModal from "../components/SurveyModal";
import { AnimatePresence } from "motion/react";

interface SurveyContextType {
  openSurvey: () => void;
  closeSurvey: () => void;
}

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export function SurveyProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openSurvey = useCallback(() => setIsOpen(true), []);
  const closeSurvey = useCallback(() => setIsOpen(false), []);

  return (
    <SurveyContext.Provider value={{ openSurvey, closeSurvey }}>
      {children}
      <AnimatePresence>
        {isOpen && <SurveyModal isOpen={isOpen} onClose={closeSurvey} />}
      </AnimatePresence>
    </SurveyContext.Provider>
  );
}

export function useSurvey() {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error("useSurvey must be used within a SurveyProvider");
  }
  return context;
}
