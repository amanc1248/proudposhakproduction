// import React, { useState } from "react";
// const attributeValue = [
//   { value: "theValue 1", selected: true },
//   { value: "theValue 2", selected: true },
//   { value: "theValue 3", selected: true },
//   { value: "theValue 4", selected: true },
//   { value: "theValue 5", selected: true },
// ];
// function Testscreen() {
//   const [tabs, setTabs] = useState(attributeValue);

//   return (
//     <div>
//       {tabs.map((tab) => {
//         return <Tab key={tab.value} tab={tab} setTabs={setTabs} />;
//       })}
//     </div>
//   );
// }
// function Tab({ tab, setTabs }) {
//   return (
//     <div
//       className={`customer__account__tabs ${tab.selected && "active_btn"}`}
//       onClick={() => {
//         setTabs((prevTabs) =>
//           prevTabs.map((prevTab) =>
//             prevTab.value === tab.value
//               ? { ...prevTab, selected: true }
//               : { ...prevTab, selected: false }
//           )
//         );
//       }}
//     >
//       <div className="customer__account__tabs__title">{tab.value}</div>
//       <div>{tab.selected.toString()}</div>
//     </div>
//   );
// }
// export default Testscreen;

// // this  turned out that we are not going to use this👇👇👇
// function TestingBagCheckoutDatabaseSave() {
//   // FOR CART ARRAY
//   const bagArray = [
//     {
//       unique_product_id: "1",
//       image: "https://i.imgur.com/6CsDtqD.jpg",
//       quantity: 1,
//       price: 8000,
//       product_types: [
//         {
//           product_type_id: 1,
//           product_type_name: "Dhoti",
//           size_attributes: [
//             {
//               size_attribute_id: 1,
//               attribute_name: "length",
//               attribute_value: "4.5 m",
//             },
//             {
//               size_attribute_id: 2,
//               attribute_name: "width",
//               attribute_value: "1 m",
//             },
//           ],
//         },
//         {
//           product_type_id: 2,
//           product_type_name: "Kurta",
//           size_attributes: [
//             {
//               size_attribute_id: 3,
//               attribute_name: "length",
//               attribute_value: "4.5 m",
//             },
//             {
//               size_attribute_id: 4,
//               attribute_name: "width",
//               attribute_value: "1 m",
//             },
//           ],
//         },
//       ],
//     },
//   ];
//   return <div></div>;
// }

