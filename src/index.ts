import {
    init
} from 'dc-extensions-sdk';
import {
    $
} from './bling';

(async() => {
    try {
        var sdk = await init < string > (),
            value = await sdk.field.getValue(),
            paramType = sdk.params.instance.type,
            enumArray = sdk.params.instance.enum || "",
            headingTextValue = sdk.params.instance.heading,
            descriptionTextValue = sdk.params.instance.description,
            defaultValue = sdk.params.instance.default || "",
            existingForm = sdk.form.getValue();

            console.log("headingTextValue" + headingTextValue);

        const textField = $('#textField');
        const enumField = $('#enumField');
        const headingText = $('#headingText');
        const descriptionText = $('#descriptionText');

        switch (paramType) {
            case "text":

                headingText.innerHTML = headingTextValue;
                descriptionText.innerHTML = descriptionTextValue;

                enumField.classList.add("hidden");

                if (defaultValue !== undefined) {
                    textField.value = defaultValue;
                } else {
                    textField.value = sdk.params.instance.default;
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
                }

                break;
            case "date":
                
                headingText.innerHTML = headingTextValue;
                descriptionText.innerHTML = descriptionTextValue;

                enumField.classList.add("hidden");
                
                var today = new Date();
                var dd = today.getDate();

                var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();
                if(dd<10) 
                {
                    dd='0'+dd;
                } 

                if(mm<10) 
                {
                    mm='0'+mm;
                } 
                today = mm+'-'+dd+'-'+yyyy;
                textField.value = today;
        }

        const setContent = async value => {
            try {
                await sdk.field.setValue(value);
            } catch (e) {
                console.log(e);
            }
        };

        textField.on('keyup', _ => setContent(textField.value));
        enumField.on('change', _ => setContent(enumField.value));

    } catch (e) {
        const error: HTMLHeadingElement = $('#error');
        error.classList.add('show');
    }
})();
