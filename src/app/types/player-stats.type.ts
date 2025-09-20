import {Player} from './player.type';

export type PlayerStats = {
    player: Player,
    totalMatches: number,
    wins: number,
    losses: number
    averagePlayerLostScore: number,
    averageOpponentLostScore: number,
    closeWonCount: number,
    closeLostCount: number,
    stompWonCount: number,
    stompLostCount: number,
    statsAgainstOpponents: StatsAgainstOpponent[]
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
