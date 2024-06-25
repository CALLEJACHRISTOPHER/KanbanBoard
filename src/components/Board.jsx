import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function Board() {
	const [completed, setCompleted] = useState([]);
	const [incomplete, setIncomplete] = useState([]);
	const [backlog, setBacklog] = useState([]);
	const [inProgress, setInProgress] = useState([]);

	// load contents from database or api
	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
			.then((response) => response.json())
			.then((json) => {
				setCompleted(json.filter((task) => task.completed));
				setIncomplete(json.filter((task) => !task.completed));
			});
	}, []);

	// function for dragging card in different columns
	const handleDragEnd = (result) => {
		const { destination, source, draggableId } = result;

		if (!destination || source.droppableId === destination.droppableId) return;

		deletePreviousState(source.droppableId, draggableId);

		const task = findItemById(draggableId, [
			...incomplete,
			...completed,
			...inProgress,
			...backlog,
		]);

		setNewState(destination.droppableId, task);
	};

	// remove item in the column
	function deletePreviousState(sourceDroppableId, taskId) {
		switch (sourceDroppableId) {
			case "1":
				setIncomplete(removeItemById(taskId, incomplete));
				break;
			case "2":
				setCompleted(removeItemById(taskId, completed));
				break;
			case "3":
				setInProgress(removeItemById(taskId, inProgress));
				break;
			case "4":
				setBacklog(removeItemById(taskId, backlog));
				break;
		}
	}

	// update record
	function setNewState(destinationDroppableId, task) {
		let updatedTask;
		switch (destinationDroppableId) {
			case "1": // TO DO
				updatedTask = { ...task, completed: false };
				setIncomplete([updatedTask, ...incomplete]);
				break;
			case "2": // DONE
				updatedTask = { ...task, completed: true };
				setCompleted([updatedTask, ...completed]);
				break;
			case "3": // IN REVIEW
				updatedTask = { ...task, completed: false };
				setInProgress([updatedTask, ...inProgress]);
				break;
			case "4": // BACKLOG
				updatedTask = { ...task, completed: false };
				setBacklog([updatedTask, ...backlog]);
				break;
		}
	}

	function findItemById(id, array) {
		return array.find((item) => item.id == id);
	}

	function removeItemById(id, array) {
		return array.filter((item) => item.id != id);
	}

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<h2 style={{ textAlign: "center" }}>PROGRESS BOARD</h2>

			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
					width: "1300px",
					margin: "0 auto",
				}}
			>
				<Column title={"TO DO"} tasks={incomplete} id={"1"} />
				<Column title={"DOING"} tasks={inProgress} id={"3"} />
				<Column title={"DONE"} tasks={completed} id={"2"} />
				<Column title={"BACKLOG"} tasks={backlog} id={"4"} />
			</div>
		</DragDropContext>
	);
}
