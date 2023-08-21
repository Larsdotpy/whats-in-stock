const jsonData =
  {
    "pindakaas":"test",
    "Amount": 1,
    "Shop": "Jumbo",
    "Link": null
  };

export function apiPostCall(){
    const endpointUrl = 'http://localhost:3000/products';
    fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonData)
    })
      .then(response => response.json())
      .catch(error => {
        console.error('Error:', error);
      });
  };