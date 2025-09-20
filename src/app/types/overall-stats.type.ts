import {Match} from './match.type';
import {ScoreDistribution} from './score-distribution.type';

export type OverallStats = {
    totalMatches: number,
    averageLoserScore: number,
    closeMatchesCount: number,
    stompMatchesCount: number,
    closestMatches: Match[],
    stompestMatches: Match[],
    scoreDistribution: ScoreDistribution[],
}
