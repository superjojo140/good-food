import { SwuDom } from "swu-core";
import ProjectController from "./controller";
import ProjectService from "./service";
import ProjectView from "./view";

export default class ProjectModule {

    static state = {};

    static service: ProjectService;
    static controller: ProjectController;
    static view: ProjectView;

    static async init() {
        await SwuDom.loadHtml("markup.html");
        ProjectModule.service = new ProjectService();
        ProjectModule.controller = new ProjectController();
        ProjectModule.view = new ProjectView();

        await ProjectModule.controller.init();
    }
}













