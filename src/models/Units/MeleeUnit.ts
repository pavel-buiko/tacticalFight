import { Unit } from "../Unit";
import { IPosition as Position } from "../UnitInterfaces";
import { IAttack } from "../UnitInterfaces";

export class MeleeUnit extends Unit implements IAttack {
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

  public getPossibleTargets(allies: Unit[], enemies: Unit[]): Unit[] {
    const myPosition = this.position;
    const possibleTargets: Unit[] = [];
    const boardRows = 4;
    const boardColumns = 3;

    const direction = this.team === "red" ? 1 : -1;
    const isInFrontLine =
      (this.team === "red" && myPosition.row === 1) ||
      (this.team === "blue" && myPosition.row === 2);

    if (!isInFrontLine) {
      const allyFrontRow = this.team === "red" ? 1 : 2;
      console.log(allyFrontRow);

      const hasLivingAlliesInFront = allies.some(
        (ally) => ally.position.row === allyFrontRow && ally.isAlive()
      );
      if (hasLivingAlliesInFront) {
        return [];
      }
    }

    const attackPriorityRows = [
      myPosition.row + direction,
      myPosition.row + 2 * direction,
    ];

    for (const row of attackPriorityRows) {
      if (row < 0 || row >= boardRows) continue;

      const attackPositions = [
        { row, column: myPosition.column },
        { row, column: myPosition.column - 1 },
        { row, column: myPosition.column + 1 },
      ];

      let foundAliveEnemy = false;
      let closestEnemies = 0;
      for (const pos of attackPositions) {
        if (pos.column < 0 || pos.column >= boardColumns) continue;

        let target = enemies.find(
          (enemy) =>
            enemy.position.row === pos.row &&
            enemy.position.column === pos.column &&
            enemy.isAlive()
        );

        if (!target && closestEnemies === 0) {
          let increment = 1;
          if (myPosition.column === 2) {
            increment = -1;
          }
          target = enemies.find(
            (enemy) =>
              enemy.position.row === pos.row &&
              enemy.position.column === pos.column + increment &&
              enemy.isAlive()
          );
        }

        if (target) {
          possibleTargets.push(target);
          foundAliveEnemy = true;
          closestEnemies++;
        }
      }

      if (foundAliveEnemy) break;
    }

    return possibleTargets;
  }
}
