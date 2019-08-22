#!/bin/bash

mongoimport -d employees -c information --type csv --file ./MOCK_DATA.csv --fields "ID,FirstName,MiddleInitial,LastName,DateOfBirth,DateOfEmployment,Status";
