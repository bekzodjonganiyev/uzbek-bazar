import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

function RuTab(props) {
  const methods = useFormContext();
  const { control, getValues } = methods;

  const {translations} = getValues()

  return (
    <div>
      <Controller
        name="nameRu"
        control={control}
        defaultValue={translations?.ru?.name}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Maxsulto nomi ruscha"
            id="nameRu"
            type="text"
            variant="outlined"
            autoFocus
            fullWidth
          />
        )}
      />

      <Controller
        name="descRu"
        control={control}
        defaultValue={translations?.ru?.desc}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Maxsulto haqida ruscha"
            id="descRu"
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
