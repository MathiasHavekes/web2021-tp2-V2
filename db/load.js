connection = new Mongo();

db = connection.getDB("carbay");

db.createCollection("facilities");
db.createCollection("cars");
db.createCollection("clients");
db.createCollection("leases");

db.facilities.insert([
  {
    title: "Carbay Rental Montreal Twon Center",
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

db.cars.insert([
  {
    licensePlate: "935 VGA",
    model: "Jaguar I-Pace",
    color: "#063970",
    description: "470 kilomètres, 50 CAD/jour",
    image: "",
    pricePerDay: "50",
    state: "libre",
    currentFacilitie: "1",
  }
]);