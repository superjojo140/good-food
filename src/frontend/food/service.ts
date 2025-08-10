import { SwuFetch, SwuHttpResponse } from "swu-core";
import { food } from "./model";

export default class foodService {

    //TODO: Use more than GET and POST (update SWUFetch)

    async getAllfood() {
        return await SwuFetch.getJson("food") as food[];
    }

    async getfood(foodId: string) {
        return await SwuFetch.getJson(`food/${foodId}`) as food;
    }

    async updatefood(foodData: food) {
        let resp = await SwuFetch.postJson(`food/${foodData.id}`, foodData) as SwuHttpResponse;
        if (resp.status == "error") { throw new Error(resp.message) };
        return resp;
    }

    async createfood(foodData: Omit<food, "id">) {
        let resp = await SwuFetch.postJson(`food`, foodData) as SwuHttpResponse;
        if (resp.status == "error") { throw new Error(resp.message) };
        return resp;
    }

    async deletefood(foodId: string) {
        let resp = await SwuFetch.getJson(`food/${foodId}`) as SwuHttpResponse;
        if (resp.status == "error") { throw new Error(resp.message) };
        return resp;
    }
}
