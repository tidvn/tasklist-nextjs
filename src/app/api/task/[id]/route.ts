import clientPromise from "@/database/mongodb";
import { Task } from "@/types/index";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const origin = req.headers.get("origin")
    const client = await clientPromise;
    if (!client) {
      throw new Error('Can not connect to database')
    }

    const db = client.db("TodoApp");
    const collection = db.collection("TodoCollection")
    const updateTask = await req.json()
    const result = id === updateTask.id ? await collection.updateOne({ _id: new ObjectId(id) }, { $set: updateTask }) : null;
    const res = result?.modifiedCount
    return NextResponse.json({ success: true, data: res }, {
      status: 200, headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });

  } catch (e: any) {
    const res = e.message
    return NextResponse.json({ success: true, data: res }, {
      status: 400, headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
}
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  try {
    const origin = req.headers.get("origin")
    const client = await clientPromise;
    if (!client) {
      throw new Error('Can not connect to database')
    }
    const db = client.db("TodoApp");
    const collection = db.collection("TodoCollection")
    const result = typeof id === "string" ? await collection.deleteOne({ _id: new ObjectId(id) }) : null
    const response = result?.deletedCount
    return NextResponse.json({ success: true, data: response }, {
      status: 200, headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  } catch (e: any) {
    const message = e.message
    return NextResponse.json({ success: false, data: message }, {
      status: 400, headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
}