// app/api/posts/[id]/route.js
// GET    -> ek post detail (id se)
// PATCH  -> post edit/update karna
// DELETE -> post delete karna (comments bhi cascade se delete hongi)

import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return NextResponse.json({ error: "Post nahi mila" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Post fetch nahi ho saka" },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title aur content dono zaroori hain" },
        { status: 400 }
      );
    }

    const updated = await prisma.post.update({
      where: { id },
      data: { title, content },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Post update nahi ho saka" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Post delete nahi ho saka" },
      { status: 500 }
    );
  }
}
