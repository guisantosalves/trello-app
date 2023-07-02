"use client";
import { useBoardStore } from "@/store/BoardStore";
import * as React from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import ColumnComponent from "./Column";
import { Column } from "@/typings";

export default function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );

  React.useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // handle a column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries()); // converting hashmap to array

      // remove from that place and saves in removed
      const [removed] = entries.splice(source.index, 1);

      // push that removed to another place inside entries
      entries.splice(destination.index, 0, removed);

      const rearrengedColumns = new Map(entries);

      // keep everythin and change only what I did
      setBoardState({ ...board, columns: rearrengedColumns });
    }

    // handle a card drag
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];

    // here I will modify the columns when I do the modification
    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    }; // source col

    const finishCOl: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    }; // destination col

    console.log(startCol);
    console.log(finishCOl);

    if (!startCol || !finishCOl) {
      return;
    }

    // equal column
    if (source.index === destination.index && startCol === finishCOl) {
      return;
    }

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCOl.id) {
      // same column task drag
      newTodos.splice(destination.index, 0, todoMoved);

      const newCol: Column = {
        id: startCol.id,
        todos: newTodos,
      };

      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);

      setBoardState({ ...board, columns: newColumns });
    } else {
      // different columns
      const finishTodos = Array.from(finishCOl.todos);
      finishTodos.splice(destination.index, 0, todoMoved);

      const newColumns = new Map(board.columns);
      const newCol: Column = {
        id: startCol.id,
        todos: newTodos,
      };

      // set the modification of remove that specific card
      newColumns.set(startCol.id, newCol);

      // inserting into hashmap that we drop the card
      newColumns.set(finishCOl.id, {
        id: finishCOl.id,
        todos: finishTodos,
      });

      // update in db as well
      updateTodoInDB(todoMoved, finishCOl.id);

      setBoardState({ ...board, columns: newColumns });
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <ColumnComponent
                key={id}
                id={id}
                todos={column.todos}
                index={index}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
