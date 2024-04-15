/*
    ---------------------------------------------------
    Author      : Prashant Sahu
    StudentId   : 8877584
    Date        : 7th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Row, Col } from "react-bootstrap";
import "./Chart.css";

class DashBoardChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryChartOptions: {
        chart: {
          id: "inventory-chart",
        },
        xaxis: {
          categories: ["Fruits", "Vegetables", "Grains", "Dairy", "Meat"],
        },
      },
      inventorySeries: [
        {
          name: "Inventory Items",
          data: [150, 200, 180, 120, 250],
        },
      ],
      wasteChartOptions: {
        chart: {
          id: "waste-chart",
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May"],
        },
      },
      wasteSeries: [
        {
          name: "Food Waste (kg)",
          data: [30, 40, 35, 50, 49],
        },
      ],
      donationChartOptions: {


        labels: ["Charities A", "Charities B", "Charities C", "Charities D", "Charities E"],

      },
      donationSeries:

        [3000, 2500, 4000, 3200, 2800],


      areaChartOptions: {
        chart: {
          id: "area-chart",
        }, xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May"], },
      }, areaSeries: [{ name: "Inventory Growth", data: [200, 250, 300, 320, 350], },], pieChartOptions: { chart: { id: "pie-chart", }, labels: ["Fruits", "Vegetables", "Grains", "Dairy", "Meat"], }, pieSeries: [150, 200, 180, 120, 250], radialBarChartOptions: { chart: { id: "radial-bar-chart", }, labels: ["Fruits", "Vegetables", "Grains", "Dairy", "Meat"], }, radialBarSeries: [80, 70, 60, 50, 90],
    };
  }

  render() {
    return (
      <div className="dashboard-chart bg-white rounded card">
         <Row className="m-2 p-2">
          <Col className="p-3">
            <h3>Inventory Tracking</h3>
            <Chart
              options={this.state.inventoryChartOptions}
              series={this.state.inventorySeries}
              type="bar"
              width="100%"
              height={320}
            />
          </Col>
          <Col className="p-3">
            <h3>Food Waste Monitoring</h3>
            <Chart
              options={this.state.wasteChartOptions}
              series={this.state.wasteSeries}
              type="line"
              width="100%"
              height={320}
            />
          </Col>
        </Row>

        {/* Donation Statistics and Inventory Composition */}
        <Row className="m-2 p-2">
          <Col className="p-3">
            <h3>Donation Statistics</h3>
            <Chart
              options={this.state.donationChartOptions}
              series={this.state.donationSeries}
              type="donut"
              width="100%"
              height={320}
            />
          </Col>
          <Col className="p-3">
            <h3>Inventory Composition</h3>
            <Chart
              options={this.state.radialBarChartOptions}
              series={this.state.radialBarSeries}
              type="radialBar"
              width="100%"
              height={320}
            />
          </Col>
        </Row>

        {/* Inventory Growth and Inventory Distribution */}
        <Row className="m-2 p-2">
          <Col className="p-3">
            <h3>Inventory Growth</h3>
            <Chart
              options={this.state.areaChartOptions}
              series={this.state.areaSeries}
              type="area"
              width="100%"
              height={320}
            />
          </Col>
          <Col className="p-3">
            <h3>Inventory Distribution</h3>
            <Chart
              options={this.state.pieChartOptions}
              series={this.state.pieSeries}
              type="pie"
              width="100%"
              height={320}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DashBoardChart;