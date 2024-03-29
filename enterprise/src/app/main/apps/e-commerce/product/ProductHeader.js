import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import {
  removeProduct,
  saveProduct,
  updateProduct,
} from "../store/productSlice";
import { selectUser } from "app/store/userSlice";

function ProductHeader(props) {
  const pk = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const methods = useFormContext();
  const { formState, watch, getValues, setValue } = methods;
  const { isValid, dirtyFields } = formState;
  const { uz } = watch("translations");
  const theme = useTheme();
  const navigate = useNavigate();

  function handleSaveProduct() {
    const { nameUz, nameRu, nameEn, descUz, descRu, descEn } = watch();
    const prevProduct = getValues();

    const translations = {
      uz: { name: nameUz, desc: descUz },
      ru: { name: nameRu, desc: descRu },
      en: { name: nameEn, desc: descEn },
    };

    delete prevProduct.nameUz;
    delete prevProduct.nameRu;
    delete prevProduct.nameEn;
    delete prevProduct.descUz;
    delete prevProduct.descRu;
    delete prevProduct.descEn;
    prevProduct.organization = user.id

    const reCreatedSize = prevProduct.size.map((item) => item.id);
    const nextProduct = {
      ...prevProduct,
      translations: translations,
      size: reCreatedSize,
    };

    dispatch(saveProduct(nextProduct));
  }

  //update function

  function handleUpdateProduct() {
    const { nameUz, nameRu, nameEn, descUz, descRu, descEn } = watch();
    const prevProduct = getValues();

    const translations = {
      uz: { name: nameUz, desc: descUz },
      ru: { name: nameRu, desc: descRu },
      en: { name: nameEn, desc: descEn },
    };

    delete prevProduct.nameUz;
    delete prevProduct.nameRu;
    delete prevProduct.nameEn;
    delete prevProduct.descUz;
    delete prevProduct.descRu;
    delete prevProduct.descEn;
    // delete prevProduct.variables
    delete prevProduct.quantity;
    prevProduct.organization = 0

    const reCreatedSize = prevProduct.size.map((item) => item.id);
    const nextProduct = {
      ...prevProduct,
      translations: translations,
      size: reCreatedSize,
    };

    // console.log(nextProduct)

    dispatch(
      updateProduct({ productData: nextProduct, id: pk.productId })
    ).then((e) => {
      if (!e.payload) alert("Xatolik sodir bo'ldi, qaytadan urinib k'ring");
      else {
        alert("Muvaffaqiyatli tahrirlandi")
        setTimeout(() => navigate("/apps/e-commerce/products"), 200)
      }
    });
  }

  function handleRemoveProduct() {
    dispatch(removeProduct()).then(() => {
      navigate("/apps/e-commerce/products");
    });
  }

  return (
    <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between space-y-8 sm:space-y-0 py-32 px-24 md:px-32">
      <div className="flex flex-col items-center sm:items-start space-y-8 sm:space-y-0 w-full sm:max-w-full min-w-0">
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            className="flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/e-commerce/products"
            color="inherit"
          >
            <FuseSvgIcon size={20}>
              {theme.direction === "ltr"
                ? "heroicons-outline:arrow-sm-left"
                : "heroicons-outline:arrow-sm-right"}
            </FuseSvgIcon>
            <span className="flex mx-4 font-medium">Products</span>
          </Typography>
        </motion.div>

        <div className="flex items-center max-w-full">
          <motion.div
            className="hidden sm:flex"
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { delay: 0.3 } }}
          >
            <img
              className="w-32 sm:w-48 rounded"
              src="assets/images/apps/ecommerce/product-image-placeholder.png"
              alt={name}
            />
          </motion.div>
          <motion.div
            className="flex flex-col items-center sm:items-start min-w-0 mx-8 sm:mx-16"
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography className="text-16 sm:text-20 truncate font-semibold">
              {uz?.name || "New Product"}
            </Typography>
            <Typography variant="caption" className="font-medium">
              Product Detail
            </Typography>
          </motion.div>
        </div>
      </div>
      {pk.productId === "new" ? (
        <motion.div
          className="flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
        >
          {/* <Button
          className="whitespace-nowrap mx-4"
          variant="contained"
          color="secondary"
          onClick={handleRemoveProduct}
          startIcon={
            <FuseSvgIcon className="hidden sm:flex">
              heroicons-outline:trash
            </FuseSvgIcon>
          }
        >
          Remove
        </Button> */}
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleSaveProduct}
          >
            Save
          </Button>
        </motion.div>
      ) : (
        <motion.div
          className="flex"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.3 } }}
        >
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            onClick={handleRemoveProduct}
            startIcon={
              <FuseSvgIcon className="hidden sm:flex">
                heroicons-outline:trash
              </FuseSvgIcon>
            }
          >
            Remove
          </Button>
          <Button
            className="whitespace-nowrap mx-4"
            variant="contained"
            color="secondary"
            disabled={_.isEmpty(dirtyFields) || !isValid}
            onClick={handleUpdateProduct}
          >
            Update
          </Button>
        </motion.div>
      )}
    </div>
  );
}

export default ProductHeader;
