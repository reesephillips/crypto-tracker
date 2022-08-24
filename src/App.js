import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin';


function App() {
  const [coins,setCoins] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(res => {
          setCoins(res.data)
          console.log(res.data)
    }).catch(error => console.log(error))
  }, [])

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin => 
    coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search Top 100 Cryptocurrencies By Market Cap</h1>  
        <form>
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange}/>
        </form>
        <div className='header-info'>
          <h3>Name</h3>
          <h3>Ticker</h3>
          <h3>Price</h3>
          <h3>Volume</h3>
          <h3>24 Hr Change</h3>
          <h3>Market Cap</h3>
        </div>
        {filteredCoins.map(coin => {
          return (
            <Coin key={coin.id} name ={coin.name} image={coin.image} symbol={coin.symbol} marketcap={coin.market_cap} price={coin.current_price} priceChange={coin.price_change_percentage_24h} volume={coin.total_volume} low={coin.low_24h} high={coin.high_24}/>
          )
        })}
      </div>
    </div>
  );
}

export default App;
