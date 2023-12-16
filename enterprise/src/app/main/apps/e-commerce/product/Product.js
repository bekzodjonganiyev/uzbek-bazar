import FuseLoading from "@fuse/core/FuseLoading";
import FusePageCarded from "@fuse/core/FusePageCarded";
import { useDeepCompareEffect } from "@fuse/hooks";
import Button from "@mui/material/Button";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import withReducer from "app/store/withReducer";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import _ from "@lodash";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useThemeMediaQuery from "@fuse/hooks/useThemeMediaQuery";
import {
  getProduct,
  newProduct,
  resetProduct,
  selectProduct,
} from "../store/productSlice";
import reducer from "../store";
import ProductHeader from "./ProductHeader";
import BasicInfoTab from "./tabs/BasicInfoTab";
import InventoryTab from "./tabs/InventoryTab";
import PricingTab from "./tabs/PricingTab";
import ProductImagesTab from "./tabs/ProductImagesTab";
import ShippingTab from "./tabs/ShippingTab";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  nameUz: yup
    .string()
    .required("Maxsulotning nomini kiritish majburiy")
    .min(5, "Kamida 5ta belgidan iborat bo'lishi kerak"),
  nameRu: yup
    .string()
    .required("Maxsulotning nomini kiritish majburiy")
    .min(5, "Kamida 5ta belgidan iborat bo'lishi kerak"),
  nameEn: yup
    .string()
    .required("Maxsulotning nomini kiritish majburiy")
    .min(5, "Kamida 5ta belgidan iborat bo'lishi kerak"),
  price: yup.number().required("Maxsulotning narxi kiritish majburiy"),
  minOrderCount: yup
    .number()
    .required("Minimum buyrtma sonini kiritish majburiy"),
  description: yup
    .string()
    .required("Maxsulot haqida qisqacha malumot kiriting")
    .min(20, "Kamida 20 ta belgidan iborat malumot kiriting"),
});

function Product(props) {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const routeParams = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [noProduct, setNoProduct] = useState(false);
  const methods = useForm({
    mode: "onChange",
    defaultValues: {},
    resolver: yupResolver(schema),
  });
  const { reset, watch, control, onChange, formState, handleSubmit } = methods;
  const form = watch();

  useDeepCompareEffect(() => {
    function updateProductState() {
      const { productId } = routeParams;

      if (productId === "new") {
        /**
         * Create New Product data
         */
        dispatch(newProduct());
      } else {
        /**
         * Get Product data
         */
        dispatch(getProduct(productId)).then((action) => {
          /**
           * If the requested product is not exist show message
           */
          if (!action.payload) {
            setNoProduct(true);
          }
        });
      }
    }

    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (!product) {
      return;
    }
    /**
     * Reset the form on product state changes
     */
    reset(product);
  }, [product, reset]);

  useEffect(() => {
    return () => {
      /**
       * Reset Product on component unload
       */
      dispatch(resetProduct());
      setNoProduct(false);
    };
  }, [dispatch]);

  /**
   * Tab Change
   */
  function handleTabChange(event, value) {
    setTabValue(value);
  }

  /**
   * Show Message if the requested products is not exists
   */
  if (noProduct) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-col flex-1 items-center justify-center h-full"
      >
        <Typography color="text.secondary" variant="h5">
          There is no such product!
        </Typography>
        <Button
          className="mt-24"
          component={Link}
          variant="outlined"
          to="/apps/e-commerce/products"
          color="inherit"
        >
          Go to Products Page
        </Button>
      </motion.div>
    );
  }

  /**
   * Wait while product data is loading and form is setted
   */
  if (
    _.isEmpty(form) ||
    (product &&
      routeParams.productId !== product.id &&
      routeParams.productId !== "new")
  ) {
    return <FuseLoading />;
  }

  return (
    <FormProvider {...methods} handleSubmit={(e) => console.log(e)}>
      <FusePageCarded
        header={<ProductHeader />}
        content={
          <>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="secondary"
              variant="scrollable"
              scrollButtons="auto"
              classes={{ root: "w-full h-64 border-b-1" }}
            >
              <Tab className="h-64" label="Basic Info" />
              <Tab className="h-64" label="Product Images" />
              <Tab className="h-64" label="Pricing" />
              <Tab className="h-64" label="Inventory" />
              <Tab className="h-64" label="Shipping" />
            </Tabs>
            <div className="p-16 sm:p-24 max-w-3xl">
              <div className={tabValue !== 0 ? "hidden" : ""}>
                <BasicInfoTab />
              </div>

              <div className={tabValue !== 1 ? "hidden" : ""}>
                <ProductImagesTab />
              </div>

              <div className={tabValue !== 2 ? "hidden" : ""}>
                <PricingTab />
              </div>

              <div className={tabValue !== 3 ? "hidden" : ""}>
                <InventoryTab />
              </div>

              <div className={tabValue !== 4 ? "hidden" : ""}>
                <ShippingTab />
              </div>
            </div>
          </>
        }
        scroll={isMobile ? "normal" : "content"}
      />
    </FormProvider>
  );
}

export default withReducer("eCommerceApp", reducer)(Product);
