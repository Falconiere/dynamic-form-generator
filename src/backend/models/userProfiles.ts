import { Model } from "../Model"
import { getCurrentUser } from "../getCurrentUser"

class UserProfiles extends Model {
  async get() {
    const user = await getCurrentUser()
    return await this.client.user_profiles.findFirstOrThrow({ 
      where:{
        user_id: user?.id,
      }
    })
  }
}
const userProfileService = new UserProfiles()
export { userProfileService as UserProfiles }