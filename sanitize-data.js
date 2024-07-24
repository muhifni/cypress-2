const fs = require('fs');

// Baca file JSON
const data = fs.readFileSync('cypress/fixtures/SEVA/raw/daihatsu-raw.json');
const jsonData = JSON.parse(data);

// Function to remove UUID from model_slug
const removeUUIDFromSlug = (slug) => {
  return slug.replace(/-\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/, '');
};

// Update the cars array
const updatedCars = jsonData.carRecommendations.map(car => ({
  // ...car,
  model_slug: removeUUIDFromSlug(car.model_slug)
}));

// console.log(updatedCars);

// Ambil key 'brand' dan 'model' dari setiap objek di dalam 'carRecommendations'
const filteredData = jsonData.carRecommendations.map(car => {
  return {
      brand: car.brand,
      model: car.model,
      car_name: car.brand + ' ' + car.model,
      model_slug_raw: car.model_slug,
      model_slug: removeUUIDFromSlug(car.model_slug)
  };
});



const filteredDataJSON = JSON.stringify(filteredData, null, 2);

console.log(filteredDataJSON);