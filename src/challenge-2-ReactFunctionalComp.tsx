import React, { useEffect, useState } from 'react'


function FunctionalComp() {
  // const [multiplier, setMultiplier] = useState(10)
  // const [filter, setFilter] = useState('')
  return (
   <TableBody />
  );
}

function filterTable(name:string) {
  let input, filterTerm, tableBody, tableRows, tableCell, i, txtVal
 
  tableBody = document.getElementById('table2')
  filterTerm = name.toUpperCase();
  tableRows = tableBody?.getElementsByTagName('tr');

  for(let a=0; a < tableRows?.length; a++){
    tableCell = tableRows[a].getElementsByTagName('td')[0];
    if(tableCell){
      txtVal = tableCell.textContent // || td.innerText;
      if(txtVal.toUpperCase().indexOf(filterTerm) > -1) {
        tableRows[a].style.display = '';
      } else {
        tableRows[a].style.display = 'none'
      }
    }
  }
}

function TableBody() {
  const [multi, updateMulti] = useState(10);
  const [filter, updateFilter] = useState('');
  const [characterData, updateCharacterData] = useState([])
  
  const handleMulitChange = event => updateMulti(event?.target.value);
  const handleFilterChange = event => {
    updateFilter(event?.target.value);
    filterTable(filter);
  }

  useEffect(() => {
    const handleEsc = (event) => {
      if(event.keyCode === 27){
        updateMulti(10);
        document.getElementById('multiplier2').value = multi;
        updateFilter('');
        document.getElementById('filter2').value = filter;
        filterTable(filter);
      }
    };
    window.addEventListener('keyup', handleEsc);

    return() => {
      window.removeEventListener('keyup', handleEsc)
    };
  }, []);
 



  useEffect(() => {
    const url = `https://swapi.dev/api/people/`;
    const fetchData = async() =>{
      try{
        const response = await fetch(url);
        const json = await response.json();
        updateCharacterData(json.results);
      }
      catch(error){
        console.log('error: ', error);
      }
    };
    fetchData();
  },[]);


  var rows = [];
  for(let character in characterData){
    rows.push(
    <TableRow 
    name = {characterData[character].name}
    height = {characterData[character].height}
    mass = {characterData[character].mass}
    multi = {characterData[character].height * characterData[character].mass * multi}
    />)
  }

  return (
    <div id="functional-comp">
      <h2>React Functional Component</h2>
      Filter: 
      <input 
      id = 'filter2'
      placeholder="Filter by name"
      onChange={handleFilterChange}
      /> Multiplier:{" "}
      <input
        id='multiplier2'
        placeholder="Multiplier"
        type="number"
        min="1"
        max="20"
        defaultValue={multi}
        onChange={handleMulitChange}
      />{" "}
      Press "Escape" to reset fields
      <div className="loader">Loading...</div> <table width="100%" id='table2'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Mass</th>
            <th>Power</th>
          </tr>
        </thead>  
          <tbody>
            {rows}
          </tbody>
      </table>
    </div>

  );
}

function TableRow(props) {
  return(
    <tr>
      <td>{props.name}</td>
      <td>{props.height}</td>
      <td>{props.mass}</td>
      <td>{props.multi}</td>
    </tr>
  );
}

export default FunctionalComp;
