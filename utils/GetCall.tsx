const endpointUrl = 'http://lars.detestbaas.nl:3000/products';

export function apiGetCall() {
  const requestData = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(endpointUrl, requestData)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      return data; // Return the fetched data
    })
    .catch(error => {
      console.error('Error:', error);
      throw error; // Re-throw the error to handle it in the caller code
    });
}
