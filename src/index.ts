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
            defaultValue = sdk.params.instance.default || "",
            existingForm = sdk.form.getValue();

        const textField = $('#textField');
        const enumField = $('#enumField');

        switch (paramType) {
            case "text":

                enumField.classList.add("hidden");

                if (value !== undefined) {
                    textField.value = value;
                } else {
                    textField.value = sdk.params.instance.default;
                }

                break;
            case "enum":

                textField.classList.add("hidden");

                enumArray.forEach(function(item) {
                    var option = document.createElement("option");
                    option.text = item[1];
                    option.value = item[0];
                    enumField.add(option);
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