import React, { useState } from "react";
const productTypesSizeAttributesList = [
  [
    {
      product_type_id: "1",
      attribute_id: "1",
      attribute_name: "Achara Cloth",
      product_type_method_id: 3,
      product_type_type_id: 3,
      product_type_unit_id: 4,
      attribute_gif_url: "https://i.imgur.com/cr0LVC7.jpg",
      attribute_youtube_video: "video id1",
      attribute_value_description_id: "1,2,3,4",
      attribute_value: [
        {
          attributeValue: "Bombay Wear",
          isSelected: false,
        },
        {
          attributeValue: "Terry Cotton",
          isSelected: false,
        },
        {
          attributeValue: "Nylon",
          isSelected: false,
        },
        {
          attributeValue: "Sutti",
          isSelected: false,
        },
      ],
      attribute_description: [
        {
          attributeDescription: "Highest Quality",
        },
        {
          attributeDescription: "Average Choosed",
        },
        {
          attributeDescription: "Silky Cloth",
        },
        {
          attributeDescription: "Old Aged ",
        },
      ],
      price_per_m: null,
    },
    {
      product_type_id: "1",
      attribute_id: "2",
      attribute_name: "Achara Length",
      product_type_method_id: 3,
      product_type_type_id: 1,
      product_type_unit_id: 3,
      attribute_gif_url: "https://i.imgur.com/cr0LVC7.jpg",
      attribute_youtube_video: "video id2",
      attribute_value_description_id: "5,6,7,8,9,12,13,14",
      attribute_value: [
        {
          attributeValue: "3.5",
          isSelected: false,
        },
        {
          attributeValue: "4",
          isSelected: false,
        },
        {
          attributeValue: "4.5",
          isSelected: false,
        },
        {
          attributeValue: "5",
          isSelected: false,
        },
        {
          attributeValue: "5.5",
          isSelected: false,
        },
        {
          attributeValue: "6",
          isSelected: false,
        },
        {
          attributeValue: "6.5",
          isSelected: false,
        },
        {
          attributeValue: "7 ",
          isSelected: false,
        },
      ],
      attribute_description: [
        {
          attributeDescription: "small",
        },
        {
          attributeDescription: "medium",
        },
        {
          attributeDescription: "standard",
        },
        {
          attributeDescription: "standard",
        },
        {
          attributeDescription: "large",
        },
        {
          attributeDescription: "large",
        },
        {
          attributeDescription: "very large",
        },
        {
          attributeDescription: "very large",
        },
      ],
      price_per_m: "270",
    },
  ],
  [
    {
      product_type_id: "2",
      attribute_id: "4",
      attribute_name: "Khadki Cloth",
      product_type_method_id: 3,
      product_type_type_id: 3,
      product_type_unit_id: 3,
      attribute_gif_url: "https://i.imgur.com/cr0LVC7.jpg",
      attribute_youtube_video: "video id4",
      attribute_value_description_id: "10,11",
      attribute_value: [
        {
          attributeValue: "Hand Made",
          isSelected: false,
        },
        {
          attributeValue: "Ready Made",
          isSelected: false,
        },
      ],
      attribute_description: [
        {
          attributeDescription: "Mostly Choosed",
        },
        {
          attributeDescription: "Low Cost",
        },
      ],
      price_per_m: null,
    },
    {
      product_type_id: "2",
      attribute_id: "6",
      attribute_name: "khadki Color",
      product_type_method_id: 3,
      product_type_type_id: 3,
      product_type_unit_id: 4,
      attribute_gif_url: "https://i.imgur.com/cr0LVC7.jpg",
      attribute_youtube_video: "video id 6",
      attribute_value_description_id: "19,20",
      attribute_value: [
        {
          attributeValue: "white",
          isSelected: false,
        },
        {
          attributeValue: "mix",
          isSelected: false,
        },
      ],
      attribute_description: [
        {
          attributeDescription: "poorly choosed",
        },
        {
          attributeDescription: "highly choosed",
        },
      ],
      price_per_m: null,
    },
  ],
  [
    {
      product_type_id: "3",
      attribute_id: "5",
      attribute_name: "Blouse Size",
      product_type_method_id: 3,
      product_type_type_id: 1,
      product_type_unit_id: 3,
      attribute_gif_url: "https://i.imgur.com/cr0LVC7.jpg",
      attribute_youtube_video: "video id",
      attribute_value_description_id: "15,16,17,18",
      attribute_value: [
        {
          attributeValue: "15",
          isSelected: false,
        },
        {
          attributeValue: "20",
          isSelected: false,
        },
        {
          attributeValue: "25",
          isSelected: false,
        },
        {
          attributeValue: "30",
          isSelected: false,
        },
      ],
      attribute_description: [
        {
          attributeDescription: "small",
        },
        {
          attributeDescription: "medium",
        },
        {
          attributeDescription: "standard",
        },
        {
          attributeDescription: "large",
        },
      ],
      price_per_m: null,
    },
  ],
];

const productTypes = [
  {
    product_type_name: "Achara Cloth",
  },
  {
    product_type_name: "Khadki ",
  },
  {
    product_type_name: "Blouse",
  },
];

// product size attribute overall boxes
const ProductSizeAttribtutes = React.memo(
  ({ productTypesSizeAttributes, value, setValue }) => {
    return (
      <div>
        {productTypesSizeAttributes.map((obj) => {
          return (
            <ProductSizeAttributesSingle
              key={obj.attribute_name}
              obj={obj}
              value={value}
              setValue={setValue}
            ></ProductSizeAttributesSingle>
          );
        })}
      </div>
    );
  }
);

