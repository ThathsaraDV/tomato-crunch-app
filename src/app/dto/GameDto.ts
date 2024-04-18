export interface GameDto {
    id: number | null;
    username: string;
    level: number;
    bestTime: number | null;
    worstTime: number | null;
    highestScore: number;
    lowestScore: number;
    totalScore: number;
    time: number;
    score: number;
    key: number|null;
}

export default GameDto;