import TextField from "@mui/material/TextField";
import { Controller, useFormContext } from "react-hook-form";

function UzTab(props) {
  const methods = useFormContext();
  const { control, getValues } = methods;

  const {translations} = getValues()

  return (
    <div>
      <Controller
        name="nameUz"
        control={control}
        defaultValue={translations?.uz?.name}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Maxsulto nomi o'zbekcha"
            id="nameUz"
            type="text"
            variant="outlined"
            autoFocus
            fullWidth
          />
        )}
      />

      <Controller
        name="descUz"
        control={control}
        defaultValue={translations?.uz?.desc}
        render={({ field }) => (
          <TextField
            {...field}
            className="mt-8 mb-16"
            label="Maxsulto haqida o'zbekcha"
            id="descUz"
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

export default UzTab;
