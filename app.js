/*
# autofresh module
function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}

window.onload = timedRefresh(50000);
*/

document.addEventListener('DOMContentLoaded', function(){

    my_porfolio = {
        "uniswap": 0,
        "1inch": 0,
        "0x": 0,
        "loopring": 0,
        "balancer": 1.51869699,
        "kyber-network": 27.59726383,
        "safemoon": 0,
        "audius": 0,
        "storj": 0,
        "trust-wallet-token": 0,
        "atomic-wallet-coin": 0,
        "bread": 0 
    }

    for (var i=0, sum_value=0; i<Object.keys(my_porfolio).length; i++){
        const crypto = Object.keys(my_porfolio)[i]
        const crypto_url = 'https://www.coingecko.com/en/coins/' + crypto + '/'       
        var table = document.getElementById('table_content')
        fetch('https://api.coingecko.com/api/v3/coins/'+ crypto + '/')
        .then(response => response.json())
        .then(data => {
            const price=data.market_data.current_price.usd;
            const icon=data.image.thumb;
            const change_pct=data.market_data.price_change_percentage_24h;
            const symbol=data.symbol.toUpperCase();
            const category=data.categories.join(', ');
            const market_cap=data.market_data.market_cap.usd 
            const fdv=data.market_data.fully_diluted_valuation.usd 
            const coingecko_score=data.coingecko_score
            console.log(coingecko_score)
            const developer_score=data.developer_score
            const community_score=data.community_score
            const liquidity_score=data.liquidity_score
            var row = `<tr>
                            <td data-col-title='Asset Name'><a href=${crypto_url}>${crypto}</a></td>
                            <td data-col-title='Symbol'>${symbol}</td>
                            <td data-col-title='Icon'><img src=${icon}></img></td>
                            <td data-col-title='Category' id='category_column'>${category}</td>
                            <td data-col-title='Market Price ($)'>${price.toFixed(2)}</td>
                            <td data-col-title='Price Change - 24h'>${parseFloat(change_pct).toFixed(2)}%</td>
                            <td data-col-title='Market Cap ($bn)'>${(market_cap/(10**9)).toFixed(2)}</td>
                            <td data-col-title='Fully Diluted Valuation ($bn)'>${(fdv/(10**9)).toFixed(2)}</td>
                            <td data-col-title='Coingecko Score'>${coingecko_score.toFixed(2)}</td>
                            <td data-col-title='Developer Score'>${developer_score.toFixed(2)}</td>
                            <td data-col-title='Community Score'>${community_score.toFixed(2)}</td>
                            <td data-col-title='Liquidity Score'>${liquidity_score.toFixed(2)}</td>
                       </tr>`
            table.innerHTML += row

        })
    }
    
})

function generatePDF() {
    // Choose the element that our invoice is rendered in.
    const element = document.getElementById("element-to-print");
    // Choose the element and save the PDF for our user.
    html2pdf()
      .from(element)
      .save();
  }
var update_date = new Date().toISOString().split('T')[0]
document.getElementById('update_date').innerHTML = update_date
