import React from "react";
import axios from "axios";

class Reader extends React.Component<{}, { message: Array<string> }> {
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = { message: [] };
  }
  handleFileUpload = (e: any) => {
    if (window.FileReader) {
      const file = e.target.files[0];
      const reader = new FileReader();
      if (file) {
        reader.onload = (e) => {
          axios
            .post("http://localhost:5000/validate-csv", {
              csvData: reader.result,
            })
            .then((response) => {
              this.setState({ message: response.data });
            })
            .catch((e) => {
             console.log(e)
            });
        };

        reader.readAsText(file);
      }
    }
  };
  render() {
    return (
      <div aria-label="csv-component">
        <input
          type="file"
          name="csv-input"
          aria-label="csv-input"
          onChange={(e) => this.handleFileUpload(e)}
          accept=".csv"
        />
      </div>
    );
  }
}

export default Reader;
