import { databases } from "@/appwrite";
import { Board, Column, TypedColumn } from "@/typings";

export const getTodosGroupedByColumns = async () => {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_COLLECTION_ID!
  );
  const todos = data.documents;

  // acc -> accumulate value
  // todo -> current value that has been mapping into
  // it will accumulate in the new map created
  const columns = todos.reduce((acc, todo) => {
    // create here
    if (!acc.get(todo.status)) {
      // set here when it will be intereting
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }

    // inserting into the Map
    acc.get(todo.status)!.todos.push({
      $id: todo.$id,
      $createdAt: todo.$createdAt,
      title: todo.title,
      status: todo.status,
      ...(todo.image && { image: JSON.parse(todo.image) }),
    });

    return acc;
  }, new Map<TypedColumn, Column>());

  // if data does not have one of the columns add them with empty todos
  const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
  for (const columntype of columnTypes) {
    // if there is not inside the Map one of types
    if (!columns.get(columntype)) {
      columns.set(columntype, {
        id: columntype,
        todos: [],
      });
    }
  }

  // Map.entries() method is used for returning an iterator object
  // which contains all the [key, value] pairs of each element of the map.
  //sorting columns
  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  ); // sorting in correct order

  const board: Board = {
    columns: sortedColumns,
  };

  return board;
};
