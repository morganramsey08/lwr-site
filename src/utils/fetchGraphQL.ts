import { draftMode, cookies } from "next/headers";

export async function fetchGraphQL<T = any>(
  query: string,
  variables?: { [key: string]: any },
  headers?: { [key: string]: string },
): Promise<T> {
  // Unwrapped draftMode promise for Next.js dynamic API updates
  const { isEnabled: preview } = await draftMode();

  // Safe fallback to check both environment variable naming conventions
  const wpUrl = 
    process.env.NEXT_PUBLIC_WORDPRESS_URL || 
    process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  if (!wpUrl) {
    throw new Error(
      "Missing WordPress URL environment variable! Please ensure NEXT_PUBLIC_WORDPRESS_URL is set in your .env.local file."
    );
  }

  try {
    let authHeader = "";
    if (preview) {
      // Unwrapped cookies promise before calling .get()
      const cookieStore = await cookies();
      const auth = cookieStore.get("wp_jwt")?.value;
      if (auth) {
        authHeader = `Bearer ${auth}`;
      }
    }

    const body = JSON.stringify({
      query,
      variables: {
        preview,
        ...variables,
      },
    });

    const response = await fetch(
      `${wpUrl}/graphql`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(authHeader && { Authorization: authHeader }),
          ...headers,
        },
        body,
        cache: preview ? "no-cache" : "default",
        next: {
          tags: ["wordpress"],
        },
      },
    );

    if (!response.ok) {
      console.error("Response Status:", response);
      throw new Error(response.statusText);
    }

    const data = await response.json();

    if (data.errors) {
      console.error("GraphQL Errors:", JSON.stringify(data.errors, null, 2));
      throw new Error("Error executing GraphQL query");
    }

    return data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}