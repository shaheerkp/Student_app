import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest } from "next/server";
const client = new PrismaClient();
export async function GET(req: NextRequest) {
  let rows = req.nextUrl.searchParams.get("rows");
  let skip = req.nextUrl.searchParams.get("skip");
  let key = req.nextUrl.searchParams.get("key");
  let value = req.nextUrl.searchParams.get("value");
  let finalSkip = rows ? parseInt(rows) * parseInt(skip ? skip : "0") : 0;
  let filter: { [key: string]: any } = {};
  if (key && value) {
    if (["age", "totalMark"].includes(key)) {
      filter[key] = parseFloat(value);
    } else {
      filter[key] = {
        contains: value,
        mode: "insensitive",
      };
    }
  }
  let student = await client.student.findMany({
    take: parseInt(rows ? rows : "10"),
    skip: finalSkip,
    where: filter,
  });
  const totalCount = await client.student.count({
    where: filter,
  });
  return Response.json({ student, totalCount });
}

export async function POST(req: NextRequest, res: NextApiResponse) {
  const body = await req.json();
  try {
    let result = await client.student.create({
      data: {
        name: body.name.toLowerCase(),
        age: body.age,
        studentId: body.id.toLowerCase(),
        totalMark: body.totalMark,
      },
    });
    return Response.json(result);
  } catch (error) {
    res.status(500).json({ error: "failed to save data" });
  }
}
