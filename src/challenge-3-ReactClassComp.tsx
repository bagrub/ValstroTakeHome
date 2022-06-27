import { Component, useState } from "react";

class ClassComp extends Component {
  render() {
    return(
      <Table />
    );
  }
}

class Table extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      data: [],
      dataIsLoaded: false,
      multiplier: 10,
      filter: ''
    };

    this.onMultiplierchange = this.onMultiplierchange.bind(this);
    this.onFilterchange = this.onFilterchange.bind(this);
  }
  
  componentDidMount(){
    
    fetch(`https://swapi.dev/api/people/`)
    .then((res) => res.json())
    .then((json) => {
      this.setState({
        data: json.results,
        dataIsLoaded: true
      });
    })
  }

  onMultiplierchange(event){
    this.setState({
      multiplier: event.target.value
    })
  }

  onFilterchange(event){
    this.setState({
      filter: event.target.value
    });
    this.filterTable();
  }

  onEscapeEvent = (event) => {
    if(event.key === "Escape"){
      this.setState({
        multiplier: 10, 
        filter: ''
      })
      console.log(this.state.filter)
      document.getElementById('filter3').value = this.state.filter;    
      document.getElementById('multi3').value = this.state.multiplier;    
      
      this.filterTable();
  
    }
  }

  filterTable(){
    let filterTerm, tableBody, tableRows, tableCell, txtVal

    tableBody = document.getElementById('table3');
    filterTerm = this.state.filter.toUpperCase();
    tableRows = tableBody?.getElementsByTagName('tr');
  
    for(let a=0; a < tableRows?.length; a++){
      tableCell = tableRows[a].getElementsByTagName('td')[0];
      if(tableCell){
        txtVal = tableCell.textContent
        if(txtVal.toUpperCase().indexOf(filterTerm) > -1) {
          tableRows[a].style.display = '';
        } else {
          tableRows[a].style.display = 'none'
        }
      }
    }
  }

  render() {

    const {data} = this.state
    
    
    return (
      <div id="class-comp" onKeyUp={this.onEscapeEvent}>
        <h2>React Class Component</h2>
        Filter: <input 
          id='filter3'
          placeholder="Filter by name" 
          onChange={this.onFilterchange}
          defaultValue={this.state.filter}
        /> Multiplier:{" "}
        <input
          id='multi3'
          placeholder="Multiplier"
          type="number"
          min="1"
          max="20"
          defaultValue={this.state.multiplier}
          onChange={this.onMultiplierchange}
        />
        {" "}
        Press "Escape" to reset fields
        <div className="loader">Loading...</div>
        <table width="100%" id='table3'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Height</th>
              <th>Mass</th>
              <th>Power</th>
            </tr>
          </thead>
          <tbody>
            {
              data.map((dat) =>
                <TableRow 
                name={dat.name}
                height={dat.height}
                mass={dat.mass}
                multi={this.state.multiplier}
                />
              )
            }
            
          </tbody>
        </table>
      </div>
    );
  }
}

class TableRow extends Component{
  render() {
    return (
      <tr>
        <td>{this.props.name}</td>
        <td>{this.props.height}</td>
        <td>{this.props.mass}</td>
        <td>{this.props.height * this.props.mass * this.props.multi}</td>
      </tr>
    );
  }
}

export default ClassComp;
