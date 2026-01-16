import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createFeedbackIssue } from "@/lib/github";
import { FeedbackFormData } from "@/types/feedback";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.name || !session.accessToken) {
      return NextResponse.json(
        { message: "You must be signed in to submit feedback" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { category, priority, title, description, currentPage } =
      body as FeedbackFormData;

    if (!category || !priority || !title || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const validCategories = [
      "bug",
      "content",
      "feature",
      "general",
    ];
    const validPriorities = ["nice-to-have", "would-help", "blocking-me"];

    if (!validCategories.includes(category)) {
      return NextResponse.json(
        { message: "Invalid category" },
        { status: 400 }
      );
    }

    if (!validPriorities.includes(priority)) {
      return NextResponse.json(
        { message: "Invalid priority" },
        { status: 400 }
      );
    }

    const issue = await createFeedbackIssue(
      session.accessToken,
      { category, priority, title, description, currentPage },
      session.user.name
    );

    return NextResponse.json({
      success: true,
      issueNumber: issue.number,
      url: issue.html_url,
    });
  } catch (error) {
    console.error("Failed to create feedback issue:", error);

    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    if (errorMessage.includes("Bad credentials")) {
      return NextResponse.json(
        { message: "GitHub authentication expired. Please sign in again." },
        { status: 401 }
      );
    }

    if (errorMessage.includes("Not Found")) {
      return NextResponse.json(
        { message: "Repository not found or no access. Please sign out and sign in again." },
        { status: 403 }
      );
    }

    return NextResponse.json(
      { message: `Failed to submit feedback: ${errorMessage}` },
      { status: 500 }
    );
  }
}
