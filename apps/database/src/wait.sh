#!/bin/bash

while ! nc -z localhost 4466; do   
  sleep 0.1 # wait for 1/10 of the second before check again
done