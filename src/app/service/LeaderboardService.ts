import HttpService from "./HttpService";
import FilterDto from "../dto/FilterDto";

class LeaderboardService {

    getTableData = (filterDto: FilterDto) => {
        return HttpService.post("leaderboard-service/get-table-data", filterDto, {
            headers: {
                'require-token': 'true'
            },
        });
    }
}

const leaderboardService = new LeaderboardService();
export default leaderboardService;