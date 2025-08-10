import { SwuFetch, SwuHttpResponse } from "swu-core";
import { Post } from "./model";

export default class PostService {

    //TODO: Use more than GET and POST (update SWUFetch)

    async getAllPost() {
        return await SwuFetch.getJson("https://jsonplaceholder.typicode.com/posts") as Post[];
    }

    async getPost(postId: string) {
        return await SwuFetch.getJson(`post/${postId}`) as Post;
    }

    async updatePost(postData: Post) {
        let resp = await SwuFetch.postJson(`post/${postData.id}`, postData) as SwuHttpResponse;
        if (resp.status == "error") { throw new Error(resp.message) };
        return resp;
    }

    async createPost(postData: Omit<Post, "id">) {
        let resp = await SwuFetch.postJson(`post`, postData) as SwuHttpResponse;
        if (resp.status == "error") { throw new Error(resp.message) };
        return resp;
    }

    async deletePost(postId: string) {
        let resp = await SwuFetch.getJson(`post/${postId}`) as SwuHttpResponse;
        if (resp.status == "error") { throw new Error(resp.message) };
        return resp;
    }
}
