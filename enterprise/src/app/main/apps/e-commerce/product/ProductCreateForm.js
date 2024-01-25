import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import WYSIWYGEditor from "app/shared-components/WYSIWYGEditor";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div className="p-32">
      {/* Maxsulot nomi 3 ta tilda */}
      <div className="flex gap-4">
        <Controller
          name="nameUz"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.nameUz}
                required
                helperText={errors?.nameUz?.message}
                label="Name Uz"
                autoFocus
                id="nameUz"
                variant="outlined"
                fullWidth
              />
            );
          }}
        />
        <Controller
          name="nameRu"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.nameRu}
                required
                helperText={errors?.nameRu?.message}
                label="Name Ru"
                autoFocus
                id="nameRu"
                variant="outlined"
                fullWidth
              />
            );
          }}
        />
        <Controller
          name="nameEn"
          control={control}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                className="mt-8 mb-16"
                error={!!errors.nameEn}
                required
                helperText={errors?.nameEn?.message}
                label="Name En"
                autoFocus
                id="nameEn"
                variant="outlined"
                fullWidth
              />
            );
          }}
        />
      </div>
      {/* Maxsulot nomi 3 ta tilda */}

      <div className="flex gap-4">
        {/* Product price */}
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.price}
              required
              helperText={errors?.price?.message}
              id="price"
              label="Narxi"
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {/* Product price */}

        {/* Discount value */}
        <Controller
          name="discount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.discount}
              required
              helperText={errors?.discount?.message}
              id="discount"
              label="Chegirma"
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {/* Discount value */}

        {/* Minimum orders count */}
        <Controller
          name="minOrderCount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mt-8 mb-16"
              error={!!errors.minOrderCount}
              required
              helperText={errors?.minOrderCount?.message}
              id="minOrderCount"
              label="Minimum buyrtma"
              type="number"
              variant="outlined"
              fullWidth
            />
          )}
        />
        {/* Minimum orders count */}
      </div>

      {/* <Controller
        className="mt-8 mb-16"
        render={({ field }) => <WYSIWYGEditor {...field} />}
        name="description"
        control={control}
      /> */}

      <Controller
        name="categories"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple categories"
                label="Categories"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />

      <Controller
        name="tags"
        control={control}
        defaultValue={[]}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            className="mt-8 mb-16"
            multiple
            freeSolo
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              onChange(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Select multiple tags"
                label="Tags"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        )}
      />
    </div>
  );
}

export default BasicInfoTab;
