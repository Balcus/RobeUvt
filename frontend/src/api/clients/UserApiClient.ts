import { BaseApiClient } from "../base/BaseApiClient";
import type { UserCreateModel } from "../models/User/UserCreateModel";
import type { UserModel } from "../models/User/UserModel";

export const UserApiClient = {
  urlPath: "api/user",

  async getAllAsync(): Promise<UserModel[]> {
    return BaseApiClient.get<UserModel[]>(UserApiClient.urlPath).then(
      (response) => response.data
    );
  },

  async updateAsync(user: UserModel): Promise<UserModel> {
    return BaseApiClient.put<UserModel>(
      `${UserApiClient.urlPath}/${user.id}`,
      user
    ).then((response) => response.data);
  },

  async createAsync(user: UserCreateModel): Promise<UserCreateModel> {
    return BaseApiClient.post<UserCreateModel>(
      UserApiClient.urlPath,
      user
    ).then((response) => response.data);
  },
};
