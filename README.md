# Dynamic Content Extension - Default Selector

A very common feature request from our customers is to be able to set default values in the content type schema. This extension is designed to enable this for our customers with minimal setup and development needed.

# Getting Started

### Depdencendies

* Node https://nodejs.org/en/download/
* Git https://git-scm.com/download/mac
* Account on Dynamic Content http://content.amplience.net/

### Running the Extension

1. `git clone https://github.com/joffredi/amplience-default-selector.git` to clone this repository
2. `chmod u+x start.sh` to enable execution of the start script
3. `npm i`
4. `npm run start`
5. Go to `https://127.0.0.1:1234` and accept certification risk

# Usage

To use the extension in content type schemas, log on to http://content.amplience.net/, create a new schema and include the extension. You can also choose to register the extension in Dynamic Content. More information on how to do this can be found in the documentation links below:

#### Creating Content Type Schemas
https://docs.amplience.net/integration/schemaeditor.html

#### Registering and Using Extensions
https://docs.amplience.net/development/registeringextensions.html

To configure your default value for a content type schema field, use the keyword "params" in your schema. The supported property types are "enum" and "text".


## Examples

### Content Type Schema Using a Text Value
```
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "{{your-schema-id-here}}",

	"title": "Default Text Value",
	"description": "Description",

	"allOf": [
		{
			"$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"
		}
	],
	
	"type": "object",
	"properties": {
		"defaultTextValue": {
			"title": "Default Text Value Extension",
			"type": "string",
			"ui:extension": {
				"url": "https://localhost:1234/",
				"height": 100
				"params": {
    				"type": "text",
    				"default": "This is a default value",
    					
    
               }
			}
		}
	}
}
```

### Content Type Schema Using an Enum Value
```
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "{{your-schema-id-here}}",

    "title": "Default Enum Value",
    "description": "Description",

    "allOf": [
        {
            "$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"
        }
    ],

    "type": "object",
    "properties": {
        "defaultEnumValue": {
            "title": "Default Enum Value Extension",
            "type": "string",
            "ui:extension": {
                "url": "https://127.0.0.1:1234/",
                "height": 100,
                "params": {
                    "type": "enum",
                    "default": "3",
                    "enum": [
                        ["1", "Option 1"],
                        ["2", "Option 2"],
                        ["3", "Option 3"],
                        ["4", "Option 4"]
                    ],
                }
            }
        },
    }
}
```
### Content Type Schema Using an Image
```
{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "{{your-schema-id-here}}",

    "title": "Default Enum Value",
    "description": "Description",

    "allOf": [
        {
            "$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"
        }
    ],

    "type": "object",
    "properties": {
        "defaultImage": {
            "title": "Default Image Extension",
            "type": "string",
            "ui:extension": {
                "url": "https://127.0.0.1:1234/",
                "height": 100,
                "params": {
                    "type": "image",
                    "default": "https://i1.adis.ws/i/hackathon/cat",
                }
            }
        },
    }
}
```