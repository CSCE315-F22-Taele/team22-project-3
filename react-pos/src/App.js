import logo from './logo.svg';
import './App.css';

function App() {
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
          <input label="Bowl" type="radio" id="13" name="base" value="0" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Burrito" type="radio" id="14" name="base" value="0" />
          </li>

          <div className = "title" > Protein </div>
          <li>
          <input label="Chicken ($7.29)" type="radio" id="0" name="protein" value="7.29" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Steak ($8.29)" type="radio" id="1" name="protein" value="8.29" />
          &nbsp;&nbsp;&nbsp;
          <input label="Beef ($8.19)" type="radio" id="2" name="protein" value="8.19" />
          &nbsp;&nbsp;&nbsp;
          <input label="Vegetables ($7.29)" type="radio" id="3" name="protein" value="7.29" />
          </li>

          <div className = "title" > Add Ons </div>
          <li>
          <input label="Guacamole ($2.00)" type="radio" id="4" name="addOnPrem" value="2.00" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Queso ($2.00)" type="radio" id="5" name="addOnPrem" value="2.00" /> 
          </li>

          <li>
          <input label="Rice" type="radio" id="15" name="addOn" value="0.00" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Cheese" type="radio" id="16" name="addOn" value="0.00" />
          &nbsp;&nbsp;&nbsp;
          <input label="Ranch" type="radio" id="17" name="addOn" value="0.00" />
          </li>

          <li>
          <input label="Chipotle" type="radio" id="18" name="addOn" value="0.00" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Salsa" type="radio" id="19" name="addOn" value="0.00" />
          &nbsp;&nbsp;&nbsp;
          <input label="Sour Cream" type="radio" id="20" name="addOn" value="0.00" />
          &nbsp;&nbsp;&nbsp;
          <input label="Cream" type="radio" id="21" name="addOn" value="0.00" />
          </li>

          <div className = "title" > Sides </div>

          <li>
          <input label="Chips and Salsa ($2.19)" type="radio" id="6" name="addOn" value="2.19" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Chips and Queso ($3.64)" type="radio" id="7" name="addOn" value="3.64" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Chips and Guac ($3.69)" type="radio" id="8" name="addOn" value="3.69" /> 
          </li>

          <div className = "title" > Drinks & Desserts </div>
          <li> 
          <input label="Brownie ($1.99)" type="radio" id="9" name="Dessert" value="1.99" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Cookie ($1.99)" type="radio" id="10" name="Dessert" value="1.99" /> 
          </li>
          <li> 
          <input label="16 oz Fountain Drink ($2.25)" type="radio" id="11" name="Drink" value="2.25" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="22 oz Fountain Drink ($2.75)" type="radio" id="12" name="Drink" value="2.75" /> 
          </li>

          <div className = "title" > Etc. </div>
          <input label="Napkins" type="radio" id="22" name="etc" value="0.00" /> 
          &nbsp;&nbsp;&nbsp;
          <input label="Silverware" type="radio" id="23" name="etc" value="0.0" /> 
        </ul>
       
        </div>
      </div>
     
    </div>
  );
}

export default App;
