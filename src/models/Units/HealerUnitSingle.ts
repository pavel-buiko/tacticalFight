import { Unit } from "../Unit";
import { IHeal } from "../UnitActionInterfaces";
import { IPosition as Position } from "../IPosition";

export class HealerUnitSingle extends Unit implements IHeal {
  public healAmount: number;

  constructor(
    name: string,
    health: number,
    initiative: number,
    image: string,
    position: Position,
    team: "red" | "orange",
    healAmount: number
  ) {
    super(name, health, initiative, image, position, team);
    this.healAmount = healAmount;
  }

  public heal(target: Unit): void {
    if (target.isAlive()) {
      target.health += this.healAmount;
      if (target.health > target.maxHealth) {
        target.health = target.maxHealth;
      }
    }
  }
}
