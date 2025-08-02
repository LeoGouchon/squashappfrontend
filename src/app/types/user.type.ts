import {Player} from './player.type';

export type User = {
    id: string;
    admin: boolean;
    mail: string;
    player: Player;
}
