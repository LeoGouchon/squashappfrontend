import {Player} from './player.type';

export type PlayerStats = {
    player: Player,
    totalMatches: number,
    wins: number,
    losses: number
    averageLostScore: number,
    closeWonCount: number,
    closeLostCount: number,
    stompWonCount: number,
    stompLostCount: number,
    statssAgainstOpponents: {
        opponentPlayer: Player,
        totalMatches: number,
        wins: number,
        losses: number
        averageLostScore: number
        closeWonCount: number,
        closeLostCount: number,
        stompWonCount: number,
        stompLostCount: number
    }[]
}
