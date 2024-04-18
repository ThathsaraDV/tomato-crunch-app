import HttpService from "./HttpService";
import GameDto from "../dto/GameDto";

class GameService {
    getGameData = (username: string) => {
        return HttpService.get("game-service/get-game-data/" + username, {
            headers: {
                'require-token': 'true'
            },
        });
    }

    saveGameData = (gameDto: GameDto) => {
        return HttpService.post("game-service/save-game-data", gameDto, {
            headers: {
                'require-token': 'true'
            },
        });
    }

    restartProgress = (username: string) => {
        return HttpService.get("game-service/restart/" + username, {
            headers: {
                'require-token': 'true'
            },
        });
    }
}

const gameService = new GameService();
export default gameService;