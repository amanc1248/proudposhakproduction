import React, { useState, useEffect } from "react";
import "../../Styles/Admin/Admin.css";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { adminProductTypeDetailsReducer } from "../../reducers/adminReducers";
import { adminGetProductTypeDetails } from "../../actions/adminActions";

function EditProductType() {
  const dispatch = useDispatch();

  // 1. for fetching admin
  const adminProductTypeDetails = useSelector(
    (state) => state.adminProductTypeDetails
  );
  const { loading, productTypeDetailsInfo } = adminProductTypeDetails;

  useEffect(() => {
    if (!productTypeDetailsInfo) {
      dispatch(adminGetProductTypeDetails());
    } else {
      setProductTypeName(productTypeDetailsInfo[0][0].name);
      setProductTypeDescription(productTypeDetailsInfo[0][0].description);
    }
  }, [dispatch, productTypeDetailsInfo]);

  // STATES FOR THE Product Type
  const [productTypeName, setProductTypeName] = useState();
  const [productTypeDescription, setProductTypeDescription] = useState();
  return (
    <div className="add__product__type">
      <div className="add__product__type__container">
        <div className="add__product__type__header">
          Edit Product Type: <span>Tharu Cultural Dhoti</span>
        </div>
        <hr />
        <div>
          <label htmlFor="" className="normal__div__1">
            Product Name
            <input
              type="text"
              className="input__box__1"
              value={productTypeName}
            ></input>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Product Description
            <div>
              <textarea
                name="Text1"
                // cols="50"
                // rows="5"
                className="new__product__inputBox"
                value={productTypeDescription}
              ></textarea>
            </div>
          </label>
        </div>
        <hr />
        {/* attribute container */}
        <ProductAttributeTableAndEdit></ProductAttributeTableAndEdit>
        <hr />
        {/* dependent attribute container */}
        <DependentAttributeTableAndEdit></DependentAttributeTableAndEdit>
        <hr />
        <div className="save__product__type__button__container">
          <button className="save__product__type__button">SAVE CHANGES</button>
        </div>
      </div>
    </div>
  );
}

