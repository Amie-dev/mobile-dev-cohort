export async function GET() {
  console.log("Server is called")
  return Response.json({
    success: true,
    users: [
      {
        id: 1,
        name: "Aminul",
      },
    ],
  });
}