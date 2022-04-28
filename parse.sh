#!/bin/bash

if [[ -v CI ]]; then
	sudo patch /etc/ssl/openssl.cnf openssl.cnf.patch
fi

html=$(curl -s https://maps.uakron.edu)

from_variable() {
	echo $(echo "$html" | grep "var $1" | sed "s/^[ \t]*//; s/var $1 = //; s/;//")
}

mkdir json_files
cd json_files

from_variable buildings > buildings.json
from_variable parkingLots > parkingLots.json
from_variable parkingRelations > parkingRelations.json
from_variable departments > departments.json
from_variable categories > categories.json
from_variable buildingCategories > buildingCategories.json
