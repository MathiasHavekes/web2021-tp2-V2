const {client} = require("./db");

const load = async function() {
  await client.connect();

  await client.db("carbay").dropCollection("facilities");
  await client.db("carbay").dropCollection("cars");
  await client.db("carbay").dropCollection("clients");
  await client.db("carbay").dropCollection("leases");

  await client.db("carbay").createCollection("facilities");
  await client.db("carbay").createCollection("cars");
  await client.db("carbay").createCollection("clients");
  await client.db("carbay").createCollection("leases");

  await client.db("carbay").collection("facilities").insertMany([
    {
      title: "Carbay Rental Montreal Town Center",
      adress: "1440 Rue Drummond, Montréal, QC H3B 2E3",
      lat: "45.49906776844369",
      lng: "-73.57574883846779"
    },
    {
      title: "Carbay Rental Montreal AirPort",
      adress: "5350 Rue Ferrier, Montréal, QC H4P 1L9",
      lat: "45.496261619460014",
      lng: "-73.65891653947715"
    },
    {
      title: "Carbay Rental Trois-Rivières",
      adress: "727 Rue Saint Christophe, Trois-Rivières, QC G9A 3L9",
      lat: "46.35723921809508",
      lng: "-72.55038135103182"
    },
    {
      title: "Carbay Rental Quebec",
      adress: "768 Rue Aiguillon, Québec, QC G1R 1M7",
      lat: "46.81191807217775",
      lng: "-71.21700334837165"
    },
  ]);

  let firstFacility = await client.db("carbay").collection("facilities").findOne({title: "Carbay Rental Montreal Town Center"});
  let secondFacility = await client.db("carbay").collection("facilities").findOne({title: "Carbay Rental Montreal AirPort"});
  let thirdFacility = await client.db("carbay").collection("facilities").findOne({title: "Carbay Rental Trois-Rivières"});
  let fourthFacility = await client.db("carbay").collection("facilities").findOne({title: "Carbay Rental Quebec"});

  await client.db("carbay").collection("cars").insertMany([
    {
      licensePlate: "935 VGA",
      model: "Jaguar I-Pace",
      color: "#063970",
      description: "470 kilomètres, 50 CAD/jour",
      image: "jaguar_i-pace.jpg",
      pricePerDay: "50",
      state: "free",
      currentFacility: firstFacility._id,
    },
    {
      licensePlate: "PDG RDV",
      model: "Jaguar I-Pace",
      color: "#063970",
      description: "470 kilomètres, 50 CAD/jour",
      image: "jaguar_i-pace.jpg",
      pricePerDay: "50",
      state: "free",
      currentFacility: firstFacility._id,
    },
    {
      licensePlate: "935 VGA",
      model: "Jaguar I-Pace",
      color: "#063970",
      description: "470 kilomètres, 50 CAD/jour",
      image: "jaguar_i-pace.jpg",
      pricePerDay: "50",
      state: "free",
      currentFacility: firstFacility._id,
    },
    {
      licensePlate: "935 VGA",
      model: "Jaguar I-Pace",
      color: "#063970",
      description: "470 kilomètres, 50 CAD/jour",
      image: "jaguar_i-pace.jpg",
      pricePerDay: "50",
      state: "free",
      currentFacility: firstFacility._id,
    },
    {
      licensePlate: "PDG RDV",
      model: "Jaguar I-Pace",
      color: "#063970",
      description: "470 kilomètres, 50 CAD/jour",
      image: "jaguar_i-pace.jpg",
      pricePerDay: "50",
      state: "free",
      currentFacility: firstFacility._id,
    },
    {
      licensePlate: "935 VGA",
      model: "Jaguar I-Pace",
      color: "#063970",
      description: "470 kilomètres, 50 CAD/jour",
      image: "jaguar_i-pace.jpg",
      pricePerDay: "50",
      state: "free",
      currentFacility: secondFacility._id,
    },
  ]);

  await client.db("carbay").collection("clients").insertOne({
    name: "Bonisseur de la Bath",
    surname: "Hubert",
    emailAdress: "hb@test.com",
    password: "12345678",
    phoneNumber: "438 522 2589"
  });

  await client.close();
}

load()
.then(console.log("Database elements loaded"))
.catch(err => console.log(err));
