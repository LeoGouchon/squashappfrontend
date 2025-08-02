import {Player} from './player.type';

export type SessionStat = {
    date: number,
    matchCount: number,
    rank: Array<RankSessionStat>
}

export type RankSessionStat = {
    player: Player,
    wins: number,
    losses: number,
    totalPointsScored: number,
    totalPointsReceived: number
}
