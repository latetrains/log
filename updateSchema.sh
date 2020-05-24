#!/bin/bash
echo -e "\e[93m
------------------------------------------------------------------------------
██       █████  ████████ ███████ ████████ ██████   █████  ██ ███    ██ ███████ 
██      ██   ██    ██    ██         ██    ██   ██ ██   ██ ██ ████   ██ ██      
██      ███████    ██    █████      ██    ██████  ███████ ██ ██ ██  ██ ███████ 
██      ██   ██    ██    ██         ██    ██   ██ ██   ██ ██ ██  ██ ██      ██ 
███████ ██   ██    ██    ███████    ██    ██   ██ ██   ██ ██ ██   ████ ███████                                                           
------------------------------------------------------------------------------
\e[0mDescription: Script to update the schema registry with the local schema.json file"

if [[ -f .env ]]
then
    # Pull all the vars out of the .env file
    source .env
fi

if [[ ! -f schema.json ]]
then
    echo "The schema.json file does not exist."
    exit 1
fi

# Pull the schema out of the JSON file and wrap it in a schema element
SCHEMA=$(jq -c '{schema: .|tostring }' schema.json)

# Post the schema to the registry - will not create a new schema if its the same
RESULT=$(curl --silent -X POST -H 'Content-Type: application/vnd.schemaregistry.v1+json' \
  --data "$SCHEMA" \
 $SCHEMA_REGISTRY_URL/subjects/$SCHEMA_REGISTY_MESSAGE_SUBJECT/versions \
 -u $SCHEMA_REGISTRY_API_KEY:$SCHEMA_REGISTRY_API_SECRET)


ERROR=$(echo $RESULT | jq '.message')
ID=$(echo $RESULT | jq '.id')

echo -e "
Schema registry update complete.
------------------------------------------------------------------------------
Schema ID: \e[32m$ID\e[0m
Schema Subject: $SCHEMA_REGISTY_MESSAGE_SUBJECT
Error Message: \e[31m$ERROR\e[0m
"

exit 0
