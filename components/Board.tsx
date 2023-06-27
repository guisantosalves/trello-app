"use client";
import * as React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function Board() {
  React.useEffect(() => {
    // get board
  }, []);

  return (
    // <DragDropContext>
    //   <Droppable droppableId="board" direction="horizontal" type="column">
    //     {(provided) => <div>{/* redereing all the columns */}</div>}
    //   </Droppable>
    // </DragDropContext>
    <div></div>
  );
}
