"use server";
import { neon } from "@neondatabase/serverless";

export async function getCustomers() {
    const sql = neon(process.env.DATABASE_URL!);
    const customersData = await sql`SELECT 
        customerid, 
        customername 
    FROM customer`;
    return customersData;
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
    const checklist_data = await sql`
        SELECT 
            checklistid as "checklistId",
            checklistname as "checklistName",
            customerid as "customerId"
        FROM checklists 
        WHERE customerid = ${customerId}
    `;
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

export async function addCustomer(
    customerName: string,
): Promise<number> {
    const sql = neon(process.env.DATABASE_URL!);

    const existingCustomer = await sql`
        SELECT customername 
        FROM customer 
        WHERE LOWER(customername) = LOWER(${customerName})
    `;
    if (existingCustomer.length > 0) {
        throw new Error(`Customer "${customerName}" already exists`);
    }

    const customer_data = await sql`
        INSERT INTO customer (customerid, customername)
        SELECT 
            COALESCE(MAX(customer.customerid), 0) + 1 as customerid,
            ${customerName}
        FROM customer
        RETURNING customerid
    `;

    return customer_data[0].customerid;
}

export async function addChecklist(
    checklistName: string,
    customerId: number
) {
    const sql = neon(process.env.DATABASE_URL!);
    
    const existingChecklist = await sql`
        SELECT checklistname
        FROM checklists
        WHERE LOWER(checklistname) = LOWER(${checklistName})
    `;
    if (existingChecklist.length > 0) {
        throw new Error(`Customer "${checklistName}" already exists`);
    }
    
    const checklist_data = await sql`
    INSERT INTO checklists (
        checklistid,
        checklistname,
        customerid
    ) 
    VALUES (
        (SELECT COALESCE(MAX(checklistid), 0) + 1 FROM checklists),
        ${checklistName},
        ${customerId}
    )
    RETURNING checklistid;`;
    console.log(checklist_data);
    return checklist_data[0].checklistid;
}

