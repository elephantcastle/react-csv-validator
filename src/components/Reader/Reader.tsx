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
      if (file && file.type === "application/vnd.ms-excel") {
        reader.onload = (e) => {
          axios
            .post("http://localhost:5000/validate-csv", {
              csvData: reader.result,
            })
            .then((response) => {
              this.setState({ message: response.data });
            })
            .catch((e) => {
              this.setState({ message: e.response.data });
            });
        };

        reader.onerror = (event) => {
          if (
            event &&
            event.target &&
            event.target.error &&
            event.target.error.name === "NotReadableError"
          ) {
            this.setState({ message: ["Cannot read file!\nPlease make sure the file is a valid .csv"] });
          }
        };
        reader.readAsText(file);
      } else if(file){
        this.setState({ message: ["Please make sure the file is a valid .csv"] });
      }else{
        this.setState({ message: [] });
      }
    }
  };

  render() {
    const listItems = this.state.message.map((mex: string) => <li key={mex}>{mex}</li>);
    return (
      <div aria-label="csv-component">
        <input
          type="file"
          name="csv-input"
          aria-label="csv-input"
          data-testid="csv-input"
          onChange={(e) => this.handleFileUpload(e)}
          accept=".csv"
        />
        <ul aria-label="message">
            {listItems}
        </ul>
      </div>
    );
  }
}

export default Reader;
