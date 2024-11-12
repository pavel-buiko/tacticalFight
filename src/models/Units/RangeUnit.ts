import { Unit } from "../Unit";
import { IAttack } from "../UnitInterfaces";
import { IPosition as Position } from "../UnitInterfaces";

export class RangeUnit extends Unit implements IAttack {
  public damage: number;

  constructor(
    name: string,
    health: number,
    maxHealth: number,
    initiative: number,
    image: string,
    position: Position,
    team: "red" | "blue",
    damage: number
  ) {
    super(name, health, maxHealth, initiative, image, position, team);
    this.damage = damage;
  }

  public attack(target: Unit): void {
    if (target.isAlive()) {
      target.takeDamage(this.damage);
    }
  }
}
