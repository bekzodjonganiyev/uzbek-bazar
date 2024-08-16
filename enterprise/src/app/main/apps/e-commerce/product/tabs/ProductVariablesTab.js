import React, { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import _ from "@lodash";
import { getter, poster } from "../ProductVariablesForm";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon/FuseSvgIcon";
import { useSelector } from "react-redux";
import { selectProduct } from "../../store/productSlice";
import { useParams } from "react-router-dom";
import { baseUrl } from "src/app/api/http";

const ProductVariablesTab = () => {
  const pk = useParams()
  const { setValue } = useFormContext();
  const product = useSelector(selectProduct);
  const uniqueId = Date.now();
  const [items, setItem] = useState([]);
  const [colors, setColors] = useState([]);
  const [productVariableArray, setProductVariableArray] = useState([]);
  
  useEffect(() => {
    getter("colors/", setColors, false);

    
    if (pk.productId !== "new"){
      const variableIds = product?.variables.map(item => item.id)
      setItem(variableIds)
    }
  }, []);

  useEffect(() => {
    setValue("product_variables", productVariableArray);
  }, [productVariableArray]);


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
          deleteItem={(color) => {
            const filteredItem = productVariableArray.filter(
              (item) => item.color !== color
            );
            setProductVariableArray(filteredItem);
            const filteredItemMapper = items.filter((item) => item !== media);
            setItem(filteredItemMapper);
          }}
          saveItem={({ colorAndQuantity, file }) => {
            const color = colorAndQuantity.color;
            const quantity = colorAndQuantity.quantity;

            const findedItem = productVariableArray.find(
              (item) => item.color === color
            );

            if (!findedItem) {
              const obj = {
                id: media,
                color: color,
                quantity: quantity,
                media: file,
                is_active: true,
              }

              if (pk.productId === "new") {
                delete obj.id
              }

              setProductVariableArray((prev) => [
                ...prev,
                obj
              ]);
            } else {
              alert("BU KO'RSATGISCHLAR ALLAQACHON QOSHILGAN");
            }
          }}
        />
      ))}
      <button
        className="text-center bg-red-400 text-white font-medium rounded-md px-20 py-10 block mx-auto"
        onClick={() => {
          setItem([...items, uniqueId]);
        }}
      >
        Yana qo'shish
      </button>
    </ul>
  );
};

export default ProductVariablesTab;

const VariableItem = ({ colors, deleteItem, saveItem }) => {
  const [file, setFile] = useState([]);
  const [colorAndQuantity, setColorAndQuantity] = useState({
    color: "",
    quantity: 0,
  });
  const [isAddedItem, setIsAddedItem] = useState(false);

  const handleFile = (e) => {
    const file = e.target.files[0];

    const fm = new FormData();
    fm.append("file", file);

    if (file) {
      poster(
        "write_file/",
        fm,
        ({ data }) =>
          setFile((prev) => [...prev, { is_main: true, file: data?.msg }]),
        () => alert("Nomalum xatolik")
      );
    } else {
      alert("Fayl tanlang");
    }
  };

  return (
    <li
      className={`py-10 shadow-md rounded-md px-14 flex justify-between gap-20 mb-20 ${
        isAddedItem ? "opacity-60" : ""
      }`}
    >
      <select
        value={colorAndQuantity.color}
        onChange={(e) =>
          setColorAndQuantity((prev) => ({ ...prev, color: e.target.value }))
        }
      >
        <option value="" hidden>
          Maxsulot rangi
        </option>
        {!colors?.loading &&
          colors?.data?.results?.map((item) => (
            <option value={item.id}>{item?.name}</option>
          ))}
      </select>
      <label htmlFor="product-quantity">
        Maxsulot nechta?
        <br />
        <input
          type="number"
          className="border p-5 rounded-sm"
          value={colorAndQuantity.quantity}
          onChange={(e) =>
            setColorAndQuantity((prev) => ({
              ...prev,
              quantity: +e.target.value,
            }))
          }
        />
      </label>
      <label htmlFor="product-image">
        Maxsulot uchun rasm yuklang({file.length} ta rasm)
        <br />
        <input type="file" name="file" onChange={handleFile} />
      </label>
      <button onClick={() => deleteItem(colorAndQuantity.color)}>
        <FuseSvgIcon>heroicons-outline:trash</FuseSvgIcon>
      </button>
      <button
        disabled={isAddedItem}
        onClick={() => {
          if (file !== [] && colorAndQuantity.color) {
            setIsAddedItem(true);
            saveItem({ colorAndQuantity, file });
          } else {
            alert("BARCHA MAYDONLAR TOLDIRILISHI SHART");
          }
        }}
      >
        <FuseSvgIcon>heroicons-outline:save</FuseSvgIcon>
      </button>
    </li>
  );
};
