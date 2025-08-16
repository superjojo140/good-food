import express, { NextFunction, Request as ExpressRequest, Response as ExpressResponse} from "express";
import * as projectService from "./service";

const router = express.Router();
//Register own routes
router.get("/", getProjectList);
router.get("/:projectId", getProject);
router.post("/", createProject);
router.put("/:projectId", updateProject);
router.delete("/:projectId", deleteProject);
export default router;

async function getProjectList(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
    try {
        let projectList = await projectService.getProjectList();
        res.status(200).json(projectList);
    }
    catch (e) { next(e); }
}

async function getProject(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
    try {
        const projectId = req.params.projectId;
        let projectData = await projectService.getProject(projectId);
        res.status(200).json(projectData);
    }
    catch (e) { next(e); }
}

async function createProject(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const notes = req.body.notes;

        const projectId = await projectService.createProject(title, description, notes);
        res.status(200).json({ status: "success", message: "Created project successfully", projectId: projectId });
    }
    catch (e) { next(e); }
}

async function updateProject(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const notes = req.body.notes;
        const projectId = req.params.projectId;

        await projectService.updateProject(projectId, title, description, notes);
        res.status(200).json({ status: "success", message: "Updated project successfully" });
    }
    catch (e) { next(e); }
}

async function deleteProject(req: ExpressRequest, res: ExpressResponse, next: NextFunction) {
    try {
        const projectId = req.params.projectId;

        await projectService.deleteProject(projectId);
        res.status(200).json({ status: "success", message: "Deleted project successfully" });
    }
    catch (e) { next(e); }
}
