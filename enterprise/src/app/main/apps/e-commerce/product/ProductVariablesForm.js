import React, { useState } from "react";
import { http } from "src/app/api/http";

export async function poster(url, data, onSuccess, onError) {
  try {
    const res = await http(true).post(url, data);

    if (!res.data) {
      onError();
      return;
    }

    onSuccess(res);
  } catch (error) {
    onError();
    throw new Error("Server bilan aloqa uzildi");
  }
}

export async function getter(url, setState, isRquireAuth) {
  try {
    const res = await http(isRquireAuth).get(url);

    if (!res.data) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Malumotlarni olishda xatolik sodir bo'ldi",
      }));
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: false,
      error: "",
      data: res.data,
    }));
  } catch (error) {
    setState((prev) => ({
      ...prev,
      loading: false,
      error: "Server xatoligi sodir bo'ldi",
    }));

    throw new Error("Server xatoligi sodir bo'ldi")
  }
}

const ProductVariablesForm = () => {
  const [color, setColor] = useState({ name: "qora", value: "#000" });
  const [size, setSize] = useState();

  const onSuccess = () => {
    alert("Muvaffaqiyatli yuklandi");
  };
  const onError = () => {
    alert("Xatolik yuz berqi qaytadan urinib ko'ring");
  };

  const submitColor = (e) => {
    e.preventDefault();

    const reqBody = {
      code: color.value,
      name: color.name,
    };

    poster("colors/", reqBody, onSuccess, onError);
  };

  const submitSize = (e) => {
    e.preventDefault();

    const sizeObj = {
      name: size,
    };

    poster("sizes/", sizeObj, onSuccess, onError);
  };

  const submitBrands = (e) => {
    e.preventDefault();

    const fm = new FormData();
    
    const tranlations = {
      uz: {name: e.target.nameUz.value},
      ru: {name: e.target.nameRu.value},
      en: {name: e.target.nameEn.value}
    }

    fm.append("icon", e.target.icon?.files[0])
    fm.append("translations", JSON.stringify(tranlations));

    poster("brands/", fm, onSuccess, onError);
  };

  return (
    <div className="px-40 border border-red-400 py-32">
      {/* COLORS  */}
      <div className="flex justify-between">
        <form className="w-1/2" onSubmit={submitColor}>
          <div className="flex gap-10 items-center">
            <label htmlFor="product-color" className="text-lg font-medium">
              Rang kiriting
              <br />
              <input
                id="product-color"
                type="color"
                className="w-56 h-56 rounded-full"
                required
                value={color.value}
                onChange={(e) =>
                  setColor((prev) => ({ ...prev, value: e.target.value }))
                }
              />
            </label>
            <div className="-mb-20">
              <p>rang kodi: {color.value}</p>
              <span>rang nomi: </span>
              <input
                className="bg-transparent border-b-2 w-fit"
                type="text"
                value={color.name}
                required
                onChange={(e) =>
                  setColor((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="float-right mt-10 px-10 py-8 bg-red-400 text-white rounded-md"
          >
            Yuborish
          </button>
        </form>

        <table></table>
      </div>

      <hr className="border-2 my-32" />

      {/* SIZES */}
      <div className="flex justify-between">
        <form className="w-1/2" onSubmit={submitSize}>
          <label htmlFor="product-size" className="text-lg font-medium">
            O'lcham kiriting
            <br />
            <input
              id="product-size"
              type="text"
              className="p-8 border border-grey-400 rounded-sm"
              required
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </label>
          <br />
          <button
            type="submit"
            className="float-right mt-10 px-10 py-8 bg-red-400 text-white rounded-md"
          >
            Yuborish
          </button>
        </form>

        <table></table>
      </div>

      <hr className="border-2 my-32" />

      {/* BRANDS */}
      <div className="flex justify-between">
        <form className="w-1/2" onSubmit={submitBrands}>
          <div className="flex flex-col gap-10">
            <label htmlFor="brand-img" className="text-lg font-medium">
              Brand logosini kiriting
              <br />
              <input
                id="brand-img"
                type="file"
                name="icon"
                className="p-8 border border-grey-400 rounded-sm"
                required
              />
            </label>

            <label htmlFor="brand-name-uz" className="text-lg font-medium">
              Brand nomini kiriting(uz)
              <br />
              <input
                id="brand-name"
                type="name"
                name="nameUz"
                className="p-8 border border-grey-400 rounded-sm"
                required
              />
            </label>

            <label htmlFor="brand-name-ru" className="text-lg font-medium">
              Brand nomini kiriting(ru)
              <br />
              <input
                id="brand-name"
                type="name"
                name="nameRu"
                className="p-8 border border-grey-400 rounded-sm"
                required
              />
            </label>

            <label htmlFor="brand-name-en" className="text-lg font-medium">
              Brand nomini kiriting(en)
              <br />
              <input
                id="brand-name"
                type="name"
                name="nameEn"
                className="p-8 border border-grey-400 rounded-sm"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="float-right mt-10 px-10 py-8 bg-red-400 text-white rounded-md"
          >
            Yuborish
          </button>
        </form>

        <table></table>
      </div>
    </div>
  );
};

export default ProductVariablesForm;
