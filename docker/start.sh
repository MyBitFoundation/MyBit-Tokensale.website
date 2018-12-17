#!/bin/bash

echo "$NODE_ENV" 
if [ "$NODE_ENV" = "development" ]; then
  yarn run dev
elif [ "$NODE_ENV" = "production" ]; then  
  yarn run build && yarn run start
fi
