import { SwuHttpResponse } from "swu-core";
import { Project } from "./model";

export default class ProjectService {

    //TODO: Use more than GET and POST (update SWUFetch)

    async getAllProject() {
        const resp = await fetch("project");
        return await resp.json() as Project[];
    }

    async getProject(projectId: string) {
        const resp = await fetch(`project/${projectId}`);
        return await resp.json() as Project;
    }

    async updateProject(projectData: Project) {
        const resp = await fetch(`project/${projectData.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projectData)
        });

        const respJson = await resp.json() as SwuHttpResponse;
        if (respJson.status == "error") { throw new Error(respJson.message) };
        return respJson;
    }

    async createProject(projectData: Omit<Project, "id">) {
        const resp = await fetch(`project`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projectData)
        });

        const respJson = await resp.json() as SwuHttpResponse;
        if (respJson.status == "error") { throw new Error(respJson.message) };
        return respJson;
    }

    async deleteProject(projectId: string) {
        const resp = await fetch(`project/${projectId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });

        const respJson = await resp.json() as SwuHttpResponse;
        if (respJson.status == "error") { throw new Error(respJson.message) };
        return respJson;
    }
}
