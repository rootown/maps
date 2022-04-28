#!/bin/bash

mkdir new_json_files
node buildingData_maker.js && node departments_maker.js && node parkingLots_maker.js
