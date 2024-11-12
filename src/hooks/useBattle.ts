import { useState, useEffect } from "react";
import { Unit } from "../models/Unit";
import { generateTeam } from "../models/TeamGenerator";
import { Battle } from "../models/Battle";

const useBattle = () => {
  const [redTeamUnits, setRedTeamUnits] = useState<Unit[]>(generateTeam("red"));
  const [blueTeamUnits, setBlueTeamUnits] = useState<Unit[]>(
    generateTeam("blue")
  );
  const [battle] = useState<Battle>(new Battle(redTeamUnits, blueTeamUnits));
  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);

  useEffect(() => {
    battle.startRound();
    setCurrentUnit(battle.getCurrentUnit());
  }, [battle]);

  const updateUnitsState = () => {
    setRedTeamUnits([...battle.redTeam]);
    setBlueTeamUnits([...battle.blueTeam]);
  };

  const nextTurn = () => {
    battle.nextTurn();
    setCurrentUnit(battle.getCurrentUnit());
  };

  return {
    redTeamUnits,
    blueTeamUnits,
    battle,
    currentUnit,
    updateUnitsState,
    nextTurn,
  };
};

export default useBattle;
