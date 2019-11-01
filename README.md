# Running Extension

1) `npm i`
2) `npm run start`
3) Go to `https://localhost:1234` and accept cert risk

# Using Extension in DC

1) Go to [http://content.amplience.net/](http://content.amplience.net/)
2) Login with provided creds
3) Go to Development > Content Type Schemas > Create schema
4) Give it a unique URI
5) Choose Content Type under 'Schema will be used for' > Save & Open schema
6) Use schema below (replacing $id value with your schema id)
7) Go to Development > Content Types > Register Content Type
8) Choose your schema ang give it a label
9) Under Associated repositories select <x> repo
10) Go to Production > Create content and select your new schema

You are now using a UI Extension. Try updating the placeholder text in `index.html` and see it update in real time. 

## Example schema to use
```
{
	"$schema": "http://json-schema.org/draft-07/schema#",
	"$id": "{{your-schema-id-here}}",

	"title": "Hello World",
	"description": "Description",

	"allOf": [
		{
			"$ref": "http://bigcontent.io/cms/schema/v1/core#/definitions/content"
		}
	],
	
	"type": "object",
	"properties": {
		"helloWorld": {
			"title": "UI Extension",
			"type": "string",
			"ui:extension": {
				"url": "https://localhost:1234/",
				"height": 100
			}
		}
	}
}
```