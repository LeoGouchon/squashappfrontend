import {Player} from './player.type';

export type UserRole = 'USER' | 'MODERATOR' | 'ADMIN';

export type User = {
    id: string;
    email: string;
    player: Player | null;
    role: UserRole;
}
