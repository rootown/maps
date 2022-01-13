#!/bin/bash

sudo sed -i -e "s/CipherString = DEFAULT:@SECLEVEL=2/CipherString = DEFAULT:@SECLEVEL=1/" /etc/ssl/openssl.cnf

html=$(wget -O /dev/null -S https://maps.uakron.edu)

printf '%s\n' "$html"

from_variable() {
	echo $(printf '%s\n' "$html" | grep "var $1" | sed "s/^[ \t]*//; s/var $1 = //; s/;//")
}

mkdir out
cd out

from_variable buildings # > buildings.json
from_variable parkingLots # > parkingLots.json
from_variable parkingRelations # > parkingRelations.json
from_variable departments # > departments.json
from_variable categories # > categories.json
from_variable buildingCategories # > buildingCategories.json
