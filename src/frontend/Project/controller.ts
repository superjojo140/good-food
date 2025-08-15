import { SwuAlert } from "swu-core";
import ProjectModule from "./module";

export default class ProjectController {



    async init() {
        await this.refreshProjectList();
    }

    async refreshProjectList() {
        try {
            let projectList = await ProjectModule.service.getAllProject();
            ProjectModule.view.updateListView(projectList);
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }


    async handleProjectEdit(projectId: string) {
        try {
            let projectData = ProjectModule.view.getModalFormData();
            projectData.id = projectId;
            const resp = await ProjectModule.service.updateProject(projectData);
            SwuAlert.alertResp(resp, "Saving Project");
            ProjectModule.view.modal.hide(); //refresh project list via hide event
        } catch (error) {
            SwuAlert.alertError(error);
        }

    }

    async handleProjectCreate() {
        try {
            let projectData = ProjectModule.view.getModalFormData();
            const resp = await ProjectModule.service.createProject(projectData);
            SwuAlert.alertResp(resp, "Create Project");
            ProjectModule.view.modal.hide(); //refresh project list via hide event
        } catch (error) {
            SwuAlert.alertError(error);
        }

    }

    async handleProjectDelete(projectId: string) {
        try {
            let confirmResp = await SwuAlert.deleteConfirm("Delete Project", "Do you really want to delete this Project?");
            let resp = await ProjectModule.service.deleteProject(projectId);
            SwuAlert.alertResp(resp, "Delete Project");
            await this.refreshProjectList();
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }

    async showProjectModalForUpdate(projectId: string) {
        try {
            const projectData = await ProjectModule.service.getProject(projectId);
            ProjectModule.view.setModalFormData(projectData);
            ProjectModule.view.setModalSubmitEvent(() => {
                ProjectModule.controller.handleProjectEdit(projectId);
            });
            ProjectModule.view.modal.show();
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }

    async showProjectModalForCreate() {
        try {
            ProjectModule.view.setModalSubmitEvent(() => {
                ProjectModule.controller.handleProjectCreate();
            });
            ProjectModule.view.modal.show();
        } catch (error) {
            SwuAlert.alertError(error);
        }
    }


}




