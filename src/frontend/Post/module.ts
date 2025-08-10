import PostController from "./controller";
import PostService from "./service";
import PostView from "./view";

export default class PostModule {

    static state = {};

    static service: PostService;
    static controller: PostController;
    static view: PostView;

    static async init() {
        PostModule.service = new PostService();
        PostModule.controller = new PostController();
        PostModule.view = new PostView();

        await PostModule.controller.init();
    }
}

await PostModule.init();












