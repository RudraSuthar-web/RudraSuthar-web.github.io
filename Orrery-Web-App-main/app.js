fetch('data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Use the data here (e.g., initialize your orrery with planet data)
  })
  .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
