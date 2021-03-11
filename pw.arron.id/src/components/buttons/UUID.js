import React from "react";

export class UUIDButton extends React.Component {
  constructor(props) {
    super();
    this.onClick = props.onClick;
  }

  render() {
    return (
      <button
        className="btn"
        onClick={() => {
          this.onClick("uuid");
        }}
      >
        UUID
      </button>
    );
  }
}
