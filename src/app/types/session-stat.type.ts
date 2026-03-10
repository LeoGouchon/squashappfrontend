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
    totalPointsReceived: number,
    statsAgainstPlayers: Array<DirectOpponentStats>
}

export type DirectOpponentStats = {
    losses: number,
    opponents: Player,
    pointsReceived: number,
    pointsScored: number,
    wins: number,
}
