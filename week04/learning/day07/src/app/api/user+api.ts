import { db } from "../lib/db";

export async function GET() {
  try {
    
  } catch (error) {
    console.log({ error });
  }
}

export async function POST(request: Request) {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return Response.json({
        error: "Name and email are required",
        status: 404,
      });

    }
    const result=await db.execute({
      sql:"INSERT INTO user_data (name,email) VALUES(?,?)",
      args:[name,email]
    })

    return Response.json({
      status:200,
      message:"User is created",
      result
    })

  } catch (error) {
    console.log({
      error,
    });
  }
}
