import { databases } from "@/appwrite";

export const getTodosGroupedByColumns = async () => {
  console.log(process.env.NEXT_PUBLIC_DATABASE_ID);
  console.log(process.env.NEXT_PUBLIC_COLLECTION_ID!);
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ID!
  );
  console.log(data);
};
