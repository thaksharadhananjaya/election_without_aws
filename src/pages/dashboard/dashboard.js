import React from "react";

import Button from '@mui/material/Button';
import ComboBox from 'react-responsive-combo-box'

import axios from "axios";
import 'react-responsive-combo-box/dist/index.css'
import "./dashboard.css"
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import DataTable from "../../compononts/tabele";
import Header from "../../compononts/header";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedState: null,
      selectedLGA: null,
      selectedWard: null,
      ward: [],
      lga: [],
      state: [],
      poling: null,
    };
  }
  componentDidMount() {
    this.getState();
  }


  render() {

    return (
      <div> <Header isHome={false} /><div className="dashboard">

        <this.SearchAria />
        {this.state.poling == null ? <div></div> : <div className="container-table">
          <DataTable rows={this.state.poling} />
        </div>}

      </div></div>


    );


  }
  SearchAria = () => {
    return <div className='container-dashboard-search-area'>


      <div className='combo'>
        <div className='combo-label'>
          State</div>
        <ComboBox inputClassName='combo-box' options={this.state.state} enableAutocomplete placeholder='Select State' onSelect={(option) => { this.getLGA(option) }} /></div>
      <div className='combo'><div className='combo-label'>
        LGA</div>
        <ComboBox inputClassName='combo-box' options={this.state.lga} enableAutocomplete placeholder='Select LGA' onSelect={(option) => { this.getWard(this.state.selectedState, option) }} /></div>
      <div className='combo'><div className='combo-label'>
        Ward</div>
        <ComboBox inputClassName='combo-box' options={this.state.ward} enableAutocomplete placeholder='Select Ward' onSelect={(option) => { this.setState({ selectedWard: option }) }} /></div>
      <Button sx={{ marginTop: "20px", height: "35px" }} className="search-button" variant="contained" onClick={() => this.getPolling()}>Search</Button>
    </div>
  }



  getState() {
    axios
      .get("http://127.0.0.1:5000/getState?key=1234")
      .then((response) => {
        this.setState({ state: response.data });
        console.log(response.data)
      });
  }


  getLGA(state) {
    axios
      .get("http://127.0.0.1:5000/getLGA?key=1234&name=" + state)
      .then((response) => {
        this.setState({ selectedState: state, lga: response.data });

      });
  }

  getWard(state, lga) {
    axios
      .get("http://127.0.0.1:5000/getWard?key=1234&state=" + state + "&lga=" + lga)
      .then((response) => {
        this.setState({ selectedState: state, selectedLGA: lga, ward: response.data });

      });
  }

  getPolling() {
    const state = this.state.selectedState
    const lga = this.state.selectedLGA
    const ward = this.state.selectedWard
    if (state != null && lga != null && ward != null) {
      axios
        .get("http://127.0.0.1:5000/getPol?key=1234&state=" + state + "&lga=" + lga + "&ward=" + ward)
        .then((response) => {
          this.setState({ poling: response.data });
          console.log(response.data)
        });
    }
  }
}

export default Dashboard;