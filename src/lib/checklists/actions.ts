"use server";
import { neon } from "@neondatabase/serverless";

export async function getCustomers() {

    const sql = neon(process.env.DATABASE_URL!);
    const customer_data = await sql`SELECT * FROM customer`;
    return customer_data;
}
export async function getCustomerName(customerId: number) {
    const sql = neon(process.env.DATABASE_URL!);
    const customer_data = await sql`SELECT customername FROM customer WHERE customerid = ${customerId}`;
    return customer_data;
}

export async function patchTasks(taskId: number, taskName: string, taskInstructions: string) {
    const sql = neon(process.env.DATABASE_URL!);
    const tasks_data = await sql`UPDATE tasks SET taskname = ${taskName}, taskinstructions = ${taskInstructions} WHERE taskid = ${taskId}`;
    return tasks_data;
}

export async function deleteTask(taskId: number) {
    const sql = neon(process.env.DATABASE_URL!);
    const tasks_data = await sql`DELETE FROM tasks WHERE taskid = ${taskId}`;
    return tasks_data;
}


export async function getChecklists(customerId: number) {
    const sql = neon(process.env.DATABASE_URL!);
    const checklist_data = await sql`SELECT * FROM checklists WHERE customerid = ${customerId}`;
    return checklist_data;
}

export async function getCustomerFromChecklist(checklistId: number) {
    const sql = neon(process.env.DATABASE_URL!);
    const checklist_data = await sql`SELECT * FROM checklists WHERE checklistId = ${checklistId}`;
    return checklist_data;
}

export async function getTasks(checklistId: number) {
    const sql = neon(process.env.DATABASE_URL!);
    const tasks_data = await sql`SELECT * FROM tasks WHERE checklistid = ${checklistId}`;
    return tasks_data;
}

export async function addTask(
    taskname: string,
    taskinstructions: string,
    taskgroupid: number,
    checklistid: number,
) {
    const sql = neon(process.env.DATABASE_URL!);

    const tasks_data = await sql`
        INSERT INTO tasks (taskid, taskname, taskinstructions, groupid, checklistid, tasksequence)
        SELECT 
            COALESCE(MAX(tasks.taskid), 0) + 1 AS taskid,
            ${taskname},
            ${taskinstructions},
            ${taskgroupid},
            ${checklistid},
            COALESCE(MAX(t.tasksequence), 0) + 1 AS tasksequence
        FROM tasks
        LEFT JOIN (
            SELECT checklistid, groupid, MAX(tasksequence) as tasksequence
            FROM tasks
            WHERE checklistid = ${checklistid} AND groupid = ${taskgroupid}
            GROUP BY checklistid, groupid
        ) t ON t.checklistid = ${checklistid} AND t.groupid = ${taskgroupid}
        RETURNING taskid, tasksequence;`;

    return tasks_data[0];
}
