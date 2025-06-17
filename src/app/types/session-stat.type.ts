export type SessionStat = {
    date: number,
    matchCount: number,
    rank: Array<RankSessionStat>
}

export type RankSessionStat = {
    player: {
        id: number,
        firstname: string,
        lastname: string | null
    },
    wins: number,
    losses: number,
    totalPointsScored: number,
    totalPointsReceived: number
}
