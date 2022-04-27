// testing json data
// need to actually change the data as it's read instead of just spitting it out but we get there we get there
// no intent to be committed, purely for internal testing

const fs = require('fs');
const { url } = require('inspector');

try {

    // json imports
    const buildingsData = fs.readFileSync('./json_files/buildingData.json', 'utf8');;
    const relationsData = fs.readFileSync('./json_files/parkingRelations.json', 'utf8');
    const lotsData = fs.readFileSync('./json_files/parkingLots.json', 'utf8');
    const departmentData = fs.readFileSync('./json_files/departments.json', 'utf8');
    const categoriesData = fs.readFileSync('./json_files/categories.json', 'utf8');
    const buildingCatData = fs.readFileSync('./json_files/buildingCategories.json', 'utf8');

    // parsing the existing json, this could definitely be cleaner
    const buildings = JSON.parse(buildingsData);
    const relations = JSON.parse(relationsData);
    const lots = JSON.parse(lotsData);
    const dept = JSON.parse(departmentData);
    const cats = JSON.parse(categoriesData);
    const bcats = JSON.parse(buildingCatData);

    let count = 0;
    const numLots = 49;
    const numBuildings = 123;

    const departmentInfo = {
        building_id:0,
        department_id:0,
        name:'',
        order:0,
        department_url:''
    };

    const urlState = {
        isHttps:false,
        httpsPos:-2,
        isUakron:false,
        uakronPos:-2,
        isNonStandard:false,
        nonstandardPos:-2
    }

    dept.forEach(dpt => {
        url = dpt.department_url;
        departmentInfo.name = dpt.name;
        departmentInfo.building_id = dpt.building_id;
        departmentInfo.order = dpt.order;

        // I THINK THIS WHOLE SECTION ON URLs COULD BE REFACTORED BUT I AM NOT WORRIED ABOUT IT RN

        if(url.length != 0) {
            // determining the state of the url
            if((urlState.httpsPos = url.search("https://")) != -1) { // if https is in the url string
                urlState.isHttps = true;
            }

            // determining url extension, anything that is nonstandard should likely remain the same without change
            if((urlState.uakronPos = url.search("uakron.edu")) != -1) {
                urlState.isUakron = true;
            } else if((urlState.nonstandardPos = url.search(".com")) != -1) {
                urlState.isNonStandard = true;
            } else if((urlState.nonstandardPos = url.search(".co")) != -1) {
                urlState.isNonStandard = true; 
            } else if((urlState.nonstandardPos = url.search(".org")) != -1) {
                urlState.isNonStandard = true;
            } else if((urlState.nonstandardPos = url.search(".gov")) != -1) {
                urlState.isNonStandard = true;
            }

            if(!urlState.isNonStandard) { // only make changes to urls that are intended to be appended to uakron.edu
                if(!urlState.isUakron) { // if it does not have a nonstandard url extension, add uakron.edu
                    url = "uakron.edu/" + url;
                }
                if(!urlState.isHttps) { // if it does not have a https:// at the beginning, add it
                    url = "https://" + url;
                }
            }
        }
        // url has been fixed (?)
        departmentInfo.department_url = url;
        console.log(url);
    });


} catch (err) {
    console.log(`Error reading file from disk: ${err}`);
}