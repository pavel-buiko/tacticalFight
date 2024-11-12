import { Unit } from "../models/Unit";
import { Battle } from "../models/Battle";
import { MeleeUnit } from "../models/Units/MeleeUnit";
import { RangeUnit } from "../models/Units/RangeUnit";
import { MageUnit } from "../models/Units/MageUnit";
import { HealerUnitSingle } from "../models/Units/HealerUnitSingle";
import { HealerUnitMass } from "../models/Units/HealerUnitMass";
import { ParalyzerUnit } from "../models/Units/ParalyzerUnit";

type SelectTargetFunction = (
  type: "ally" | "enemy",
  isValidTarget?: (unit: Unit) => boolean
) => Promise<Unit | null>;

type UpdateUnitsStateFunction = () => void;

export const handleAttack = async (
  currentUnit: Unit,
  battle: Battle,
  selectTarget: SelectTargetFunction,
  updateUnitsState: UpdateUnitsStateFunction
) => {
  if (currentUnit instanceof MeleeUnit) {
    const enemies = battle.getAllEnemies(currentUnit);
    const allies = battle.getAllAllies(currentUnit);
    const possibleTargets = currentUnit.getPossibleTargets(allies, enemies);

    if (possibleTargets.length === 0) {
      console.log("Нет доступных целей для атаки");
      return;
    }

    const isValidTarget = (unit: Unit) => possibleTargets.includes(unit);
    const target = await selectTarget("enemy", isValidTarget);

    if (target) {
      currentUnit.attack(target);
      updateUnitsState();
    }
  } else if (currentUnit instanceof RangeUnit) {
    const target = await selectTarget("enemy");

    if (target) {
      currentUnit.attack(target);
      updateUnitsState();
    }
  } else if (currentUnit instanceof MageUnit) {
    const enemies = battle.getAllEnemies(currentUnit);
    currentUnit.massAttack(enemies);
    updateUnitsState();
  } else {
    console.log("Текущий юнит не может атаковать");
  }
};

export const handleHeal = async (
  currentUnit: Unit,
  battle: Battle,
  selectTarget: SelectTargetFunction,
  updateUnitsState: UpdateUnitsStateFunction
) => {
  if (currentUnit instanceof HealerUnitSingle) {
    const ally = await selectTarget("ally");

    if (ally) {
      currentUnit.heal(ally);
      updateUnitsState();
    }
  } else if (currentUnit instanceof HealerUnitMass) {
    const allies = battle.getAllAllies(currentUnit);
    currentUnit.massHeal(allies);
    updateUnitsState();
  } else {
    console.log("Текущий юнит не может лечить");
  }
};

export const handleParalyze = async (
  currentUnit: Unit,
  selectTarget: SelectTargetFunction,
  updateUnitsState: UpdateUnitsStateFunction
) => {
  if (currentUnit instanceof ParalyzerUnit) {
    const enemy = await selectTarget("enemy");

    if (enemy) {
      currentUnit.paralyze(enemy);
      updateUnitsState();
    }
  } else {
    console.log("Текущий юнит не может парализовать");
  }
};

export const handleDefend = (
  currentUnit: Unit,
  updateUnitsState: UpdateUnitsStateFunction
) => {
  currentUnit.defend();
  console.log(`${currentUnit.name} находится в режиме защиты`);
  updateUnitsState();
};
