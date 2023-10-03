import clientPromise from "@/database/mongodb";
import { Task } from "@/types/index";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req: Request,{ params }: { params: { id: string } }) {
  const {id} = params
  try {
    const client = await clientPromise;
    if (!client) {
      throw new Error('Can not connect to database')
    }
    const db = client.db("TodoApp");
    const collection = db.collection("TodoCollection")

    const updateTask = await req.json()
    // const result = id === updateTask.id ? await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateTask }) : null;


  } catch (e) {
    console.log(e)
    return NextResponse.json({ success: true, data: e }, { status: 200 });
  }
}
export async function DELETE(req: Request) {
  try {
    // const result = typeof id === "string" ? await collection.deleteOne({ _id: new ObjectId(id) }) : null        
    return NextResponse.json({ success: true, data: "no" }, { status: 200 });
  } catch (e) {
    console.log(e)
    return NextResponse.json({ success: true, data: e }, { status: 200 });
  }
}