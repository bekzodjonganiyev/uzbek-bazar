import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { darken } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import clsx from "clsx";
import { motion } from "framer-motion";
import SimplePricingCard from "./SimplePricingCard";
import SimplePricingFeatureItem from "./SimplePricingFeatureItem";

function SimplePricingPage() {
  const [period, setPeriod] = useState("month");

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 100 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative flex flex-col flex-auto min-w-0 overflow-hidden">
      <div className="relative pt-32 pb-48 sm:pt-80 sm:pb-96 px-24 sm:px-64 overflow-hidden">
        <svg
          className="-z-1 absolute inset-0 pointer-events-none"
          viewBox="0 0 960 540"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Box
            component="g"
            sx={{ color: "divider" }}
            className="opacity-20"
            fill="none"
            stroke="currentColor"
            strokeWidth="100"
          >
            <circle r="234" cx="196" cy="23" />
            <circle r="234" cx="790" cy="491" />
          </Box>
        </svg>
        <div className="flex flex-col items-center">
        </div>

        <div className="flex justify-center mt-40 sm:mt-80">
          <div className="w-full max-w-sm md:max-w-7xl">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 lg:gap-y-0 md:gap-x-24 lg:gap-x-0"
            >
              <motion.div variants={item}>
                <SimplePricingCard
                  className="lg:rounded-r-0"
                  period={period}
                  title="Free"
                  subtitle="2 oy davomida bepul"
                  yearlyPrice="0"
                  monthlyPrice="0"
                  buttonTitle="Ulanish"
                  details={
                    <div className="mt-32 space-y-8">
                      <Typography className="ml-2 leading-5">
                        Mahsulotlar soni <b>10</b> ta
                      </Typography>
                      <Typography className="ml-2 leading-5">
                        Mahsulotlar statistikasi
                      </Typography>
                    </div>
                  }
                />
              </motion.div>
              <motion.div
                variants={item}
                className="lg:overflow-visible lg:z-99"
              >
                <SimplePricingCard
                  className="lg:pb-112 lg:shadow-2xl"
                  period={period}
                  title="Standart"
                  subtitle=""
                  yearlyPrice="6 000 000 so‘m"
                  monthlyPrice="500 000 so‘m"
                  buttonTitle="Ulanish"
                  details={
                    <div className="mt-32 space-y-8">
                      <Typography className="ml-2 leading-5">
                        Mahsulotlar soni cheklanmagan{" "}
                      </Typography>
                      <Typography className="ml-2 leading-5">
                        Mahsulotlar statistikasi
                      </Typography>
                      <Typography className="ml-2 leading-5">
                        Asosiy sahifada reklama uchun banner soni - 1 ta
                      </Typography>
                    </div>
                  }
                  isPopular
                />
              </motion.div>
              <motion.div variants={item}>
                <SimplePricingCard
                  className="lg:rounded-l-0"
                  period={period}
                  title="Premium"
                  subtitle=""
                  yearlyPrice="12 000 000 so‘m"
                  monthlyPrice="1 000 000 so‘m"
                  buttonTitle="Ulanish"
                  details={
                    <div className="mt-32 space-y-8">
                      <Typography className="ml-2 leading-5">
                        Mahsulotlar soni cheklanmagan{" "}
                      </Typography>
                      <Typography className="ml-2 leading-5">
                        Mahsulotlar statistikasi
                      </Typography>
                      <Typography className="ml-2 leading-5">
                        Asosiy sahifada reklama uchun banner soni - 3 ta
                      </Typography>
                      <Typography className="ml-2 leading-5">
                        {" "}
                        Top mahsulotlar{" "}
                      </Typography>
                      <Typography className="ml-2 leading-5">
                        Ijtimoiy sahifalarda post{" "}
                      </Typography>
                    </div>
                  }
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimplePricingPage;
