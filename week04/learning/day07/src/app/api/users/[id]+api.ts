import { db } from "@/app/lib/db";

type Ctx = {
  id: string;
};
export async function GET(_req: Request, { id }: Ctx) {
  try {
  } catch (error) {
    console.log({error})
  }
}
export async function PATCH(_req: Request, { id }: Ctx) {
  try {
  } catch (error) {
    console.log({
      error
    })
  }
}
