// import { orange } from '@mui/material/colors';
// import { lighten, styled } from '@mui/material/styles';
// import clsx from 'clsx';
// import FuseUtils from '@fuse/utils';
// import { Controller, useFormContext } from 'react-hook-form';
// import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
// import Box from '@mui/material/Box';

// const Root = styled('div')(({ theme }) => ({
//   '& .productImageFeaturedStar': {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     color: orange[400],
//     opacity: 0,
//   },

//   '& .productImageUpload': {
//     transitionProperty: 'box-shadow',
//     transitionDuration: theme.transitions.duration.short,
//     transitionTimingFunction: theme.transitions.easing.easeInOut,
//   },

//   '& .productImageItem': {
//     transitionProperty: 'box-shadow',
//     transitionDuration: theme.transitions.duration.short,
//     transitionTimingFunction: theme.transitions.easing.easeInOut,
//     '&:hover': {
//       '& .productImageFeaturedStar': {
//         opacity: 0.8,
//       },
//     },
//     '&.featured': {
//       pointerEvents: 'none',
//       boxShadow: theme.shadows[3],
//       '& .productImageFeaturedStar': {
//         opacity: 1,
//       },
//       '&:hover .productImageFeaturedStar': {
//         opacity: 1,
//       },
//     },
//   },
// }));

// function ProductVariablesTab(props) {
//   const methods = useFormContext();
//   const { control, watch } = methods;

//   const images = watch('images');

//   return (
//     <Root>
//       <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
//         <Controller
//           name="images"
//           control={control}
//           render={({ field: { onChange, value } }) => (
//             <Box
//               sx={{
//                 backgroundColor: (theme) =>
//                   theme.palette.mode === 'light'
//                     ? lighten(theme.palette.background.default, 0.4)
//                     : lighten(theme.palette.background.default, 0.02),
//               }}
//               component="label"
//               htmlFor="button-file"
//               className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
//             >
//               <input
//                 accept="image/*"
//                 className="hidden"
//                 id="button-file"
//                 type="file"
//                 onChange={async (e) => {
//                   function readFileAsync() {
//                     return new Promise((resolve, reject) => {
//                       const file = e.target.files[0];
//                       if (!file) {
//                         return;
//                       }
//                       const reader = new FileReader();

//                       reader.onload = () => {
//                         resolve({
//                           id: FuseUtils.generateGUID(),
//                           url: `data:${file.type};base64,${btoa(reader.result)}`,
//                           type: 'image',
//                         });
//                       };

//                       reader.onerror = reject;

//                       reader.readAsBinaryString(file);
//                     });
//                   }

//                   const newImage = await readFileAsync();

//                   onChange([newImage, ...value]);
//                 }}
//               />
//               <FuseSvgIcon size={32} color="action">
//                 heroicons-outline:upload
//               </FuseSvgIcon>
//             </Box>
//           )}
//         />
//         <Controller
//           name="featuredImageId"
//           control={control}
//           defaultValue=""
//           render={({ field: { onChange, value } }) =>
//             images.map((media) => (
//               <div
//                 onClick={() => onChange(media.id)}
//                 onKeyDown={() => onChange(media.id)}
//                 role="button"
//                 tabIndex={0}
//                 className={clsx(
//                   'productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer outline-none shadow hover:shadow-lg',
//                   media.id === value && 'featured'
//                 )}
//                 key={media.id}
//               >
//                 <FuseSvgIcon className="productImageFeaturedStar">heroicons-solid:star</FuseSvgIcon>
//                 <img className="max-w-none w-auto h-full" src={media.url} alt="product" />
//               </div>
//             ))
//           }
//         />
//       </div>
//     </Root>
//   );
// }

// export default ProductVariablesTab;

import React, { useEffect, useState } from "react";
import { getter, poster } from "../ProductVariablesForm";
import { http } from "src/app/api/http";

const ProductVariablesTab = () => {
  const uniqueId = Date.now();
  const [items, setItem] = useState([0]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    getter("colors/", setColors, false);
  }, []);

  console.log(colors);

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
          }}
        />
      ))}
      <button
        className="text-center bg-red-400 text-white font-medium rounded-md px-20 py-10 block mx-auto"
        onClick={() => setItem([...items, uniqueId])}
      >
        Yana qo'shish
      </button>
    </ul>
  );
};

export default ProductVariablesTab;

const VariableItem = ({ colors, deleteItem }) => {
  const [file, setFile] = useState([]);

  const handleFile = (e) => {
    const file = e.target.files[0];

    const fm = new FormData();
    fm.append("file", file);

    if (file) {
      poster("write_file/", fm, ({data}) => setFile(prev => ([...prev, data?.msg])), () => alert("Nomalum xatolik"));
    } else {
      alert("Fayl tanlang");
    }
  };

  return (
    <li className=" py-10 shadow-md rounded-md px-14 flex justify-between gap-20 mb-20">
      <select>
        <option value="" hidden>
          Rang tanlang
        </option>
        {!colors?.loading &&
          colors?.data?.results?.map((item) => <option>{item?.name}</option>)}
      </select>
      <label htmlFor="product-quantity">
        <input type="number" />
      </label>
      <label htmlFor="product-image">
        <input type="file" name="file" onChange={handleFile} />
      </label>
      <button onClick={() => deleteItem()}>X</button>
    </li>
  );
};
