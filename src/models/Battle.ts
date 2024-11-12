import { Unit } from "./Unit";

export class Battle {
  public redTeam: Unit[];
  public blueTeam: Unit[];
  public allUnits: Unit[];
  public turnOrder: Unit[];
  public currentTurnIndex: number = 0;

  constructor(redTeam: Unit[], blueTeam: Unit[]) {
    this.redTeam = redTeam;
    this.blueTeam = blueTeam;
    this.allUnits = [...redTeam, ...blueTeam];
    this.turnOrder = this.calculateTurnOrder();
  }

  private calculateTurnOrder(): Unit[] {
    const aliveUnits = this.allUnits.filter(
      (unit) => unit.isAlive() && !unit.isParalyzed
    );
    aliveUnits.sort((a, b) => b.initiative - a.initiative);

    for (let i = 0; i < aliveUnits.length - 1; i++) {
      if (aliveUnits[i].initiative === aliveUnits[i + 1].initiative) {
        if (Math.random() > 0.5) {
          [aliveUnits[i], aliveUnits[i + 1]] = [
            aliveUnits[i + 1],
            aliveUnits[i],
          ];
        }
      }
    }

    return aliveUnits;
  }

  public startRound(): void {
    this.turnOrder = this.calculateTurnOrder();
    this.currentTurnIndex = 0;
    this.allUnits.forEach((unit) => unit.resetState());
  }

  public nextTurn(): void {
    if (this.isBattleOver()) {
      alert(`Сражение завершено: ${this.getWinningTeam()}`);
    }
    this.currentTurnIndex++;

    if (this.currentTurnIndex >= this.turnOrder.length) {
      this.startRound();
    }

    while (
      (this.currentTurnIndex < this.turnOrder.length &&
        !this.turnOrder[this.currentTurnIndex].isAlive()) ||
      this.turnOrder[this.currentTurnIndex].isParalyzed
    ) {
      this.currentTurnIndex++;
    }

    if (this.currentTurnIndex >= this.turnOrder.length) {
      this.startRound();
    }
  }

  public getCurrentUnit(): Unit | null {
    if (this.currentTurnIndex < this.turnOrder.length) {
      return this.turnOrder[this.currentTurnIndex];
    }
    return null;
  }

  public isBattleOver(): boolean {
    const redTeamAlive = this.redTeam.some((unit) => unit.isAlive());
    const blueTeamAlive = this.blueTeam.some((unit) => unit.isAlive());
    return !redTeamAlive || !blueTeamAlive;
  }

  public getWinningTeam(): "red" | "blue" | "draw" | null {
    if (!this.isBattleOver()) {
      return null;
    }
    const redTeamAlive = this.redTeam.some((unit) => unit.isAlive());
    const blueTeamAlive = this.blueTeam.some((unit) => unit.isAlive());

    if (redTeamAlive && !blueTeamAlive) {
      return "red";
    } else if (!redTeamAlive && blueTeamAlive) {
      return "blue";
    } else {
      return "draw";
    }
  }

  public getAllAllies(unit: Unit): Unit[] {
    if (unit.team === "red") {
      return this.redTeam.filter((u) => u.isAlive() && u !== unit);
    } else {
      return this.blueTeam.filter((u) => u.isAlive() && u !== unit);
    }
  }

  public getAllEnemies(unit: Unit): Unit[] {
    if (unit.team === "red") {
      return this.blueTeam.filter((u) => u.isAlive());
    } else {
      return this.redTeam.filter((u) => u.isAlive());
    }
  }
}
