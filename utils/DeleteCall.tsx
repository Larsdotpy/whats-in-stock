const endpointUrl = 'http://localhost:3000/products?productType=';

export function apiDeleteCall(productType: string) {
  const requestData = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(endpointUrl + productType, requestData)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Handle successful response here, if needed
      console.log('Item deleted:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
};