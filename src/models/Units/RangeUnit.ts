import { Unit } from "../Unit";
import { IAttack } from "../UnitActionInterfaces";
import { IPosition as Position } from "../IPosition";

export class RangeUnit extends Unit implements IAttack {
  public damage: number;

  constructor(
    name: string,
    health: number,
    initiative: number,
    image: string,
    position: Position,
    team: "red" | "orange",
    damage: number
  ) {
    super(name, health, initiative, image, position, team);
    this.damage = damage;
  }

  public attack(target: Unit): void {
    if (target.isAlive()) {
      target.takeDamage(this.damage);
    }
  }
}
