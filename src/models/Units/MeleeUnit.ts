import { Unit } from "../Unit";
import { IPosition as Position } from "../IPosition";
import { IAttack } from "../UnitActionInterfaces";

export class MeleeUnit extends Unit implements IAttack {
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

  public getPossibleTargets(enemies: Unit[]): Unit[] {
    const myPosition = this.position;
    const direction = this.team === "red" ? -1 : 1;
    const possibleTargets: Unit[] = [];

    const attackPositions = [
      { row: myPosition.row + direction, column: myPosition.column },
      { row: myPosition.row + direction, column: myPosition.column - 1 },
      { row: myPosition.row + direction, column: myPosition.column + 1 },
    ];

    attackPositions.forEach((pos) => {
      if (pos.row >= 0 && pos.row < 2 && pos.column >= 0 && pos.column < 3) {
        const target = enemies.find(
          (enemy) =>
            enemy.position.row === pos.row &&
            enemy.position.column === pos.column &&
            enemy.isAlive()
        );
        if (target) {
          possibleTargets.push(target);
        }
      }
    });

    return possibleTargets;
  }
}