//PRODUCT ATTRIBUTE TABLE AND EDIT ATTRIBUTE FUNCTION👇
function ProductAttributeTableAndEdit() {
  const dispatch = useDispatch();

  // for adding attribute
  const [showHideAddAttributeTable, setshowHideAddAttributeTable] =
    useState(false);
  const changeShowHideAddAttributeTable = () => {
    setshowHideAddAttributeTable(!showHideAddAttributeTable);
  };

  // for edidting attribute
  const [showHideEditAttributeTable, setShowHideEditAttributeTable] =
    useState(false);
  const changeShowHideEditAttributeTable = () => {
    setShowHideEditAttributeTable(!showHideEditAttributeTable);
  };

  const adminProductTypeDetails = useSelector(
    (state) => state.adminProductTypeDetails
  );
  const { loading, productTypeDetailsInfo } = adminProductTypeDetails;

  useEffect(() => {
    if (!productTypeDetailsInfo) {
      dispatch(adminGetProductTypeDetails());
    } else {
      setSizeAttributeDetails(productTypeDetailsInfo[0][1]);
    }
  }, [dispatch, productTypeDetailsInfo]);
  // SIZE ATTRIBUTES DETAILS
  const [sizeAttributeDetails, setSizeAttributeDetails] = useState();
  const attributeAddingBox = (
    <div>
      <div className="attribute__adding__box">
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Name
            <input type="text" className="input__box__1"></input>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Method
            <div>
              <select name="method" id="method">
                {" "}
                className="select__box__1"
                <option value="user input">User Input</option>
                <option value="Entering Value">Entering Value</option>
                <option value="Selecting Value">Selecting Value</option>
              </select>
            </div>
          </label>
        </div>

        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Type
            <div>
              <select name="unit" id="unit" className="select__box__1">
                <option value="double">double</option>
                <option value="color">color</option>
                <option value="color">text</option>
              </select>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Unit
            <div>
              <select
                name="unit"
                id="unit"
                className="select__box__1"
                placeholder="choose one"
              >
                <option value="inch">inch</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
              </select>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Value
            {/* when choosed entering or user input value */}
            <p></p>
            <p>
              1. When selected: user input/entering value + double OR user
              input/entering value + text
            </p>
            <input type="text" className="input__box__1"></input>
            {/* when choosed selecting value */}
            <p></p>
            <p>2. When selected: selecting value + double</p>
            <div className="choosed__selecting__value__container">
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  4.5
                </div>
                <div className="choosed__selecting__value__container__value">
                  small
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  4.5
                </div>
                <div className="choosed__selecting__value__container__value">
                  medium
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>{" "}
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  4.5
                </div>
                <div className="choosed__selecting__value__container__value">
                  large
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>
              {/* the value adding container */}
              <div className="value__adding__container">
                <input type="number" placeholder="value" />
                <input type="text" placeholder="description" />

                <button className="add__value__button">ADD VALUE</button>
              </div>
            </div>
            {/* when choosed selecting range */}
            <p></p>
            <p>
              3. When selected: selecting value + color OR selecting value +
              text
            </p>
            <div className="choosed__selecting__value__container">
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  #87a4hfe
                </div>
                <div className="choosed__selecting__value__container__value">
                  grey
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  #87a4hfe
                </div>
                <div className="choosed__selecting__value__container__value">
                  yellow
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>{" "}
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  #87a4hfe
                </div>
                <div className="choosed__selecting__value__container__value">
                  blue
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>
              {/* the value adding container */}
              <div className="value__adding__container">
                <input type="text" placeholder="text" />
                <input type="text" placeholder="description" />

                <button className="add__value__button">ADD VALUE</button>
              </div>
            </div>
          </label>
        </div>

        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Gif Url
            <input type="text" className="input__box__1"></input>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute YouTube video id
            <input type="text" className="input__box__1"></input>
          </label>
        </div>
        <div className="save__cancel__button__container">
          <div>
            <button className="cancel__button">Cancel</button>
          </div>
          <div>
            <button className="save__button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );

  // edit dependent attribtue table
  const attributeEditingBox = (
    <div>
      <div className="attribute__adding__box">
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Name
            <input type="text" className="input__box__1"></input>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Method
            <div>
              <select name="method" id="method">
                {" "}
                className="select__box__1"
                <option value="user input">User Input</option>
                <option value="Entering Value">Entering Value</option>
                <option value="Selecting Value">Selecting Value</option>
              </select>
            </div>
          </label>
        </div>

        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Type
            <div>
              <select name="unit" id="unit" className="select__box__1">
                <option value="double">double</option>
                <option value="color">color</option>
                <option value="color">text</option>
              </select>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Unit
            <div>
              <select
                name="unit"
                id="unit"
                className="select__box__1"
                placeholder="choose one"
              >
                <option value="inch">inch</option>
                <option value="cm">cm</option>
                <option value="m">m</option>
              </select>
            </div>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Value
            {/* when choosed entering or user input value */}
            <p></p>
            <p>
              1. When selected: user input/entering value + double OR user
              input/entering value + text
            </p>
            <input type="text" className="input__box__1"></input>
            {/* when choosed selecting value */}
            <p></p>
            <p>2. When selected: selecting value + double</p>
            <div className="choosed__selecting__value__container">
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  4.5
                </div>
                <div className="choosed__selecting__value__container__value">
                  small
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  4.5
                </div>
                <div className="choosed__selecting__value__container__value">
                  medium
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>{" "}
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  4.5
                </div>
                <div className="choosed__selecting__value__container__value">
                  large
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>
              {/* the value adding container */}
              <div className="value__adding__container">
                <input type="number" placeholder="value" />
                <input type="text" placeholder="description" />

                <button className="add__value__button">ADD VALUE</button>
              </div>
            </div>
            {/* when choosed selecting range */}
            <p></p>
            <p>
              3. When selected: selecting value + color OR selecting value +
              text
            </p>
            <div className="choosed__selecting__value__container">
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  #87a4hfe
                </div>
                <div className="choosed__selecting__value__container__value">
                  grey
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  #87a4hfe
                </div>
                <div className="choosed__selecting__value__container__value">
                  yellow
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>{" "}
              <div className="the__choosed__selected__value__box">
                <div className="choosed__selecting__value__container__value">
                  #87a4hfe
                </div>
                <div className="choosed__selecting__value__container__value">
                  blue
                </div>
                <button className="choosed__selected__value__edit__delete">
                  edit
                </button>
                <button className="choosed__selected__value__edit__delete">
                  delete
                </button>
              </div>
              {/* the value adding container */}
              <div className="value__adding__container">
                <input type="text" placeholder="text" />
                <input type="text" placeholder="description" />

                <button className="add__value__button">ADD VALUE</button>
              </div>
            </div>
          </label>
        </div>

        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute Gif Url
            <input type="text" className="input__box__1"></input>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute YouTube video id
            <input type="text" className="input__box__1"></input>
          </label>
        </div>
        <div className="save__cancel__button__container">
          <div>
            <button className="cancel__button">Cancel</button>
          </div>
          <div>
            <button className="save__button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );

  return loading ? (
    <div>Loader</div>
  ) : (
    <div>
      <div className="attribute__table">
        this is
        {/* {sizeAttributeDetails.length} */}
        <div className="">
          PRODUCT ATTRIBUTE TABLE: <span>No attribute added</span>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th scope="col">Size Attribute Id</th>
              <th scope="col">Attribute Name</th>
              <th scope="col">Attribute Method</th>
              <th scope="col">Attribute Type</th>
              <th scope="col">Attribute Unit</th>
              <th scope="col">Attribute Value</th>
              <th scope="col">Attribute description</th>
              <th scope="col">gif url</th>
              <th scope="col">video id</th>
              <th scope="col">Buttons</th>
            </tr>
          </thead>
          <tbody>
            {sizeAttributeDetails &&
              sizeAttributeDetails.map((sizeAttribute) => (
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td>@mdo</td>
                  <td className="edit__delete__button">
                    <div className="edit__delete__button__container">
                      <button className="edit__delete__button">edit</button>
                      <button className="edit__delete__button">delete</button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      {/* add attribute container */}
      <div className="align__button__container">
        <div>
          <button
            className="align__button"
            onClick={changeShowHideAddAttributeTable}
          >
            {showHideAddAttributeTable === false
              ? "Add Attribute"
              : "Cancel Adding Attribute"}
          </button>
        </div>
      </div>
      {showHideAddAttributeTable === true ? attributeAddingBox : null}

      {/* edit attribute container */}
      <div className="align__button__container">
        <div>
          <button
            className="align__button"
            onClick={changeShowHideEditAttributeTable}
          >
            {showHideEditAttributeTable === false
              ? "Edit Attribute"
              : "Cancel Edit Attribute"}
          </button>
        </div>
      </div>
      {showHideEditAttributeTable === true ? attributeEditingBox : null}
    </div>
  );
}

// DEPENDENT ATTRIBUTE TABLE👇
function DependentAttributeTableAndEdit() {
  const [showHideDependentAttributeBox, setShowHideDependentAttributeBox] =
    useState(false);
  const changeShowHideDependentAddAttributeBox = () => {
    setShowHideDependentAttributeBox(!showHideDependentAttributeBox);
  };

  // state for editing dependent attribute table
  const [
    showHideEditDependentAttributeBox,
    setShowHideEditDependentAttributeBox,
  ] = useState(false);
  const changeShowHideEditDependentAddAttributeBox = () => {
    setShowHideEditDependentAttributeBox(!showHideEditDependentAttributeBox);
  };
  const addDependentAttributeBox = (
    <div>
      <div className="attribute__adding__box">
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute From
            <select
              name="AttributeFrom"
              id="AttributeFrom"
              className="select__box__1"
            >
              <option value="height">height</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute With
            <select
              name="AttributeWith"
              id="AttributeWith"
              className="select__box__1"
            >
              <option value="length">length</option>
              <option value="width">width</option>
            </select>
          </label>
          <div>
            <label htmlFor="" className="normal__div__1">
              Relatoin Formula
              <input type="text" className="input__box__1"></input>
            </label>
          </div>
          <div>
            <label htmlFor="" className="normal__div__1">
              Attribute Description
              <input type="text" className="input__box__1"></input>
            </label>
          </div>
        </div>
        <div className="save__cancel__button__container">
          <div>
            <button className="cancel__button">Cancel</button>
          </div>
          <div>
            <button className="save__button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
  const editDependentAttributeBox = (
    <div>
      <div className="attribute__adding__box">
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute From
            <select
              name="AttributeFrom"
              id="AttributeFrom"
              className="select__box__1"
            >
              <option value="height">height</option>
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="" className="normal__div__1">
            Attribute With
            <select
              name="AttributeWith"
              id="AttributeWith"
              className="select__box__1"
            >
              <option value="length">length</option>
              <option value="width">width</option>
            </select>
          </label>
          <div>
            <label htmlFor="" className="normal__div__1">
              Relatoin Formula
              <input type="text" className="input__box__1"></input>
            </label>
          </div>
          <div>
            <label htmlFor="" className="normal__div__1">
              Attribute Description
              <input type="text" className="input__box__1"></input>
            </label>
          </div>
        </div>
        <div className="save__cancel__button__container">
          <div>
            <button className="cancel__button">Cancel</button>
          </div>
          <div>
            <button className="save__button">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <div>
      <div className="dependent__attribute__table__container">
        <div className="">
          DEPENDENT ATTRIBUTE TABLE: <span>required</span>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Attribute From</th>
              <th scope="col">Attribute With</th>
              <th scope="col">Relation Formula</th>
              <th scope="col">Attribute Description</th>
              <th scope="col">Buttons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td className="edit__delete__button">
                <div className="edit__delete__button__container">
                  <button className="edit__delete__button">edit</button>
                  <button className="edit__delete__button">delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td className="edit__delete__button">
                <div className="edit__delete__button__container">
                  <button className="edit__delete__button">edit</button>
                  <button className="edit__delete__button">delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td className="edit__delete__button">
                <div className="edit__delete__button__container">
                  <button className="edit__delete__button">edit</button>
                  <button className="edit__delete__button">delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td className="edit__delete__button">
                <div className="edit__delete__button__container">
                  <button className="edit__delete__button">edit</button>
                  <button className="edit__delete__button">delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>

      {/* add attribute container */}
      <div className="align__button__container">
        <div>
          <button
            className="align__button"
            onClick={changeShowHideDependentAddAttributeBox}
          >
            {showHideDependentAttributeBox === false
              ? "Add Dependent Attribute"
              : "Cancel Adding"}
          </button>
        </div>
      </div>
      {showHideDependentAttributeBox === true ? addDependentAttributeBox : null}
      {/* edit dependent attribute container */}
      <div className="align__button__container">
        <div>
          <button
            className="align__button"
            onClick={changeShowHideEditDependentAddAttributeBox}
          >
            {showHideEditDependentAttributeBox === false
              ? "Edit Dependent Attribute"
              : "Cancel Adding"}
          </button>
        </div>
      </div>
      {showHideEditDependentAttributeBox === true
        ? editDependentAttributeBox
        : null}
    </div>
  );
}

export default EditProductType;
