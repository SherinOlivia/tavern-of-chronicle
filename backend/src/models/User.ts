export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    role: 'game_master' | 'player';
}