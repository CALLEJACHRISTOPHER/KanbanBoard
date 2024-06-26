import React from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";

const urgency = [
	{
		label: "High",
		urgency: 3,
	},
	{
		label: "Medium",
		urgency: 2,
	},
	{
		label: "Low",
		urgency: 1,
	},
];

function ComboBox() {
	return (
		<Autocomplete
			disablePortal
			id="combo-box-demo"
			options={urgency}
			sx={{ width: 300 }}
			renderInput={(params) => <TextField {...params} label="Urgency" />}
		/>
	);
}

export default ComboBox;
