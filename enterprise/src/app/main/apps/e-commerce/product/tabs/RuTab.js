import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

function RuTab(props) {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <div>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Maxsulto nomi ruscha"
            id="name"
            type="text"
            variant="outlined"
            autoFocus
            fullWidth
          />
        )}
      />

      <Controller
        name="desc"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Maxsulto haqida ruscha"
            id="desc"
            type="text"
            variant="outlined"
            multiline
            rows={10}
            autoFocus
            fullWidth
          />
        )}
      />
    </div>
  );
}

export default RuTab;
