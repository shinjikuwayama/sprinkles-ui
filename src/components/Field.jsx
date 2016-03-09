import React from "react";
import ReactCSS from "reactcss";
import TextInput from "./TextInput";
import Text from "./Text";


export default class Field extends ReactCSS.Component {
  displayName = "Field";

  static propTypes = {
    children: React.PropTypes.node,
    error: React.PropTypes.string,
    label: React.PropTypes.string,
    status: React.PropTypes.oneOf(["error", "warning", "success"])
  };

  classes () {
    return {
      "default": {
        Label: {
          margin: "10px 0"
        },
        Error: {
          margin: "10px 0"
        }
      }
    };
  }

  isValid () {
    return this.inputRef && this.inputRef.isValid ? this.inputRef.isValid() : true;
  }

  renderInput () {
    return React.Children.map(this.props.children, (child) => {
      switch (child.type) {
        case TextInput:
          return React.cloneElement(child, {
            status: this.props.status,
            ref: c => this.inputRef = c
          });
        default:
          throw new Error("Unknown Child Type")
      }
    });
  }

  renderLabel () {
    if (this.props.label) {
      let color;
      switch (this.props.status) {
        case "error":
          color = "red";
          break;
        case "warning":
          color = "orange";
          break;
        case "success":
          color = "green";
          break;
      }
      return (
          <div style={this.styles().Label}>
              <Text
                  color={color}
                  fontSize={18}
                  ref={c => this.labelRef = c}
              >
                  {this.props.label}
              </Text>
          </div>
      );
    }
  }

  renderError () {
    if (this.props.error) {
      return(
          <div style={this.styles().Error}>
              <Text
                  color={"red"}
                  fontSize={16}
                  ref={c => this.errorRef = c}
              >
                  {this.props.error}
              </Text>
          </div>
      );
    }
  }

  render () {
    return (
        <div>
            {this.renderLabel()}
            {this.renderInput()}
            {this.renderError()}
        </div>
    );
  }
};
