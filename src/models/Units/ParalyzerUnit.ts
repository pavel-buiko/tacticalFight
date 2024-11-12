import { Unit } from "../Unit";
import { IPosition as Position } from "../UnitInterfaces";
import { IParalyze } from "../UnitInterfaces";

export class ParalyzerUnit extends Unit implements IParalyze {
  constructor(
    name: string,
    health: number,
    maxHealth: number,
    initiative: number,
    image: string,
    position: Position,
    team: "red" | "blue"
  ) {
    super(name, health, maxHealth, initiative, image, position, team);
  }

  public paralyze(target: Unit): void {
    if (target.isAlive()) {
      target.isParalyzed = true;
      console.log(target.name, "is paralyzed now", target.isParalyzed);
    }
  }
}
