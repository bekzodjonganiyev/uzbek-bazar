import img1 from "@/assets/images/sumka.png";
import img2 from "@/assets/images/taqinchoq.png";
import img3 from "@/assets/images/palto.png";

export const products = [
  {
    id: 1,
    img: "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247",
    price: "$300",
    oldPice: null,
    newBadge: true,
    rating: false,
    discount: null,
    productName: "Malqa Pullover Malqa Pullover Malqa Pullover Malqa Pullover",
    size: "2XL",
    color: "Red",
  },
  {
    id: 2,
    img: "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247",
    price: "$300",
    oldPice: "$330",
    newBadge: true,
    rating: false,
    discount: null,
    productName: "Malqa Pullover",
    size: "2XL",
    color: "Red",
  },
  {
    id: 3,
    img: "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247",
    price: "$300",
    oldPice: null,
    newBadge: false,
    rating: false,
    discount: "-40%",
    productName: "Malqa Pullover",
    size: "2XL",
    color: "Red",
  },
  {
    id: 4,
    img: "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247",
    price: "$300",
    oldPice: null,
    newBadge: false,
    rating: false,
    discount: "-40%",
    productName: "Malqa Pullover",
    size: "2XL",
    color: "Red",
  },
  {
    id: 5,
    img: "https://images.uzum.uz/ccojiir5a95unf11rchg/t_product_540_high.jpg#1691243110247",
    price: "$300",
    oldPice: null,
    newBadge: false,
    rating: false,
    discount: "-40%",
    productName: "Malqa Pullover",
    size: "2XL",
    color: "Red",
  },
];

export const showCase = [
<<<<<<< HEAD
  { title: "Ayollar kiyimlari", type: "coats", link: { label: "Ko'rish", href: "kun.uz" }, img: img3 },
  { title: "Sumkalar", type: "purses", link: { label: "Ko'rish", href: "kun.uz" }, img: img1 },
  { title: "Aksessuarlar", type: "accessories", link: { label: "Ko'rish", href: "kun.uz" }, img: img2 },
=======
  { title: "Palto", type: "ayollar-kiyimi", link: { label: "O'tish", href: "kun.uz" }, img: img3 },
  { title: "Portfel", type: "ayollar-kiyimi", link: { label: "O'tish", href: "kun.uz" }, img: img1 },
  { title: "Taqinchoqlar", type: "ayollar-kiyimi", link: { label: "O'tish", href: "kun.uz" }, img: img2 },
>>>>>>> 7740ae652282bf83d4876337c5d7fcc1ba702b50
];
export const categories = [
  {
    title1: "Turkumlar",
    link1: "jsjsjs",
    submenu1: true,
    items1: [
      {
        title2: "eeieidjdfjdj",
        link2: "dssddskd",
        submenu2: false,
        items2: [
          {
            title3: "dsd",
            link3: "ewew",
            submenu3: false,
          },
          {
            title3: "dsd",
            link3: "ewew",
            submenu3: false,
          },
        ],
      },
      {
        title2: "eeieidjdfjdj",
        link2: "dssddskd",
        submenu2: true,
        items2: [
          {
            title3: "dsd",
            link3: "ewew",
            submenu: false,
          },
          {
            title3: "dsd",
            link3: "ewew",
            submenu: false,
          },
        ],
      },
    ],
  },
  // {
  //   title1: "Do'konlar",
  //   link1: "jsjsjs",
  //   submenu1: true,
  //   items1: [
  //     {
  //       title2: "eeieidjdfjdj",
  //       link2: "dssddskd",
  //       submenu2: true,
  //       items2: [
  //         {
  //           title3: "dsd",
  //           link3: "ewew",
  //         },
  //         {
  //           title3: "dsd",
  //           link3: "ewew",
  //         },
  //       ],
  //     },
  //     {
  //       title2: "eeieidjdfjdj",
  //       link2: "dssddskd",
  //       submenu2: false,
  //       items2: [
  //         {
  //           title3: "dsd",
  //           link3: "ewew",
  //         },
  //         {
  //           title3: "dsd",
  //           link3: "ewew",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   title1: "jdjd",
  //   link1: "jsjsjs",
  //   submenu1: false,
  //   items1: [
  //     {
  //       title2: "eeieidjdfjdj",
  //       link2: "dssddskd",
  //       submenu2: true,
  //       items2: [
  //         {
  //           title3: "dsd",
  //           link3: "ewew",
  //         },
  //         {
  //           title3: "dsd",
  //           link3: "ewew",
  //         },
  //       ],
  //     },
  //     {
  //       title2: "eeieidjdfjdj",
  //       link2: "dssddskd",
  //       submenu2: true,
  //       items2: [
  //         {
  //           title3: "dsd",
  //           link3: "ewew",
  //         },
  //         {
  //           title3: "dsd",
  //           link3: "ewew",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const currencys = [
  { label: "UZS", value: "usz" },
  { label: "RUB", value: "rub" },
  { label: "USD", value: "usd" },
];

export const productSortItems = [
  { label: "Narx", value: "price" },
  { label: "Ommabop", value: "rating" },
];

export const languages = [
  { label: "UZB", value: "uz", icon: 10 },
  { label: "RUS", value: "ru", icon: 10 },
  { label: "ENG", value: "en", icon: 10 }
]
