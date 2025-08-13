import express from "express";
import * as projectService from "./service";

const router = express.Router();
//Register own routes
router.get("/", getAllProjects);
router.get("/:projectId", getProject);
router.post("/", createProject);
router.put("/:projectId", updateProject);
router.delete("/:projectId", deleteProject);
export default router;

async function getAllProjects(req, res, next) {
    try {
        let projects = await projectService.getAllProjects();
        res.status(200).json(projects);
    }
    catch (e) { next(e); }
}

async function getProject(req, res, next) {
    try {
        const projectId = req.params.projectId;
        let projectData = await projectService.getProject(projectId);
        res.status(200).json(projectData);
    }
    catch (e) { next(e); }
}

async function createProject(req, res, next) {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const notes = req.body.notes;

        const projectId = await projectService.createProject(title, description, notes);
        res.status(201).json({ status: "success", message: "Created project successfully", projectId: projectId });
    }
    catch (e) { next(e); }
}

async function updateProject(req, res, next) {
    try {
        const title = req.body.title;
        const description = req.body.description;
        const notes = req.body.notes;
        const projectId = req.params.projectId;

        await projectService.updateProject(projectId, title, description, notes);
        res.status(204).json({ status: "success", message: "Updated project successfully" });
    }
    catch (e) { next(e); }
}

async function deleteProject(req, res, next) {
    try {
        const projectId = req.params.projectId;

        await projectService.deleteProject(projectId);
        res.status(204).json({ status: "success", message: "Deleted project successfully" });
    }
    catch (e) { next(e); }
}
