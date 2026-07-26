// app/api/posts/route.js
// GET  -> saare posts fetch karta hai
// POST -> naya post DB mein store karta hai

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Posts fetch nahi ho sake" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title aur content dono zaroori hain" },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: { title, content },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Post save nahi ho saka" },
      { status: 500 }
    );
  }
}
