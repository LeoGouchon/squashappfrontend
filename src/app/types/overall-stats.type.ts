import {Match} from './match.type';

export type OverallStats = {
    totalMatches: number,
    averageLoserScore: number,
    closeMatchesCount: number,
    stompMatchesCount: number,
    closestMatches: Match[],
    stompestMatches: Match[],
}
