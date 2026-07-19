// import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

// export async function GET(request: NextRequest) {
//   const query = request.nextUrl.searchParams.get("query") ?? "";

//   const meetings = await getMeetings(query);

//   return NextResponse.json(meetings);
// }
export async function GET(request: Request) {
  const date = new URL(request.url).searchParams.get('date'); // for example, "2026-05-03" or null
  const meetings = getMeetings(date);
  return Response.json(meetings);
}