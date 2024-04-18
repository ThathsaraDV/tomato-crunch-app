import HttpService from "./HttpService";

class ProfileService {

    getProfileData = (username: string) => {
        return HttpService.get("profile-service/get-profile-data/" + username, {
            headers: {
                'require-token': 'true'
            },
        });
    }
}

const profileService = new ProfileService();
export default profileService;