const ProductSizeAttributesSingle = React.memo(({ obj, value, setValue }) => {
  // const [theTabValue, setTheTabValue] = useState(0);
  // const [container, setContainer] = useState(obj);
  return (
    <div>
      <div className="select__size__attributes__container">
        <div className="select__title__image">
          <div className="attribute_name"> SELECT {obj.attribute_name}:</div>
          <div className="gif__url__video__conversion">
            <div>
              <img src={obj.attribute_gif_url} alt="gif url" height="70px" />
            </div>
          </div>
        </div>

        <IndividualSelectingAttributeContainer
          obj={obj}
          value={value}
          setValue={setValue}
          // container={container}
          // setContainer={setContainer}
        ></IndividualSelectingAttributeContainer>
      </div>

      <hr />
    </div>
  );
});

const IndividualSelectingAttributeContainer = React.memo(
  ({ obj, value, setValue }) => {
    // const [container, setContainer] = useState(obj.attribute_value);
    // const attributeDescriptionContainer = obj && obj.attribute_description;

    const onClick = (item, index, product_type_id, attribute_value) => {
      setValue({
        ...value,
        [item]: {
          index: index,
          product_type_id: product_type_id,
          attribute_value: attribute_value,
        },
      });
    };

    console.log("state", value);
    return (
      <div className="selecting_size_containers_div">
        {obj.attribute_value.map((objAv, index) => {
          return (
            <SelectingSizeAttributesContainer
              key={`${obj.attribute_name}${index}`}
              attribute_value={objAv.attributeValue}
              item={obj.attribute_name}
              selected={
                value[obj.attribute_name] &&
                index === parseInt(value[obj.attribute_name].index)
              }
              index={index}
              onClick={onClick}
              product_type_id={obj.product_type_id}
            ></SelectingSizeAttributesContainer>
          );
        })}
      </div>
    );
  }
);

// selecting size attributes container
const SelectingSizeAttributesContainer = React.memo(
  ({
    attribute_value,
    attribute_description,
    selected,
    index,
    onClick,
    item,
    product_type_id,
  }) => {
    return (
      <div
        // className={`selecting_size_containers_div_tab`}
        className={`selecting_size_containers_div_tab ${
          selected && "activated_selected_containers"
        }`}
        onClick={() => {
          onClick(item, index, product_type_id, attribute_value);
        }}
      >
        <div className="attribute_value">{attribute_value}</div>
        {/* <div className="attribute_description">{attribute_description}</div> */}
      </div>
    );
  }
);

const ProductTypesTable = React.memo(
  ({ productTypes, productTypesSizeAttributesList }) => {
    const [value, setValue] = useState(0);
    const [subValue, setSubValue] = useState({});

    // product_type_id

    return (
      <div className="size__table__product__types__attributes__container">
        <div className="size__table__product__types__container">
          {productTypes.map((obj, index) => {
            return (
              <ProductTypesTableTabs
                index={index}
                name={obj.product_type_name}
              ></ProductTypesTableTabs>
            );
          })}
        </div>
        <div className="size__table__attributes">
          {/* {ProductSizeAttribtutesDivs[value]} */}
          <ProductSizeAttribtutes
            productTypesSizeAttributes={productTypesSizeAttributesList[value]}
            value={subValue}
            setValue={setSubValue}
          ></ProductSizeAttribtutes>
        </div>
        <div className="total__price__of__size__attribute">Total Price:</div>
      </div>
    );

    function ProductTypesTableTabs({ name, index }) {
      return (
        <div
          className={`size__table__product__types inactive_btn__size__table ${
            index === value && "active_btn__size__table"
          }`}
          onClick={() => {
            setValue(index);
          }}
        >
          <div className="size__table__product__types__title">{name}</div>
        </div>
      );
    }
  }
);

function TestScreen() {
  return (
    <div className="App">
      <ProductTypesTable
        productTypes={productTypes}
        productTypesSizeAttributesList={productTypesSizeAttributesList}
      ></ProductTypesTable>
    </div>
  );
}

export default TestScreen;

// {
//   obj.product_types.map((pTypesObj) => {
//     {
//       pTypesObj.attributes.map((attObj) => {
//         orderedUniqueProductSql =
//           orderedUniqueProductSql +
//           `select @orderedProductReqCount:= count(*)+1 from order_product_requirements;select @orderedProductReqId:=concat('oPRI', @orderedProductReqCount);INSERT INTO order_product_requirements values ( @orderedProductReqId,@orderedUniqueProductId,'${attObj.attribute_name}','${attObj.attribute_value}');`;
//       });
//     }
//   });
// }
