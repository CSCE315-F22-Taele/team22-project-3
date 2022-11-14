import './App.css';
import { Button} from 'react-bootstrap';

function App() {

  const handleClick = (param) => {
    console.log(param);


  };
  
  function RestartPage() {
    window.location.reload(false);
  }

  return (
    <div className="App">
      
      <div className="App-header">
      <p> Cabo Grill Online Ordering Service </p>
      </div>

      <div className="App-body"> 
        
        <div className= "radio"> 
        <br></br>
        <ul>
          <div className = "title" > Base </div>
          <li>
          <input label="Bowl" type="radio" id="13" name="base" value="0"  onClick={event => handleClick("Bowl")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Burrito" type="radio" id="14" name="base" value="0" onClick={event => handleClick("Burrito")} />
          </li>
          <div className = "title" > Protein </div>
          <li>
          <input label="Chicken ($7.29)" type="radio" id="0" name="protein" value="7.29" onClick={event => handleClick("Chicken")} /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Steak ($8.29)" type="radio" id="1" name="protein" value="8.29" onClick={event => handleClick("Steak")}/>
          &nbsp;&nbsp;&nbsp;
          <input label="Beef ($8.19)" type="radio" id="2" name="protein" value="8.19" onClick={event => handleClick("Beef")}/>
          &nbsp;&nbsp;&nbsp;
          <input label="Vegetables ($7.29)" type="radio" id="3" name="protein" value="7.29" onClick={event => handleClick("Vegetables")}/>
          </li>
          <li>
          <input label="None" type="radio" name="protein" value="0" onClick={event => handleClick("None")} />
          </li>

          <div className = "title" > Add Ons </div>
          <li>
          <input label="Guacamole ($2.00)" type="checkbox" id="4" value="2.00" onClick={event => handleClick("Guacamole")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Queso ($2.00)" type="checkbox" id="5" value="2.00" onClick={event => handleClick("Queso")}/> 
          </li>

          <li>
          <input label="Rice" type="checkbox" id="15" value="0.00" onClick={event => handleClick("Rice")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Cheese" type="checkbox" id="16" value="0.00" onClick={event => handleClick("Cheese")}/>
          &nbsp;&nbsp;&nbsp;
          <input label="Ranch" type="checkbox" id="17" value="0.00" onClick={event => handleClick("Ranch")}/>
          </li>

          <li>
          <input label="Chipotle" type="checkbox" id="18" name="abc" value="0.00" onClick={event => handleClick("Chipotle")} /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Salsa" type="checkbox" id="19"  value="0.00" onClick={event => handleClick("Salse")}/>
          &nbsp;&nbsp;&nbsp;
          <input label="Sour Cream" type="checkbox" id="20"  value="0.00" onClick={event => handleClick("Sour Cream")}/>
          &nbsp;&nbsp;&nbsp;
          <input label="Cream" type="checkbox" id="21"  value="0.00" onClick={event => handleClick("Cream")}/>
          </li>

          <div className = "title" > Sides </div>

          <li>
          <input label="Chips and Salsa ($2.19)" type="checkbox" id="6"  value="2.19" onClick={event => handleClick("Chips and Salsa")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Chips and Queso ($3.64)" type="checkbox" id="7"  value="3.64" onClick={event => handleClick("Chips and Queso")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Chips and Guac ($3.69)" type="checkbox" id="8"  value="3.69" onClick={event => handleClick("Chips and Guac")}/> 
          </li>

          <div className = "title" > Drinks & Desserts </div>
          <li> 
          <input label="Brownie ($1.99)" type="checkbox" id="9" name="Dessert" value="1.99" onClick={event => handleClick("Brownie")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Cookie ($1.99)" type="checkbox" id="10" name="Dessert" value="1.99" onClick={event => handleClick("Cookie")}/> 
          </li>
          <li> 
          <input label="16 oz Fountain Drink ($2.25)" type="checkbox" id="11" name="Drink" value="2.25" onClick={event => handleClick("16 oz Fountain Drink")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="22 oz Fountain Drink ($2.75)" type="checkbox" id="12" name="Drink" value="2.75" onClick={event => handleClick("22 oz Fountain Drink")}/> 
          </li>

          <div className = "title" > Etc. </div>
          <input label="Napkins" type="checkbox" id="22" name="etc" value="0.00" onClick={event => handleClick("Napkins")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Silverware" type="checkbox" id="23" name="etc" value="0.0" onClick={event => handleClick("Silverware")}/> 
        </ul>

        <Button onClick = {RestartPage}> Restart </Button>

        <br></br>

        </div>
        
      </div>

    </div>
  );
}

export default App;
