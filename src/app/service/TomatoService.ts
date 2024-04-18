import HttpService from "./HttpService";

class TomatoService {
    getTomato = () => {
        return HttpService.getAxiosClient().get("https://marcconrad.com/uob/tomato/api.php");
    };
}

const tomatoService = new TomatoService();
export default tomatoService;