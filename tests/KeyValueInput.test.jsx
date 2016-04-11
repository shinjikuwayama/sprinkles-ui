// don"t mock our CUT or components it depends on
jest.dontMock("../src/components/KeyValueInput");
jest.dontMock("../src/components/TextInput");
jest.dontMock("../src/components/Text");
jest.dontMock("../src/components/Button");

import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-addons-test-utils";
import Color from "color";
import { TextColors } from "../src/shared/colors";


// TODO: move this to es6 style import when its implemented in jest
const KeyValueInput = require("../src/components/KeyValueInput").default;


describe("KeyValueInput", () => {
  it("Does render a KeyValueInput", () => {
    // Render a KeyValueInput with no style
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    expect(keyValueInputComponent).toBeDefined();
  });

  it("Does render an empty KeyValueInput", () => {
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    expect(keyValueInputComponent.state.value.toJS()).toEqual([{
      key: "",
      value: ""
    }]);
    const keyLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.keyLabelRef);
    expect(keyLabelNode.textContent).toBe("Key");
    const valueLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.valueLabelRef);
    expect(valueLabelNode.textContent).toBe("Value");
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    expect(addButtonNode.textContent).toBe("Add");
  });

  it("Does update key when key input changes", () => {
    const newKey = "new key";
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    TestUtils.Simulate.change(keyInputNode, {target:{value: newKey}});
    expect(keyValueInputComponent.state.value.toJS()).toEqual([{
      key: newKey,
      value: ""
    }]);
  });

  it("Does update value when value input changes", () => {
    const newValue = "new value";
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    const valueInputNode = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef0);
    TestUtils.Simulate.change(valueInputNode, {target:{value: newValue}});
    expect(keyValueInputComponent.state.value.toJS()).toEqual([{
      key: "",
      value: newValue
    }]);
  });

  it("Does add new key value pair when add button is clicked", () => {
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    TestUtils.Simulate.click(addButtonNode);
    expect(keyValueInputComponent.state.value.toJS()).toEqual([
      {
        key: "",
        value: ""
      },{
        key: "",
        value: ""
      }
    ]);
  });

  it("Does set initialValue of key value pairs", () => {
    const initialValue = [{
      key: "key 1",
      value: "value 1"
    },{
      key: "key 2",
      value: "value 2"
    }];
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput initialValue={initialValue}/>
    );
    expect(keyValueInputComponent.state.value.toJS()).toEqual(initialValue);
  });

  it("Does delete a key value pair when delete button is clicked", () => {
    const initialValue = [{
      key: "key 1",
      value: "value 1"
    },{
      key: "key 2",
      value: "value 2"
    },{
      key: "key 3",
      value: "value 3"
    }];
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput initialValue={initialValue}/>
    );
    const deleteButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.deleteButtonRef1);
    TestUtils.Simulate.click(deleteButtonNode);
    expect(keyValueInputComponent.state.value.toJS()).toEqual([
      {
        key: "key 1",
        value: "value 1"
      },
      {
        key: "key 3",
        value: "value 3"
      }
    ]);
  });

  it("Does allow key label customization", () => {
    const myKeyLabel = "My Key Label";
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput keyLabel={myKeyLabel}/>
    );
    const keyLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.keyLabelRef);
    expect(keyLabelNode.textContent).toBe(myKeyLabel);
  });

  it("Does allow value label customization", () => {
    const myValueLabel = "My Value Label";
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput valueLabel={myValueLabel}/>
    );
    const valueLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.valueLabelRef);
    expect(valueLabelNode.textContent).toBe(myValueLabel);
  });

  it("Does allow add button text customization", () => {
    const myAddButtonText = "A Really Cool Button";
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput addButtonText={myAddButtonText}/>
    );
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    expect(addButtonNode.textContent).toBe(myAddButtonText);
  });

  it("Does render a disabled KeyValueInput", () => {
    const initialValue = [{
      key: "key 1",
      value: "value 1"
    },{
      key: "key 2",
      value: "value 2"
    }];
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput
            enabled={false}
            initialValue={initialValue}
        />
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    expect(keyInputNode.disabled).toBe(true);
    const valueInputNode = ReactDOM.findDOMNode(keyValueInputComponent.valueInputRef0);
    expect(valueInputNode.disabled).toBe(true);
    const deleteButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.deleteButtonRef1);
    expect(deleteButtonNode.disabled).toBe(true);
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    expect(addButtonNode.disabled).toBe(true);
    const keyLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.keyLabelRef);
    expect(Color(keyLabelNode.style.color).hexString()).toBe(Color(TextColors.dark).lighten(0.9).hexString());
    const valueLabelNode = ReactDOM.findDOMNode(keyValueInputComponent.valueLabelRef);
    expect(Color(valueLabelNode.style.color).hexString()).toBe(Color(TextColors.dark).lighten(0.9).hexString());
  });

  it("Does trigger an onChange event when a text input changes", () => {
    const newKey = "new key";
    const mockHandleChange = jest.genMockFunction();
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput onChange={mockHandleChange}/>
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    TestUtils.Simulate.change(keyInputNode, {target:{value: newKey}});
    expect(mockHandleChange).toBeCalledWith([
      {
        key: newKey,
        value: ""
      }
    ]);
  });

  it("Does trigger an onChange event when a delete button is clicked", () => {
    const mockHandleChange = jest.genMockFunction();
    const initialValue = [{
      key: "key 1",
      value: "value 1"
    },{
      key: "key 2",
      value: "value 2"
    },{
      key: "key 3",
      value: "value 3"
    }];
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput
            initialValue={initialValue}
            onChange={mockHandleChange}
        />
    );
    const deleteButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.deleteButtonRef1);
    TestUtils.Simulate.click(deleteButtonNode);
    expect(mockHandleChange).toBeCalledWith([
      {
        key: "key 1",
        value: "value 1"
      },
      {
        key: "key 3",
        value: "value 3"
      }
    ]);
  });

  it("Does trigger an onChange event when the add button is clicked", () => {
    const mockHandleChange = jest.genMockFunction();
    const initialValue = [{
      key: "key 1",
      value: "value 1"
    }];
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput
            initialValue={initialValue}
            onChange={mockHandleChange}
        />
    );
    const addButtonNode = ReactDOM.findDOMNode(keyValueInputComponent.addButtonRef);
    TestUtils.Simulate.click(addButtonNode);
    expect(mockHandleChange).toBeCalledWith([
      {
        key: "key 1",
        value: "value 1"
      },
      {
        key: "",
        value: ""
      }
    ]);
  });

  it("Does validate as valid when all text boxes have content", () => {
    const initialValue = [{
      key: "key 1",
      value: "value 1"
    }];
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput initialValue={initialValue}/>
    );
    expect(keyValueInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: true,
      validationError: ""
    });
  });

  it("Does validate and detect isInitialValue change", () => {
    const initialValue = [{
      key: "key 1",
      value: "value 1"
    }];
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput initialValue={initialValue}/>
    );
    const keyInputNode = ReactDOM.findDOMNode(keyValueInputComponent.keyInputRef0);
    TestUtils.Simulate.change(keyInputNode, {target:{value: "another key"}});
    expect(keyValueInputComponent.validate()).toEqual({
      valid: true,
      isInitialValue: false,
      validationError: ""
    });
  });

  it("Does validate as invalid if a value is empty", () => {
    const keyValueInputComponent = TestUtils.renderIntoDocument(
        <KeyValueInput/>
    );
    expect(keyValueInputComponent.validate()).toEqual({
      valid: false,
      isInitialValue: true,
      validationError: "All Fields Must Not Be Empty"
    });
  });
});