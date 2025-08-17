import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import * as dbService from './../database/service';
import {Project} from '../../model/Project/model'


export async function getProject(projectId: string) {
    const queryCmd = `SELECT * FROM project WHERE id = ?`;
    const [rows] = await dbService.query<RowDataPacket[]>(queryCmd, [projectId]);
    return rows[0] as Project;
}

export async function getProjectList() {
    const queryCmd = `SELECT * FROM project`;
    const [rows] = await dbService.query<RowDataPacket[]>(queryCmd);
    return rows as Project[];
}

export async function createProject(title: string, description: string, notes: string) {
    //TODO: dynamic properties
    const queryCmd = `INSERT INTO project (title, notes, description) VALUES (?, ?, ?)`;
    const [result] = await dbService.query<ResultSetHeader>(queryCmd, [title, description, notes]);
    return result.insertId;
}

export async function updateProject(projectId: string, title: string, description: string, notes: string) {
     //TODO: dynamic properties
    const queryCmd = `UPDATE project SET title = ?, notes = ?, description = ? WHERE id = ?`;
    await dbService.query<ResultSetHeader>(queryCmd, [title, description, notes, projectId]);
}

export async function deleteProject(projectId: string) {
    const queryCmd = `DELETE FROM project WHERE id = ?`;
    await dbService.query<ResultSetHeader>(queryCmd, [projectId]);
}
