import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import UzTab from "./tabs/UzTab";
import RuTab from "./tabs/RuTab";
import EnTab from "./tabs/EnTab";
import ProductVariablesTab from "./tabs/ProductVariablesTab";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const [tabValue, setTabValue] = useState(0);

  function handleTabChange(event, value) {
    setTabValue(value);
  }

  return (
    <div className="py-32 px-40">
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        indicatorColor="secondary"
        textColor="secondary"
        variant="scrollable"
        scrollButtons="auto"
        classes={{ root: "w-full h-64 border-b-1" }}
      >
        <Tab className="h-64" label="Uzb" />
        <Tab className="h-64" label="Ru" />
        <Tab className="h-64" label="En" />
        <Tab className="h-64" label="Media" />
      </Tabs>
      <div className="my-20">
        <div className={tabValue !== 0 ? "hidden" : ""}>
          <UzTab />
        </div>

        <div className={tabValue !== 1 ? "hidden" : ""}>
          <RuTab />
        </div>

        <div className={tabValue !== 2 ? "hidden" : ""}>
          <EnTab />
        </div>

        <div className={tabValue !== 3 ? "hidden" : ""}>
          <ProductVariablesTab />
        </div>
      </div>

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
      </div>

      <div className="flex gap-10 mb-20">
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <TextField
              className="w-1/3"
              select
              fullWidth
              defaultValue=""
              label="Kategoriyani tanlang"
              // inputProps={register("category", {
              //   required: "Please enter currency",
              // })}
              // error={errors.currency}
              // helperText={errors.currency?.message}
              {...field}
            >
              {["as", "ss"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <TextField
              className="w-1/3"
              select
              fullWidth
              defaultValue=""
              label="Genderni tanlang"
              {...field}
            >
              {["as", "ss"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="brand"
          control={control}
          render={({ field }) => (
            <TextField
              className="w-1/3"
              select
              fullWidth
              defaultValue=""
              label="Brendni tanlang"
              {...field}
            >
              {["as", "ss"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </div>

      <div className="flex gap-10 mb-20">
        <Controller
          name="type"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="w-1/4"
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
                  placeholder="Bir nechta tukum tanlang"
                  label="Turi"
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
          name="size"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="w-1/4"
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
                  placeholder="Bir nechta o'lcham tanlang"
                  label="O'lcham"
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
          name="season"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="w-1/4"
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
                  placeholder="Bir nechta mavsum"
                  label="Mavsum"
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
          name="material"
          control={control}
          defaultValue={[]}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              className="w-1/4"
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
                  placeholder="Bir nechta material tanglang"
                  label="Material"
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
    </div>
  );
}

export default BasicInfoTab;
