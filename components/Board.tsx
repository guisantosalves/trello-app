"use client";
import { useBoardStore } from "@/store/BoardStore";
import * as React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Board() {
  const getBoard = useBoardStore((state) => state.getBoard);
  React.useEffect(() => {
    getBoard();
  }, [getBoard]);

  return (
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div>{/* redereing all the columns */}</div>}
    //   </Droppable>
    // </DragDropContext>
    <div></div>
  );
}
