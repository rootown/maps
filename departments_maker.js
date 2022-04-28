// File created to respec University of Akron data into the new buildingData.json file
// Written by Charles Gruhler

const fs = require('fs');

try { // this better never fail

    // json imports
    const departmentData = fs.readFileSync('./json_files/departments.json', 'utf8');
    const dept = JSON.parse(departmentData);

    // writing start to file
    fs.writeFileSync("./new_json_files/departments.json", "[", err => {
        if (err) {
          console.log(err);
        } else {
          console.log("File rewritten successfully\n");
        }
    });

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

    var url = "";
    var count = 0;

    dept.forEach(dpt => {
        url = dpt.url;
        departmentInfo.name = dpt.name;
        departmentInfo.building_id = dpt.building_id;
        departmentInfo.order = dpt.order;

        if(url.length != 0) { // all of this can be optimized
            // determining the state of the url
            if((urlState.httpsPos = url.search("https://")) != -1) { // if https is in the url string
                urlState.isHttps = true;
            } else if((urlState.httpsPos = url.search("http://")) != -1) {
                urlState.isHttps = true;
            }

            // determining url extension, anything that is nonstandard should likely remain the same without change
            if((urlState.uakronPos = url.search("uakron.edu")) != -1) {
                urlState.isUakron = true;
            } else if((urlState.nonstandardPos = url.search('\\.com')) != -1) {
                urlState.isNonStandard = true;
            } else if((urlState.nonstandardPos = url.search('\\.co')) != -1) {
                urlState.isNonStandard = true; 
            } else if((urlState.nonstandardPos = url.search('\\.org')) != -1) {
                urlState.isNonStandard = true;
            } else if((urlState.nonstandardPos = url.search('\\.gov')) != -1) {
                urlState.isNonStandard = true;
            } else if((urlState.nonstandardPos = url.search('\\.fm')) != -1) {
                urlState.isNonStandard = true;
            }


            if(!urlState.isNonStandard) { // only make changes to urls that are intended to be appended to uakron.edu
                if(!urlState.isUakron) { // if it does not have a nonstandard url extension, add uakron.edu
                    url = "www.uakron.edu" + url;
                }
                if(!urlState.isHttps) { // if it does not have a https:// at the beginning, add it
                    url = "https://" + url;
                }
            } 

            // reset
            urlState.isHttps = false;
            urlState.httpsPos = -2;
            urlState.isUakron = false;
            urlState.uakronPos = -2;
            urlState.isNonStandard = false;
            urlState.nonstandardPos = -2;
        }
        // url has been fixed (?)
        departmentInfo.department_url = url;

        // json writing
        fs.appendFileSync("./new_json_files/departments.json", JSON.stringify(departmentInfo));
        if(++count != (dept.length)) {
            fs.appendFileSync("./new_json_files/departments.json", ",")
        }
    });

    fs.appendFileSync("./new_json_files/departments.json", "]")

} catch(err) {
    console.log(`Error reading file from disk: ${err}`);
}