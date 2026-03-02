import {Player} from './player.type';

export type PlayerStats = {
    player: Player,
    yearlyStats: YearlyStats[],
} & OverallStats;

export type OverallStats = {
    totalMatches: number,
    wins: number,
    losses: number
    averagePlayerLostScore: number,
    averageOpponentLostScore: number,
    closeWonCount: number,
    closeLostCount: number,
    stompWonCount: number,
    stompLostCount: number,
    statsAgainstOpponents: StatsAgainstOpponent[],
}

export type YearlyStats = {
    year: number,
    totalMatches: number,
    wins: number,
    losses: number,
    averageOpponentLostScore: number,
    averagePlayerLostScore: number,
    closeLostCount: number,
    closeWonCount: number,
    stompLostCount: number,
    stompWonCount: number,
}

export type StatsAgainstOpponent = {
    opponentPlayer: Player,
    totalMatches: number,
    wins: number,
    losses: number
    averageLostScore: number
    closeWonCount: number,
    closeLostCount: number,
    stompWonCount: number,
    stompLostCount: number
}
