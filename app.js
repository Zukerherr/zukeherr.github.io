/*
# autofresh module
function timedRefresh(timeoutPeriod) {
	setTimeout("location.reload(true);",timeoutPeriod);
}

window.onload = timedRefresh(50000);
*/

document.addEventListener('DOMContentLoaded', function(){

    my_porfolio = {
        "bitcoin": 0.2074673,
        "ethereum": 1.68790867,
        "celo": 57.52118271,
        "stellar": 445.4540398,
        "balancer": 1.51869699,
        "kyber-network": 27.59726383,
        "bitcoin-cash-sv": 0.2,
        "maker": 0.01053881,
        "compound-governance-token": 0.05476787,
        "litecoin": 0.03626936,
        "dogecoin": 2451.1967,
        "everipedia": 3823.5968,
        "band-protocol": 0.30406965,
        "numeraire": 0.07228121,
        "the-graph": 8.16330889,
        "nucypher": 198.78100265,
        "storj": 0
    }

    const principal = 4321.72

    for (var i=0, sum_value=0; i<Object.keys(my_porfolio).length; i++){
        const crypto = Object.keys(my_porfolio)[i]
        const quantity = my_porfolio[crypto]
        const crypto_url = 'https://www.coingecko.com/en/coins/' + crypto + '/'       
        var table = document.getElementById('table_content')
        fetch('https://api.coingecko.com/api/v3/coins/'+ crypto + '/')
        .then(response => response.json())
        .then(data => {
            const price=data.market_data.current_price.usd;
            const icon=data.image.thumb;
            const change_pct=data.market_data.price_change_percentage_24h;
            const crypto_value = price * quantity;
            const symbol=data.symbol.toUpperCase();
            var row = `<tr>
                            <td><a href=${crypto_url}>${crypto}</a></td>
                            <td>${symbol}</td>
                            <td><img src=${icon}></img></td>
                            <td>${price.toFixed(2)}</td>
                            <td>${parseFloat(change_pct).toFixed(2)}%</td>
                            <td>${quantity.toFixed(4)}x</td>
                            <td>${crypto_value.toFixed(2)}</td>
                       </tr>`
            table.innerHTML += row
            sum_value += crypto_value            
            document.getElementById('total_value').innerHTML = sum_value.toFixed(2);
            const cumulative_return = parseFloat((sum_value / principal - 1)*100).toFixed(2) + "%";
            document.getElementById('cumulative_return').innerHTML = cumulative_return;
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
