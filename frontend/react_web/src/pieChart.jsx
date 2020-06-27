import React from "react";
import { Pie } from "react-chartjs-2";


class ChartsPage extends React.Component {
  state = {
    dataPie: {
      labels: ["Anger", "Fear", "Happy", "Sad", "Neutral"],
      datasets: [
        {
          data: [20, 20, 20, 20, 20],
          backgroundColor: [
            "#F7464A",
            "#46BFBD",
            "#FDB45C",
            "#949FB1",
            "#4D5360",
            "#AC64AD"
          ],
          hoverBackgroundColor: [
            "#FF5A5E",
            "#5AD3D1",
            "#FFC870",
            "#A8B3C5",
            "#616774",
            "#DA92DB"
          ]
        }
      ]
    }
  }

  render() {
    return (
        <div>
        <h3 className="mt-5">Pick emotion</h3>
        <Pie data={this.state.dataPie} options={{ responsive: true }} />
        </div>
    );
  }
}

export default ChartsPage;