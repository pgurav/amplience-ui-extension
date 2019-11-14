import {
    init
} from 'dc-extensions-sdk';
import {
    $
} from './bling';

(async() => {
    try {
        var sdk = await init < string > ();
        console.log('fetching value');
        var value = await sdk.field.getValue(),
            paramType = await sdk.params.instance.type,
            enumArray = await sdk.params.instance.enum || "",
            defaultValue = await sdk.params.instance.default || "",
            existingForm;

        try {
            existingForm = await sdk.form.getValue();
        } catch (e) {
            console.log(e);
        }

        const textField = $('#textField');
        const enumField = $('#enumField');
        const imageField: HTMLButtonElement = $('#imageField');
        const removeImageField: HTMLButtonElement = $('#removeImageField');
        const img: HTMLImageElement = $('#image');

        switch (paramType) {
            case "image":

                enumField.classList.add("hidden");
                textField.classList.add("hidden");
                sdk.frame.setHeight();

                if(defaultValue) {
                  img.onload = () => {sdk.frame.setHeight()};
                  img.src = defaultValue  + "?w=400";
                }

                break;
            case "text":

                enumField.classList.add("hidden");
                imageField.classList.add("hidden");
                sdk.frame.setHeight();

                if (value !== undefined) {
                    textField.value = value;
                } else {
                    textField.value = sdk.params.instance.default;
                }

                break;
            case "enum":

                textField.classList.add("hidden");
                imageField.classList.add("hidden");
                sdk.frame.setHeight();

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

        imageField.on('click',async (e) => {
          const i = await sdk.mediaLink.getImage();
          img.onload = () => {sdk.frame.setHeight()};
          img.src= '//' + sdk.stagingEnvironment + '/i/' + i.endpoint + '/' + i.name +'?w=400';
          removeImageField.classList.remove("hidden");
          setContent('//' + sdk.stagingEnvironment + '/i/' + i.endpoint + '/' + i.name);
       });

       removeImageField.on('click',async (e) => {
         img.src= defaultValue + "?w=400";
         sdk.frame.setHeight();
         removeImageField.classList.add("hidden");
         setContent(defaultValue);
      })

       textField.on('keyup', _ => setContent(textField.value));
       enumField.on('change', _ => setContent(enumField.value));

    } catch (e) {
        console.error(e);
        const error: HTMLHeadingElement = $('#error');
        error.classList.add('show');
    }
})();
