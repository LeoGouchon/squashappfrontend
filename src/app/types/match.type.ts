import {Player} from './player.type';
import {MatchPoint} from './match-point.type';

export type Match = {
    id: number;
    pointsHistory: MatchPoint[] | null;
    finalScoreA: number;
    finalScoreB: number;
    startTime: string;
    endTime: string;
    playerA: Player;
    playerB: Player;
    finished: boolean;
}
