import { MeleeUnit } from "./MeleeUnit";
import { RangeUnit } from "./RangeUnit";
import { MageUnit } from "./MageUnit";
import { HealerUnitSingle } from "./HealerUnitSingle";
import { HealerUnitMass } from "./HealerUnitMass";
import { ParalyzerUnit } from "./ParalyzerUnit";
import { IPosition as Position } from "../UnitInterfaces";
import { Unit } from "../Unit";

export function createUnit(
  unitType: string,
  position: Position,
  team: "red" | "blue"
): Unit {
  switch (unitType) {
    case "Skeleton":
      return new MeleeUnit(
        "Skeleton",
        100,
        100,
        50,
        "skeleton.jpg",
        position,
        team,
        25
      );
    case "Centaur":
      return new MeleeUnit(
        "Centaur",
        150,
        150,
        50,
        "centaur.jpg",
        position,
        team,
        50
      );
    case "Bandit":
      return new RangeUnit(
        "Bandit",
        75,
        75,
        60,
        "bandit.jpg",
        position,
        team,
        30
      );
    case "Elf Archer":
      return new RangeUnit(
        "Elf Archer",
        90,
        90,
        60,
        "elfarcher.jpg",
        position,
        team,
        45
      );
    case "Skeleton Mage":
      return new MageUnit(
        "Skeleton Mage",
        50,
        50,
        40,
        "skeletonmage.jpg",
        position,
        team,
        20
      );
    case "Archimage":
      return new MageUnit(
        "Archimage",
        90,
        90,
        40,
        "archimage.jpg",
        position,
        team,
        30
      );
    case "Monk":
      return new HealerUnitSingle(
        "Monk",
        90,
        90,
        20,
        "monk.jpg",
        position,
        team,
        40
      );
    case "Bishop":
      return new HealerUnitMass(
        "Bishop",
        130,
        130,
        20,
        "bishop.jpg",
        position,
        team,
        25
      );
    case "Sirena":
      return new ParalyzerUnit(
        "Sirena",
        80,
        80,
        20,
        "sirena.jpg",
        position,
        team
      );
    default:
      throw new Error("Unknown unit type");
  }
}
