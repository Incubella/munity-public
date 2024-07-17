// utils/snapshot.js
export async function fetchGraphQL(query, variables = {}) {
  const snapshotApiEndpoint = "https://hub.snapshot.org/graphql";

  const response = await fetch(snapshotApiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error fetching data: ${data.errors?.map((e) => e.message).join(", ")}`
    );
  }

  return data.data;
}
