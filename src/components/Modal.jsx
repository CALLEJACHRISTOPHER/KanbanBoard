import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ComboBox from "./ComboBox"; // Assuming ComboBox is another component you have
import DateTimePicker from "./DateTimePicker"; // Assuming DateTimePicker is your date picker component

export default function FormDialog() {
	const [open, setOpen] = React.useState(false);
	const elementStyle = { marginTop: "16px" };

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries(formData.entries());
		console.log(formJson); // Process the form data as needed
		handleClose();
	};

	return (
		<React.Fragment>
			<Button variant="outlined" onClick={handleClickOpen}>
				Open form dialog
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: "form",
					onSubmit: handleSubmit,
				}}
			>
				<DialogTitle>Add Task</DialogTitle>
				<DialogContent>
					<DialogContentText>Add Tags For your Tasks</DialogContentText>
					<TextField
						autoFocus
						required
						margin="dense"
						id="task"
						name="task"
						label="Task Name"
						fullWidth
						variant="standard"
						style={elementStyle}
					/>
					<ComboBox style={elementStyle} name="tags" />
					<DateTimePicker
						title="Date Assigned"
						style={elementStyle}
						name="dateAssigned"
					/>
					<DateTimePicker
						title="Due Date"
						style={elementStyle}
						name="dueDate"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">SUBMIT</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
