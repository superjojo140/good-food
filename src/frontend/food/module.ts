import foodController from "./controller";
import foodService from "./service";
import foodView from "./view";

export default class foodModule {

    static state = {};

    static service: foodService;
    static controller: foodController;
    static view: foodView;

    static async init() {
        foodModule.service = new foodService();
        foodModule.controller = new foodController();
        foodModule.view = new foodView();

        await foodModule.controller.init();
    }
}

await foodModule.init();












