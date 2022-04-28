// File to create parkingLots.json in its fixed format

const fs = require('fs');

try {

    // writing start to file
    fs.writeFileSync("./new_json_files/parkingLots.json", "[", err => {
        if (err) {
            console.log(err);
        } else {
            console.log("File rewritten successfully\n");
        }
    });

    // json imports
    const relationsData = fs.readFileSync('./json_files/parkingRelations.json', 'utf8');
    const lotsData = fs.readFileSync('./json_files/parkingLots.json', 'utf8');
    const relations = JSON.parse(relationsData);
    const lots = JSON.parse(lotsData);

    const lotObj = { // object with information
        id:0,
        lot_number:0,
        name:"",
        address:"",
        description:"",
        lat:0.0,
        lng:0.0,
        public:false,
        lights:false,
        spaces_total:0,
        accessability_total:0,
        meters_total:0,
        surface_info:"",
        building_relations: []
    }

    var count = 0;

    lots.forEach(lot => {
        // basic info that can be easily copied
        lotObj.id = lot.id;
        lotObj.lot_number = lot.lot_number;
        lotObj.name = lot.name;
        lotObj.address = lot.address;
        lotObj.lat = lot.lat;
        lotObj.lng = lot.lng;
        lotObj.spaces_total = lot.spaces_total;
        lotObj.description = lot.description;
        lotObj.meters_total = lot.meters_total;
        // anything else is left behinddddd

        // basic check for if the lot is public and converting letters to boolean
        if(lot.public == "Y") {
            lotObj.public = true;
        }
        // same but for lights
        if(lot.lights == "Y") {
            lotObj.lights = true;
        }

        relations.forEach(rl => {
            if(rl.lot_number == lot.id) {
                lotObj.building_relations.push(rl.building_id);
            }
        });

        // jsonificate
        fs.appendFileSync("./new_json_files/parkingLots.json", JSON.stringify(lotObj));
        if(++count != lots.length) {
            fs.appendFileSync("./new_json_files/parkingLots.json", ",")
        }

        // clears
        lotObj.id = 0;
        lotObj.lot_number = 0;
        lotObj.name = "";
        lotObj.address = 0;
        lotObj.lat = 0;
        lotObj.lng = 0;
        lotObj.spaces_total = 0;
        lotObj.description = "";
        lotObj.meters_total = 0;
        lotObj.building_relations = [];
        lotObj.public = false;
        lotObj.lights = false;
    });

    fs.appendFileSync("./new_json_files/parkingLots.json", "]");

} catch (err) {
    console.log(`Error: ${err}`);
}