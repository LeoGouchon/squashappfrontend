import {PlayerLetter} from './player-letter.type';
import {ServiceSide} from './service-side.type';

export type MatchPoint = {
    server: PlayerLetter,
    scorer: PlayerLetter,
    serviceSide: ServiceSide,
    scoreA: number,
    scoreB: number
}
