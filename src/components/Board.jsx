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
		fetch("http://localhost:3000/task")
			.then((response) => response.json())
			.then((json) => {
				setCompleted(json.filter((task) => task.completed == "done"));
				setIncomplete(json.filter((task) => task.completed == "to do"));
				setInProgress(json.filter((task) => task.completed == "in progress"));
				setBacklog(json.filter((task) => task.completed == "backlog"));
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

	function updateRecord(id, completed = "") {
		// console.log(`http://localhost:3000/update/${id}`);
		fetch(`http://localhost:3000/update/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ completed }),
		}).catch((error) => {
			console.log(error);
		});
	}

	// update record
	function setNewState(destinationDroppableId, task) {
		let updatedTask;
		switch (destinationDroppableId) {
			case "1": // TO DO
				updatedTask = { ...task, completed: "to do" };
				setIncomplete([updatedTask, ...incomplete]);
				// console.log(task._id);
				updateRecord(task._id, "to do");
				break;
			case "2": // DONE
				updatedTask = { ...task, completed: "done" };
				setCompleted([updatedTask, ...completed]);
				updateRecord(task._id, "done");
				break;
			case "3": // IN REVIEW
				updatedTask = { ...task, completed: "in progress" };
				setInProgress([updatedTask, ...inProgress]);
				updateRecord(task._id, "in progress");
				break;
			case "4": // BACKLOG
				updatedTask = { ...task, completed: "backlog" };
				setBacklog([updatedTask, ...backlog]);
				updateRecord(task._id, "backlog");
				break;
		}
	}

	function findItemById(id, array) {
		return array.find((item) => item._id == id);
	}

	function removeItemById(id, array) {
		return array.filter((item) => item._id != id);
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
					width: "1000px",
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
