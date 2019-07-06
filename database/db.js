const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/zagat', {useNewUrlParser: true});

let db = mongoose.connection

db.once('open', () => {
    console.log('you made a database connection')
}).on('error', (error) => {
    console.log(error);
})

let restuarantSchema = new mongoose.Schema({
    name: String,
    description: String,
    syle: String,
    price: String,
    rating: Number,
    img_url: String,
    location: String
});

let Restaurants = mongoose.model('Cities', restuarantSchema);



let save = (restaurant, callback) => {
    

  Restaurants.find({name: restaurant.name}).exec((err, result) => {
          if(err) return err;
          if (result.length) return;
      
          let newRestaurants = new Restaurants ({
            name: restaurant.name,
            description: restaurant.description
          }).save(err => {
            if (err) console.log(err)
          })
        })
}

module.exports.save = save;