import {
    init
} from 'dc-extensions-sdk';
import {
    $
} from './bling';

interface defaultParam {    
    instance: {   
        default: any;
        heading: any;
        description: any;   
        type: any;  
        enum: any;  
    };    
    installation: {}; 
}

(async() => {
    try {
        var sdk = await init < string,defaultParam > ();

    } catch (e) {
        const error: HTMLHeadingElement = $('#error');
        error.classList.add('show');
    }

            var value = await sdk.field.getValue(),
            paramType = sdk.params.instance.type,
            enumArray = sdk.params.instance.enum || "",
            headingTextValue = sdk.params.instance.heading,
            descriptionTextValue = sdk.params.instance.description,
            defaultValue = sdk.params.instance.default || "",
            existingForm = {};

            try {

                existingForm = await sdk.form.getValue();

            } catch (e) {

            }

        const setContent = async value => { 
            try {   
                await sdk.field.setValue(value);    
            } catch (e) {   
                console.log(e); 
            }   
        };
    
        const textField = $('#textField');
        const enumField = $('#enumField');
        const headingText = $('#headingText');
        const descriptionText = $('#descriptionText');

        switch (paramType) {
            case "text":

                headingText.innerHTML = headingTextValue;
                descriptionText.innerHTML = descriptionTextValue;

                enumField.classList.add("hidden");

                if (value !== undefined) {
                    textField.value = value;
                } else {
                    textField.value = sdk.params.instance.default;
                    setContent(sdk.params.instance.default);
                }

                break;

            case "enum":
                
                headingText.innerHTML = headingTextValue;
                descriptionText.innerHTML = descriptionTextValue;

                textField.classList.add("hidden");

                enumArray.forEach(function(item) {
                    var option = document.createElement("option");
                    option.text = item[1];
                    option.value = item[0];
                    enumField.add(option);
					console.log("iconsole worked");
                });

                for (var i = 0; i < enumField.options.length; i++) {
                    if (defaultValue !== "") {
                        if (enumField.options[i].value === defaultValue) {
                            enumField.options[i].selected = true;
                        }
                    } else {
                        enumField.options[0].selected = true;
                    }
                }
                if (value !== undefined) {
                    enumField.value = value;
                } else { 
                    setContent(sdk.params.instance.default);    
                }

                break;

            case "date":
                
                headingText.innerHTML = headingTextValue;
                descriptionText.innerHTML = descriptionTextValue;

                enumField.classList.add("hidden");
                
                var today = new Date();
                var dd = new Date(String(today.getDate()).padStart(2, '0'));
                var mm = new Date(String(today.getMonth() + 1).padStart(2, '0')); //January is 0!
                var yyyy = new Date(today.getFullYear());

                today = new Date(mm + '/' + dd + '/' + yyyy);

                textField.value = today;
				break; 
        }

        textField.on('keyup', _ => setContent(textField.value));
        enumField.on('change', _ => setContent(enumField.value));


})();
