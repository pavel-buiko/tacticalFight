import React from "react";
import {
  actionButtonsStyle,
  buttonStyle,
  defenseButtonStyle,
} from "./style.css";
import { Unit } from "../models/Unit";
import { MeleeUnit } from "../models/Units/MeleeUnit";
import { RangeUnit } from "../models/Units/RangeUnit";
import { MageUnit } from "../models/Units/MageUnit";
import { HealerUnitSingle } from "../models/Units/HealerUnitSingle";
import { HealerUnitMass } from "../models/Units/HealerUnitMass";
import { ParalyzerUnit } from "../models/Units/ParalyzerUnit";

interface ActionButtonsProps {
  currentUnit: Unit | null;
  onAction: (actionType: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  currentUnit,
  onAction,
}) => {
  if (!currentUnit) return null;

  let actionLabel = "";
  if (
    currentUnit instanceof MeleeUnit ||
    currentUnit instanceof RangeUnit ||
    currentUnit instanceof MageUnit
  ) {
    actionLabel = "Атака";
  } else if (
    currentUnit instanceof HealerUnitSingle ||
    currentUnit instanceof HealerUnitMass
  ) {
    actionLabel = "Лечение";
  } else if (currentUnit instanceof ParalyzerUnit) {
    actionLabel = "Парализация";
  }

  return (
    <div className={actionButtonsStyle}>
      {actionLabel && (
        <button className={buttonStyle} onClick={() => onAction(actionLabel)}>
          {actionLabel}
        </button>
      )}
      <button
        className={`${buttonStyle} ${defenseButtonStyle}`}
        onClick={() => onAction("Защита")}
      >
        Защита
      </button>
    </div>
  );
};

export default ActionButtons;
