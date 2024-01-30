import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { getter, poster } from "../ProductVariablesForm";

const ProductVariablesTab = () => {
  const { setValue } = useFormContext();

  const uniqueId = Date.now();
  const [items, setItem] = useState([0]);
  const [colors, setColors] = useState([]);
  const [productVariables, setProductVariables] = useState([]);
  const [test, setTest] = useState([]);

  useEffect(() => {
    getter("colors/", setColors, false);
  }, []);

  useEffect(() => {
    setValue("product_variables", test);
  }, [test]);

  return (
    <ul className="">
      <h3 className="text-xl font-medium mt-20">
        Maxsulot media malumotlarni biriktiring
      </h3>
      <p className="text-grey-400 mb-20">Rang, maxsulot soni va rasm</p>
      {items.map((media) => (
        <VariableItem
          key={media}
          colors={colors}
          deleteItem={() => {
            const filteredItem = items.filter((item) => item !== media);
            setItem(filteredItem);

            // TODO test state manipulate on delete item
          }}
          getItemValue={({ file, colorAndQuantity }) => {
            const color = colorAndQuantity?.color;
            const quantity = colorAndQuantity?.qunatity;
            const media = file;
            setProductVariables((prev) => [
              ...prev,
              {
                color: color,
                quantity: quantity,
                media: media,
                is_active: true,
              },
            ]);
          }}
        />
      ))}
      <button
        className="text-center bg-red-400 text-white font-medium rounded-md px-20 py-10 block mx-auto"
        onClick={() => {
          setItem([...items, uniqueId]);
          setTest((prev) => {
            if (prev === [] || prev.color || prev.quantity || prev.media === [])
              return;
            else return [...prev, productVariables.at(-1)];
          });
        }}
      >
        Yana qo'shish
      </button>
    </ul>
  );
};

export default ProductVariablesTab;

const VariableItem = ({ colors, deleteItem, getItemValue }) => {
  const [file, setFile] = useState([]);
  const [colorAndQuantity, setColorAndQuantity] = useState({
    color: "",
    qunatity: "",
  });

  const handleFile = (e) => {
    const file = e.target.files[0];

    const fm = new FormData();
    fm.append("file", file);

    if (file) {
      poster(
        "write_file/",
        fm,
        ({ data }) => setFile((prev) => [...prev, { is_main: false, file: data?.msg }]),
        () => alert("Nomalum xatolik")
      );
    } else {
      alert("Fayl tanlang");
    }
  };

  useEffect(() => {
    getItemValue({ file, colorAndQuantity });
  }, [file, colorAndQuantity]);

  return (
    <li className=" py-10 shadow-md rounded-md px-14 flex justify-between gap-20 mb-20">
      <select
        value={colorAndQuantity.color}
        onChange={(e) =>
          setColorAndQuantity((prev) => ({ ...prev, color: e.target.value }))
        }
      >
        <option value="" hidden>
          Rang tanlang
        </option>
        {!colors?.loading &&
          colors?.data?.results?.map((item) => (
            <option value={item.id}>{item?.name}</option>
          ))}
      </select>
      <label htmlFor="product-quantity">
        <input
          type="number"
          className="border p-5 rounded-sm"
          value={colorAndQuantity.qunatity}
          onChange={(e) =>
            setColorAndQuantity((prev) => ({
              ...prev,
              qunatity: e.target.value,
            }))
          }
        />
      </label>
      <label htmlFor="product-image">
        <input type="file" name="file" onChange={handleFile} />
      </label>
      <button onClick={() => deleteItem()}>X</button>
    </li>
  );
};
