// File created to respec University of Akron data into the new buildingData.json file
// Written by Charles Gruhler

const fs = require('fs');

try { // this better never fail

    fs.writeFileSync("./new_json_files/buildingData.json", "[", err => {
        if (err)
          console.log(err);
        else {
          console.log("File written successfully\n");
        }
    });
    // json imports
    const buildingsData = fs.readFileSync('./json_files/buildingData.json', 'utf8');;
    const relationsData = fs.readFileSync('./json_files/parkingRelations.json', 'utf8');
    const categoriesData = fs.readFileSync('./json_files/categories.json', 'utf8');

    // parsing the existing json, this could definitely be cleaner
    const buildings = JSON.parse(buildingsData);
    const relations = JSON.parse(relationsData);
    const cats = JSON.parse(categoriesData);

    const buildingInfo = {
        name:'',
        id:0,
        abbreviation:'',
        address:'',
        lat:0.0,
        lng:0.0,
        image_file:'',
        html:'',
        related_lots:[],
        categories:[]
    };

    var count = 0;
    buildings.forEach(bd => {
        // this is where each object is constructed and exported into
        buildingInfo.name = bd.name;
        buildingInfo.id = bd.id;
        buildingInfo.address = bd.address;
        buildingInfo.abbreviation = bd.abbreviation;
        buildingInfo.lat = bd.lat;
        buildingInfo.lng = bd.lng;
        buildingInfo.image_file = bd.image_file;
        
        if(bd.html != "") {
            buildingInfo.html = bd.html;
        } else if(bd.markdown != "" && bd.markdown != null) {
            buildingInfo.html = bd.markdown;
        }

        // add parking relations
        relations.forEach(rel => {
            if(rel.building_id == bd.id) {
                buildingInfo.related_lots.push(rel.lot_number);
            }
        });

        // adding related categories
        cats.forEach(cat => {
            if(cat.building_id == bd.id) {
                buildingInfo.categories.push(cat.category_id); // attaching any relevant category id's to their buildings
            }
        });

        // export to json!!!
        fs.appendFileSync("./new_json_files/buildingData.json", JSON.stringify(buildingInfo));
        if(++count != (buildings.length)) {
            fs.appendFileSync("./new_json_files/buildingData.json", ",");
        }

        // clear old data
        buildingInfo.html = "";
        buildingInfo.related_lots = [];
        buildingInfo.categories = [];
        buildingInfo.image_file = "";
    });

    fs.appendFileSync("new_json_files/buildingData.json", "]");

} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}