import {Player} from './player.type';
import {MatchPoint} from './match-point.type';

export type Match = {
    id: string;
    pointsHistory: MatchPoint[] | null;
    finalScoreA: number;
    finalScoreB: number;
    startTime: number;
    endTime: number;
    playerA: Player;
    playerB: Player;
    finished: boolean;
}
