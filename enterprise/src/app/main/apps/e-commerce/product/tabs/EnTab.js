import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

function EnTab(props) {
  const methods = useFormContext();
  const { control, getValues } = methods;

  const {translations} = getValues()

  return (
    <div>
      <Controller
        name="nameEn"
        control={control}
        defaultValue={translations?.en?.name}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Maxsulto nomi inglizcha"
            id="nameEn"
            type="text"
            variant="outlined"
            autoFocus
            fullWidth
          />
        )}
      />

      <Controller
        name="descEn"
        control={control}
        defaultValue={translations?.en?.desc}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Maxsulto haqida inglizcha"
            id="descEn"
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

export default EnTab;
