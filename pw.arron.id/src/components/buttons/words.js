import React from "react";

export class WordsButton extends React.Component {
  constructor(props) {
    super();
    this.onClick = props.onClick;
  }

  render() {
    return (
      <button
        className="btn"
        onClick={() => {
          this.onClick("words");
        }}
      >
        Words
      </button>
    );
  }
}
