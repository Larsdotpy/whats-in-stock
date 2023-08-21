const endpointUrl = 'http://localhost:3000/products';

export function apiDeleteCall(){
  fetch(endpointUrl + "/1", { //Kunnen verwijderen op productnaam en niet op ID!
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    //body: JSON.stringify(jsonData)
  })
    .then(response => response.json())
    .catch(error => {
      console.error('Error:', error);
    });
};