import './App.css';
import { BrowserRouter as Router, Routes, route} from 'react-router-dom';
import ManagerPage from './pages/ManagerPage';

function App() {

  return (
    ManagerPage()
  );

  /* const handleClick = (param) => {
    console.log(param);
  };

  return (
    <div className="App">
      
      <div className="App-header">
      <p> CAVA GRILL Online Ordering Service </p>
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

          <div className = "title" > Add Ons </div>
          <li>
          <input label="Guacamole ($2.00)" type="radio" id="4" name="addOnPrem" value="2.00" onClick={event => handleClick("Guacamole")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Queso ($2.00)" type="radio" id="5" name="addOnPrem" value="2.00" onClick={event => handleClick("Queso")}/> 
          </li>

          <li>
          <input label="Rice" type="radio" id="15" name="addOn" value="0.00" onClick={event => handleClick("Rice")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Cheese" type="radio" id="16" name="addOn" value="0.00" onClick={event => handleClick("Cheese")}/>
          &nbsp;&nbsp;&nbsp;
          <input label="Ranch" type="radio" id="17" name="addOn" value="0.00" onClick={event => handleClick("Ranch")}/>
          </li>

          <li>
          <input label="Chipotle" type="radio" id="18" name="addOn" value="0.00" onClick={event => handleClick("Chipotle")} /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Salsa" type="radio" id="19" name="addOn" value="0.00" onClick={event => handleClick("Salse")}/>
          &nbsp;&nbsp;&nbsp;
          <input label="Sour Cream" type="radio" id="20" name="addOn" value="0.00" onClick={event => handleClick("Sour Cream")}/>
          &nbsp;&nbsp;&nbsp;
          <input label="Cream" type="radio" id="21" name="addOn" value="0.00" onClick={event => handleClick("Cream")}/>
          </li>

          <div className = "title" > Sides </div>

          <li>
          <input label="Chips and Salsa ($2.19)" type="radio" id="6" name="addOn" value="2.19" onClick={event => handleClick("Chips and Salsa")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Chips and Queso ($3.64)" type="radio" id="7" name="addOn" value="3.64" onClick={event => handleClick("Chips and Queso")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Chips and Guac ($3.69)" type="radio" id="8" name="addOn" value="3.69" onClick={event => handleClick("Chips and Guac")}/> 
          </li>

          <div className = "title" > Drinks & Desserts </div>
          <li> 
          <input label="Brownie ($1.99)" type="radio" id="9" name="Dessert" value="1.99" onClick={event => handleClick("Brownie")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Cookie ($1.99)" type="radio" id="10" name="Dessert" value="1.99" onClick={event => handleClick("Cookie")}/> 
          </li>
          <li> 
          <input label="16 oz Fountain Drink ($2.25)" type="radio" id="11" name="Drink" value="2.25" onClick={event => handleClick("16 oz Fountain Drink")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="22 oz Fountain Drink ($2.75)" type="radio" id="12" name="Drink" value="2.75" onClick={event => handleClick("22 oz Fountain Drink")}/> 
          </li>

          <div className = "title" > Etc. </div>
          <input label="Napkins" type="radio" id="22" name="etc" value="0.00" onClick={event => handleClick("Napkins")}/> 
          &nbsp;&nbsp;&nbsp;
          <input label="Silverware" type="radio" id="23" name="etc" value="0.0" onClick={event => handleClick("Silverware")}/> 
        </ul>
       
        </div>

      </div>

    </div>
  ); */
}

export default App;
