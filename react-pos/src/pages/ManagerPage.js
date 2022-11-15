import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Link } from "react-router-dom"

import InventoryPage from './InventoryPage';
import SalesPage from './SalesPage';

export default function ManagerPage() {
  return (
    <Router>
        <header className="App-header">
            <h1>Manager Page</h1>

        </header>
        {/*Create table with 7 columns and 3 rows*/}
        <table>
            <tr>
                <th>Inventory</th>
                <th>Sales</th>
                <th>Orders</th>
            </tr>
            <tr>
                <td>Inventory</td>
                <td>Sales</td>
                <td>Orders</td> 
            </tr>
        </table>
        <nav>
            <Link to="/"> Sales </Link>
            <Link to="/InventoryPage"> Inventory </Link>
        </nav>
        <Routes>
            <Route path="/" element={<SalesPage />}/>
            <Route path="/InventoryPage" element={<InventoryPage />}/>
        </Routes>
    </Router>
  );
}
