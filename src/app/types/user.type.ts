import {Player} from './player.type';

export type User = {
    id: number;
    admin: boolean;
    mail: string;
    players: Player;
}
