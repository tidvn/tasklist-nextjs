import clientPromise from "@/database/mongodb";
import { Task, TasksState } from "@/types/index";
import { NextResponse } from "next/server";
const  headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true',
}
export async function GET(req: Request) {
  try {
    const origin=req.headers.get("origin")
    const client = await clientPromise;
    if (!client) {
      throw new Error('Can not connect to database')
    }
    const db = client.db("TodoApp");
    const collection = db.collection("TodoCollection")
    const result = await collection
      .find({})
      .sort({ metacritic: -1 })
      .toArray();
      const tasksWithId : any = result.map((task:any) => {
        const { _id, ...rest } = task;
        return { id: _id.toHexString(), ...rest };
      });

      const tasksState: TasksState = {
        overdue: tasksWithId.filter((task: any) => {
          return (task.status === "todo" || task.status === "doing") && new Date(task.deadline) <= new Date();
        }),
        todo: tasksWithId.filter((task: any) => {
          return task.status === "todo" && new Date(task.deadline) > new Date();
        }),
        doing: tasksWithId.filter((task: any) => {
          return task.status === "doing" && new Date(task.deadline) > new Date();
        }),
        done: tasksWithId.filter((task: any) => {
          return task.status === "done";
        }),
      };
      
      return NextResponse.json({ success: true, data: tasksState }, { status: 200, headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }, });
    
      
  } catch (e) {
    console.log(e)
    return NextResponse.json({ success: false, data: e }, { status: 400,headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }, });
  }
}
export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    if (!client) {
      throw new Error('Can not connect to database')
    }
    const db = client.db("TodoApp");
    const collection = db.collection("TodoCollection")
    const taskData = await req.json()
    const {id,...value} = taskData
    await collection.insertOne(value)
    return NextResponse.json({ success: true, data: value._id }, { status: 200,headers:headers });
  } catch (e) {
    console.log(e)
    return NextResponse.json({ success: true, data: e }, { status: 200,headers:headers });
  }
}
