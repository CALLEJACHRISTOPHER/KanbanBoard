import React from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function DateTimePicker({ title = "" }) {
	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<DatePicker label={title} defaultValue={dayjs()} />
		</LocalizationProvider>
	);
}

export default DateTimePicker;
