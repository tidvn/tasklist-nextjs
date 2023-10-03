import clientPromise from "@/database/mongodb";
import { Task, TasksState } from "@/types/index";
import { NextResponse } from "next/server";
export async function GET(req: Request) {
  try {
    
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

      
    return NextResponse.json({ success: true, data: result }, { status: 200 });
  } catch (e) {
    console.log(e)
    return NextResponse.json({ success: true, data: e }, { status: 200 });
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
    taskData.deadline = new Date(taskData.deadline)
    const {id,...value} = taskData
    await collection.insertOne(value)
    return NextResponse.json({ success: true, data: value._id }, { status: 200 });
  } catch (e) {
    console.log(e)
    return NextResponse.json({ success: true, data: e }, { status: 200 });
  }
}
