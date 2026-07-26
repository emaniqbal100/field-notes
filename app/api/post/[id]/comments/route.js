// app/api/posts/[id]/comments/route.js
// GET  -> ek post ki saari comments
// POST -> naya comment add karna

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id: idParam } = await params;
    const postId = Number(idParam);
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Comments fetch nahi ho sakay" },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id: idParam } = await params;
    const postId = Number(idParam);
    const body = await request.json();
    const { author, body: commentBody } = body;

    if (!author || !commentBody) {
      return NextResponse.json(
        { error: "Naam aur comment dono zaroori hain" },
        { status: 400 }
      );
    }

    const comment = await prisma.comment.create({
      data: { author, body: commentBody, postId },
    });

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Comment save nahi ho saka" },
      { status: 500 }
    );
  }
}
