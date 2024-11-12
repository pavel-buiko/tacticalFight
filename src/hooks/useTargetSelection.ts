import { useState } from "react";
import { Unit } from "../models/Unit";

export interface TargetSelectionMode {
  type: "ally" | "enemy";
  resolve: (unit: Unit | null) => void;
  isValidTarget?: (unit: Unit) => boolean;
}

type SelectTargetFunction = (
  type: "ally" | "enemy",
  isValidTarget?: (unit: Unit) => boolean
) => Promise<Unit | null>;

const useTargetSelection = (currentUnit: Unit | null) => {
  const [targetSelectionMode, setTargetSelectionMode] =
    useState<TargetSelectionMode | null>(null);

  const selectTarget: SelectTargetFunction = (
    type,
    isValidTarget?
  ): Promise<Unit | null> => {
    return new Promise((resolve) => {
      setTargetSelectionMode({ type, resolve, isValidTarget });
    });
  };

  const clearTargetSelection = () => {
    setTargetSelectionMode(null);
  };

  const handleUnitSelect = (unit: Unit) => {
    if (targetSelectionMode) {
      const isAlly = unit.team === currentUnit?.team;
      if (
        (targetSelectionMode.type === "ally" && isAlly) ||
        (targetSelectionMode.type === "enemy" && !isAlly)
      ) {
        if (
          !targetSelectionMode.isValidTarget ||
          targetSelectionMode.isValidTarget(unit)
        ) {
          targetSelectionMode.resolve(unit);
          clearTargetSelection();
        } else {
          console.log("Эта цель недоступна для действия");
        }
      } else {
        console.log("Неверная цель");
      }
    } else {
      console.log("Сейчас не ваш выбор юнита");
    }
  };

  return {
    targetSelectionMode,
    selectTarget,
    clearTargetSelection,
    handleUnitSelect,
  };
};

export default useTargetSelection;
