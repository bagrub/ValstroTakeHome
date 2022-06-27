// Note: The HTML for this challenge can be found in index.html
// Note: this function is run inside of src/main.tsx
export function runVanillaApp() {
  // Start here
  const multiplierInputListener = document.querySelector('#multiplier')
  const filterInputListner = document.querySelector('#filter')
  

  function loadTableData(characterData){
    const tableBody = document.getElementById('table')
    
    let dataHTML = '';
    for(let character in characterData) {
      dataHTML += `<tr class='characterTableRow'><td>${characterData[character].name}</td>
      <td>${characterData[character].height}</td>
      <td>${characterData[character].mass}</td>
      <td>0</td></tr>`
    }
    
    tableBody.innerHTML = dataHTML; 
    updateMultiplier();
  }

  /*
  * update Multiplier cells based on current value of multiplyer input
  */
  function updateMultiplier(){
    let tableCell = document.getElementsByClassName('characterTableRow');
    let multiplier = document.getElementById('multiplier').value;
    let mass, height 

    for(let a=0; a < tableCell.length; a++){
      mass = tableCell[a].children[1].textContent;
      height = tableCell[a].children[2].textContent;

      tableCell[a].children[3].innerHTML = mass * height * multiplier;
    }
  }

  function filterTable(){
    let input, filterTerm, tableBody, tableRows, tableCell, i, txtVal
    
    tableBody = document.getElementById('table')
    filterTerm = document.getElementById('filter').value.toUpperCase();
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

  let characterData = fetch(`https://swapi.dev/api/people/`)
    .then(res => res.json())
    .then(data => loadTableData(data.results))
    //only getting 10 results instead of 82 need to confirm data set


  multiplierInputListener?.addEventListener('change', (event) =>{updateMultiplier()})
  filterInputListner?.addEventListener('change', (event) =>{filterTable()})

  document.body.addEventListener('keyup', function(e) {
    if(e.key == 'Escape'){
      document.getElementById('multiplier').value = 10;
      updateMultiplier();
      document.getElementById('filter').value = '';
      filterTable();
    }
  })  
}

