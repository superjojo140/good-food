import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import * as dbService from './../database/service';


export async function getProject(projectId: string) {
    const queryCmd = `SELECT * FROM projects WHERE id = ?`;
    const [rows] = await dbService.query<RowDataPacket[]>(queryCmd, [projectId]);
    return rows[0];
}

export async function getAllProjects() {
    const queryCmd = `SELECT * FROM projects`;
    const [rows] = await dbService.query<RowDataPacket[]>(queryCmd);
    return rows;
}

export async function createProject(title: string, description: string, notes: string) {
    const queryCmd = `INSERT INTO projects (title, description, notes) VALUES (?, ?, ?)`;
    const [result] = await dbService.query<ResultSetHeader>(queryCmd, [title, description, notes]);
    return result.insertId;
}

export async function updateProject(projectId: string, title: string, description: string, notes: string) {
    const queryCmd = `
        UPDATE projects 
        SET title = ?, description = ?, notes = ? 
        WHERE id = ?
    `;
    await dbService.query<ResultSetHeader>(queryCmd, [title, description, notes, projectId]);
}

export async function deleteProject(projectId: string) {
    const queryCmd = `DELETE FROM projects WHERE id = ?`;
    await dbService.query<ResultSetHeader>(queryCmd, [projectId]);
}
