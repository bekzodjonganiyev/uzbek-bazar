import { useEffect, useState } from "react";
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
import { getter } from "./ProductVariablesForm";
import { matchRoutes } from "react-router-dom";

function BasicInfoTab(props) {
  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  const [tabValue, setTabValue] = useState(0);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [materials, setMaterials] = useState([]);
  const gender = [
    { value: "female", label: "Ayol" },
    { value: "male", label: "Erkak" },
  ];
  const type = [
    { value: "uniform", label: "Uniform" },
    { value: "wedding", label: "Wedding" },
  ];
  const season = [
    { value: "spring_summer", label: "Spring-Summer" },
    { value: "winter_autumn", label: "Winter-Autumn" },
  ];

  useEffect(() => {
    getter("brands/", setBrands, false);
    getter("categories/", setCategories, false);
    getter("sizes/", setSizes, false);
    getter("materials/", setMaterials, false);
  }, []);

  console.log(materials)

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
              {!categories?.loading &&
                categories?.data?.results.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
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
              {gender.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
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
              {!brands?.loading &&
                brands?.data?.results.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
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
          render={({ field }) => (
            <TextField
              className="w-1/3"
              select
              fullWidth
              defaultValue=""
              label="Turkumni tanlang"
              {...field}
            >
              {type.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="size"
          control={control}
          render={({ field: { ref, onChange, value } }) => {
            return (
              <Autocomplete
                className="mt-8 mb-16"
                multiple
                /**
                 * Autocomplete da multiselect funksiyasini tog'ri ishlashi uchun
                 * value propsga qiymat berilishi shart ekan
                 */
                value={value}
                options={sizes?.data?.results ?? []}
                getOptionLabel={(option) => option.name}
                onChange={(_, newValue) => {
                  /**
                   * Tanlanayotgan itemlar object(referance value) bo'lgani
                   * uchun alohida uniqueValues yasaldi. Sababi AutoComplate ni o'zi
                   * valueni set qilganda set qilinmagan value bilan set qilinmaganini tekshirishda
                   * referance tipdagi malumumotlar doim false qaytaradi. Ya'ni set qilingan qiymat
                   * yana set bo'lib qoladi
                   */
                  const uniqueValues = newValue.filter(
                    (v, index, self) =>
                      self.findIndex((s) => s.id === v.id) === index
                  );
                  onChange(uniqueValues);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Bir nechta o'lcham tanlang"
                    label="O'lcham"
                    variant="outlined"
                    inputRef={ref}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                )}
              />
            );
          }}
        />

        <Controller
          name="season"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              placeholder="Mavsumni tanlang"
              label="Mavsum"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {season.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Controller
          name="material"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              select
              placeholder="Bir nechta material tanglang"
              label="Material"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
            >
              {!materials?.loading &&
                materials?.data?.results.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                ))}
            </TextField>
          )}
        />
      </div>
    </div>
  );
}

export default BasicInfoTab;
