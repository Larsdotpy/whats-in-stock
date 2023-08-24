export function apiPostCall(productType: string, amount: string, shop: string, link: string) {
  const endpointUrl = 'http://localhost:3000/products';
  
  const jsonData = {
    productType: productType,
    Amount: parseInt(amount),
    Shop: shop,
    Link: link,
  };

  fetch(endpointUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
    .then(response => response.json())
    .then(data => {
      // Handle success response if needed
      console.log('Item added successfully');
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
