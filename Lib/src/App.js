/**
* It will be very hard to understand mycode coz --> 
* I used a library I created to change the way I write in javascript. 
* Author -->         
* Name          :Kato Isa 256
* Website       :https://katoisa256.netlify.app/
* google        :katoisa256
* tell/whatsApp :+256705207718
*/

/*this is besically an object filled with 5 main properties of functions
each property has its own section it hundles in the app */
let APP = {
    loginPopUpWindow: function () { /*changed method name from(main to loginPopUpWindow*/
        (function LoginDrawer() {
            /* main editor window*/
            let text = _.HTMLcreate('div');
            let textInfo = document.createTextNode('Welcome to FLUID MANAGER');
            text.appendChild(textInfo);
            _.Select('.AppName').appendChild(text);
            _.Select('.version').innerHTML = 'version 1.0';
            _.Select('.version').style.color = '#333';
        })();

        /* closing button. */
        _.Select('#OpenButton').addEventListener('click', function () {
            _.addClass(_.Select('#FormContainer'), 'addClass');
            _.removeClass(AppWindow, 'DrowWindow');
            // _.addClass(_.Select('#header'), 'Hidden');
            /* _.addClass(_.Select('.hiddenElem'), 'blur');*/
        });

        /* opening button. */
        _.Select('#closeButton').addEventListener('click', function () {
            _.removeClass(_.Select('#FormContainer'), 'addClass');
            _.removeClass(AppWindow, 'DrowWindow');
            _.removeClass(_.Select('#header'), 'Hidden');
        });
    },
    AddElements: function () { /* deals with adding elements to the page*/
        /*open main element editor.*/
        _.Event('.editorContent .AddElement', 'click', () => {
            _.Select('.elementDrawerContainer').classList.add('drawmainelementparent');
        });
        /*close main element constractor*/
        _.Event('.EditorDrowerfooter .exit', 'click', () => {
            _.Select('.elementDrawerContainer').classList.remove('drawmainelementparent');
        });

        /* element drawer */
        function HTML_ElementDrower(Header, SubHeader = false, Content, Type, index) {
            /*Collect data from dataBase*/
            // let dataBaseData = _.DB.Get()
            /* store inner contents of target html element*/
            let elements = [
                `<h2>${Header}</h2><p style="text-align: justify;">${Content}</p>`,
                `<h2>${Header}</h2><h3>${SubHeader}</h3><p style="text-align: justify;">${Content}</p>`
            ];
            /*Create main parent element*/
            let Parent = _.HTMLcreate('div');
            Parent.className = 'section-title';
            Parent.innerHTML = elements[Type];/*insert Content*/
            /**Append Parent element to DOM*/
            let AppendParent = _.Select('.ElementParent .allcontents');
            Parent.id = `NewElement${index}`;
            AppendParent.appendChild(Parent);
        }

        /* editor element generator */
        function EditorElementGenerator(childData) {
            /* lement pallate || editor text box's to collect user input*/
            let ElementPallete = [
                '<textArea class=\' Header \' >TYPE HEADER</textArea> <textArea class=\'  Editorcontent  \'>Type your post\'s main content here, your heading will reflect whats down here, dont be shy just jump right into it and make your content rich and flexible </textArea>',
                '<textArea class=\' Header \' >TYPE HEADER</textArea> <textArea class=\' SubHeader \'>Type SubHeader</textArea> <textArea class=\' Editorcontent \'>Type your post\'s main content here, your heading will reflect whats down here, dont be shy just jump right into it and make your content rich and flexible</textArea>',
            ];

            /* drower :: inject data into parent element depending on user input*/
            let parent = _.Select('.elEditer .elEditer_main');
            /* create child element*/
            let EditorChild = _.HTMLcreate('div');
            parent.innerHTML = ElementPallete[childData];
        }
        /* elemment data constractor*/
        (function elementDataConstractor() {
            /* draw/display element Picker: [displays all the different types of elelemnts]; */
            (function editPanelToggle() {
                /*Main variables*/
                let elementEdits = _.Select('.elementDrawerContainer .ChooseElement .el', true);
                let ParentEle = _.Select('.elEditer_footer');
                let children = ParentEle.children;
                let indicator;
                let CurrentElement;
                let LastInt;
                let getCurrentNumber = _.DB.Get('currentNum');
                let indexID = 0;
                getCurrentNumber ? indexID = parseInt(getCurrentNumber) : _.Print('Current number not saved yet:');

                /*Element Selection event*/
                _.Each(elementEdits, b => {
                    _.Event(b, 'click', () => {
                        _.Select('.elEditer').classList.add('close_elEditer');
                        /* this function is called here to draw data into the editor HTML element*/
                        indicator = b.classList;
                        EditorElementGenerator(indicator[1]);
                    }, true);
                }, true);
                /* close button: clear and destroy session*/
                _.Event(children[0], 'click', () => {
                    _.Select('.elEditer').classList.remove('close_elEditer');
                }, true);
                /* save button: Save user info and data*/
                _.Event(children[1], 'click', () => {

                    indexID++/*incriment indexID to generate new ID for newly added elements*/

                    _.Select('.elEditer').classList.remove('close_elEditer');
                    /*collect text info: create new element*/
                    class elmentData {
                        constructor(text, elementType, index) {
                            this.text = text;
                            this.elementType = elementType;
                            this.index = index;
                        }
                        draw() {
                            let children = [...this.text];
                            let TextData = [];

                            for (i = 0; i < children.length; i++) {
                                TextData.push(children[i].value);
                            }
                            let EditorElemnt = {
                                Index: indexID,
                                Type: this.elementType,
                                textContent: TextData,
                            }
                            this.SaveDataToDataBase(EditorElemnt);
                            this.DrawHTML_Element();
                        }
                        SaveDataToDataBase(EditorElemnt) {
                            /* Save new data.*/
                            _.DB.Create(`HTMLElment${indexID}`, JSON.stringify(EditorElemnt));
                            // save current number.
                            _.DB.Create('currentNum', indexID);
                        }
                        DrawHTML_Element() {
                            /*Draw HTML content
                             * this algorithym searches throw thie thie aataBase and collects all stored elements --
                             * so as to feed them in thie main element drower function.
                             */

                            LastInt = JSON.parse(_.DB.Get('currentNum'));
                            CurrentElement = JSON.parse(_.DB.Get(`HTMLElment${parseInt(LastInt)}`));

                            /*
                             * element filter algorythim:
                             * collects elements info from dataBase and sorts them according to there types
                             * inorder to assign propertites to the element drawer function
                             */
                            if (CurrentElement) {
                                /*skips null elements stored in thie dataBase.*/
                                switch (parseInt(CurrentElement.Type)) {
                                    case 0:
                                        let stracture = {
                                            Type: parseInt(CurrentElement.Type),
                                            index: CurrentElement.Index,
                                            Header: CurrentElement.textContent[0],
                                            Content: CurrentElement.textContent[1],
                                            DrawHTMLElement: () => {
                                                HTML_ElementDrower(stracture.Header, false, stracture.Content, stracture.Type, stracture.index);
                                            }
                                        };
                                        stracture.DrawHTMLElement();
                                        break;
                                    case 1:
                                        let stracture2 = {
                                            Type: parseInt(CurrentElement.Type),
                                            index: CurrentElement.Index,
                                            Header: CurrentElement.textContent[0],
                                            SubHeader: CurrentElement.textContent[1],
                                            Content: CurrentElement.textContent[2],
                                            DrawHTMLElement: () => {
                                                HTML_ElementDrower(stracture2.Header, stracture2.SubHeader, stracture2.Content, stracture2.Type, stracture2.index);
                                            }
                                        };
                                        stracture2.DrawHTMLElement();
                                        break;
                                }
                            } else {
                                _.Print('null object detected');
                            }

                        }

                    }

                    let mainParent = _.Select('.elEditer .elEditer_main');
                    let dataChart = new elmentData(mainParent.children, indicator[1]);
                    dataChart.draw();
                }, true);
            })();
        })();
    },
    ImageContralPack: function () { /*New Image editing Fuction*/
        /*Image collection*/
        let imgtagged = _.GetTAG('img'), imgDivbg = _.Select('div', true);

        /*Manipulating imgies: changing directory*/
        let ImageManipulator = {
            ImageEditerContrals: function (Parent) {
                _.Event('.IMG-footer .save', 'click', function () { /* saving image data contral informantion*/
                    Parent.removeChild(_.Select('.ImageEditContainer'));
                });
                /*Cancle Session*/
                _.Event('.IMG-footer .cancle', 'click', function () {
                    let child = _.Select('.ImageEditContainer');
                    Parent.removeChild(child);
                    /* create a fall back, remove current image and insert old one */
                    let current = JSON.parse(_.DB.Get('current'));
                    let getCurrentelement = JSON.parse(_.DB.Get(`${current.data}`));
                    let getBackUpImage = JSON.parse(_.DB.Get(`BackUp-${current.data}`));

                    if (getCurrentelement.NewImage) {
                        getCurrentelement.NewImage = getBackUpImage.NewImage;
                        _.DB.Edit(`${current.data}`, JSON.stringify(getCurrentelement));

                        db.collection(`${current.data}`).doc(`${current.data}`).update({
                            data: getCurrentelement
                        });
                    } else {
                        _.Print(false);
                    }
                });
                _.Each(".drop-zone__input", (inputElement) => {
                    const dropZoneElement = inputElement.closest(".drop-zone");

                    _.Event(dropZoneElement, "click", (e) => {
                        inputElement.click();
                    }, true);
                    _.Event(inputElement, "change", (e) => {
                        if (inputElement.files.length) {
                            updateThumbnail(dropZoneElement, inputElement.files[0]);
                        }
                    }, true);
                    _.Event(dropZoneElement, "dragover", (e) => {
                        e.preventDefault();
                        dropZoneElement.classList.add("drop-zone--over");
                    }, true);
                    ["dragleave", "dragend"].forEach((type) => {
                        dropZoneElement.addEventListener(type, (e) => {
                            dropZoneElement.classList.remove("drop-zone--over");
                        });
                    });
                    _.Event(dropZoneElement, "drop", (e) => {
                        e.preventDefault();

                        if (e.dataTransfer.files.length) {
                            inputElement.files = e.dataTransfer.files;
                            updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
                        }

                        dropZoneElement.classList.remove("drop-zone--over");
                    }, true);
                });
                function updateThumbnail(dropZoneElement, file) {
                    let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

                    /* First time - remove the prompt*/
                    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
                        dropZoneElement.querySelector(".drop-zone__prompt").remove();
                    }
                    /* First time - there is no thumbnail element, so lets create it*/
                    if (!thumbnailElement) {
                        thumbnailElement = document.createElement("div");
                        thumbnailElement.classList.add("drop-zone__thumb");
                        dropZoneElement.appendChild(thumbnailElement);
                    }

                    thumbnailElement.dataset.label = file.name;

                    /* Show thumbnail for image files*/
                    if (file.type.startsWith("image/")) {
                        const reader = new FileReader();

                        reader.readAsDataURL(file);
                        reader.onload = () => {
                            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
                            /* storeImageData */
                            (function CollectImageData() {
                                for (i = 0; i < localStorage.length; i++) {
                                    if (localStorage.key(i) == 'current') {
                                        let keyHolder = _.DB.Get(`${localStorage.key(i)}`);
                                        let currentInfoInObjectForm = JSON.parse(_.DB.Get(`${localStorage.key(i)}`));
                                        let getImageId = JSON.parse(_.DB.Get(`${currentInfoInObjectForm.data}`));
                                        getImageId.NewImage = reader.result;
                                        /* for thie backUpFunction: incae thie image isnt saved*/
                                        _.DB.Create(`${getImageId.data}`, JSON.stringify(getImageId));

                                        /* Listen and store imageDATA*/
                                        db.collection(`${getImageId.data}`).doc(`${getImageId.data}`).update({
                                            NewImage: reader.result,
                                        }).then(function () {
                                            _.Print('New Image added to dataBase');
                                        }).catch(function () {
                                            _.Print('Error somehting went wrong, operation termnated');
                                        });
                                        alert('Changes will be made after Saving');
                                    }
                                }
                            })();
                        };
                    } else {
                        thumbnailElement.style.backgroundImage = null;
                    }
                }
            },
            ImageEditContainer: function (Parent, Image_Child) {
                return _.Event('.imgBrow', 'click', () => {
                    let Container = _.HTMLcreate('div');
                    Container.className = 'ImageEditContainer';
                    Parent.appendChild(Container);
                    Container.innerHTML = `
                    <div class="IMG-edtContainer">
                    <div class="IMG-TopBar">
                       <div class="IMG-row" id="IG-header">FLUID-EDITOR</div>
                    </div>
                    <div class="IMG-Body">
                    <div class="drop-zone">
                    <span class="drop-zone__prompt">Drop file here or click to upload</span>
                    <input type="file" name="myFile" class="drop-zone__input">
                  </div>
                    </div>
                    <div class="IMG-footer">
                    <div class="IMG-Upload save">Save</div>
                    <div class="IMG-Upload cancle">Cancle</div>
                    </div>
                    </div>db
                    `;
                    ImageManipulator.ImageEditerContrals(Parent);
                    (function getKey() {
                        /* collect key data as Id and store it */
                        let keyData = { data: Image_Child, };
                        let current = { data: Image_Child, };
                        /* CreateKey store into fireStore*/

                        _.DB.Create(`${Image_Child}`, JSON.stringify(keyData));
                        _.DB.Create('current', JSON.stringify(current));

                        /* DataListener {listen for data change and updates};*/
                        /* listent and store keyData.*/
                        // db.collection(`${Image_Child}`).doc(`${Image_Child}`).set({
                        //     data: Image_Child,
                        // }).then(() => {
                        //     _.Print('Key was added sucessfully');
                        // }).catch(() => {
                        //     _.Print('Erorr ckey was never added');
                        // });

                        // /* Listen and store CurentImaage*/
                        // db.collection('current').doc('current').set({
                        //     data: Image_Child
                        // }).then(() => {
                        //     _.Print('Current image stored succesfully');
                        // }).catch(() => {
                        //     _.Print('Erorr current Image wasn\'t stored');
                        // });

                    })();
                });
            },
            IMG_Button_Edit_Selector(Iteration, relative = false, child) {
                if (Iteration.className !== 'FluidIMG') {
                    return (function UI() {
                        /*Edit buttons*/
                        let EditButtons = _.HTMLcreate('div');
                        EditButtons.className = 'ImageEditButtons';
                        let wraper = Iteration.parentNode;
                        wraper.appendChild(EditButtons);
                        relative ? wraper.style.position = 'relative' : null;
                        Content = `
                            <div class="imgBrow">
                              Change Image
                            </div>
                            `;
                        EditButtons.innerHTML = Content;
                        /* Cllick events */
                        ImageManipulator.ImageEditContainer(Iteration.parentNode, child);

                    })();
                }
            },
            TaggedImagies: function () { /*img tags*/
                /*  get | update src*/
                let bounder = _.Select('button', true);
                for (t = 0, b = 0; t < imgtagged.length, b < bounder.length; t++, b++) {
                    if (imgtagged[t]) {
                        imgtagged[t].className !== 'FluidIMG' ?
                            (function UI() {
                                imgtagged[t].style.border = `${3}px dotted #19f`;
                                imgtagged[t].style.padding = `${5}px`;
                                imgtagged[t].style.borderRadius = `${20}px`;
                                ImageManipulator.IMG_Button_Edit_Selector(imgtagged[t], true, imgtagged[t].id);
                                /* get and inject ID into dataBase */
                            })() : null;
                    }
                }
            },
            DivWithBackgroundImage: function () { /*Div with css property: background-image*/
                for (i = 0; i < imgDivbg.length; i++) {
                    const identifier = imgDivbg[i].style;
                    if (identifier.backgroundImage) {
                        ImageManipulator.IMG_Button_Edit_Selector(imgDivbg[i], false, imgDivbg[i].id);
                    }
                }
            }
        }; ImageManipulator.TaggedImagies(); ImageManipulator.DivWithBackgroundImage();
    },
    Editing: function () { /*helps with editing and adding edditing styles to the website*/
        let DOMElements = [
            ..._.Select('li', true), ..._.Select('p', true), ..._.Select('h1', true), ..._.Select('h2', true),
            ..._.Select('h3', true), ..._.Select('h4', true), ..._.Select('span', true)];

        for (i = 0; i < DOMElements.length; i++) {
            if (DOMElements[i].id != 'FlMelement') {
                /* if (DOMElements[i].parentNode.className)*/
                function errorCheckPassed() {
                    DOMElements[i].style.border = `${1}px dotted #19f`;
                    DOMElements[i].style.margin = `${10}px`;
                    DOMElements[i].style.borderStyle = `ridge`;
                    DOMElements[i].style.borderRadius = `${5}px`;
                    DOMElements[i].style.textAlign = 'center';
                    DOMElements[i].classList.add('TrigerStyles');
                }

                let lengthitm = DOMElements[i].innerText;
                if (lengthitm.length !== 0) errorCheckPassed(); /*console.log('Element passed with (0)😄😄🤗 errors')*/;

                DOMElements[i].addEventListener('click', ElementFilter, false);
                /* console.log(DOMElements)*/
                function ElementFilter(e) {
                    let EditorTextBox = _.Select('.EditorTextBox'),
                        textboxeditor = _.Select('.textboxeditor'),
                        EditBoxButtons = _.Select('.changeButton'),
                        exitbutton = _.Select('.exitbutton'),
                        shadowDroper = _.Select('.shadowDroper');

                    /* collecting all informantion about thie current elements*/
                    let DOMelement = e.target,
                        DOMfilter = [],
                        filtered = DOMfilter.push(DOMelement);

                    /* user :: changing and manipulating elements */
                    /* drawing thie text box*/
                    EditorTextBox.classList.add('dropBox');
                    shadowDroper.classList.add('Shadow');
                    textboxeditor.value = DOMfilter[0].innerText;
                    textboxeditor.offsetTop = DOMfilter[0].offsetTop;
                    console.log(textboxeditor.offsetTop);

                    /*button functionality*/
                    shadowDroper.addEventListener('click', function () {
                        shadowDroper.classList.remove('Shadow');
                        EditorTextBox.classList.remove('dropBox');
                        delete DOMfilter[0];
                    });
                    EditBoxButtons.addEventListener('click', function (click) {

                        function SkipErrorMaasge() {
                            storeDataToDataBase()
                            DOMfilter[0].innerText = textboxeditor.value;
                            DOMfilter[0].classList.toggle('ActiveBorderStyle');

                            textboxeditor.value = '';
                            EditorTextBox.classList.remove('dropBox');
                            shadowDroper.classList.remove('Shadow');
                            delete DOMfilter[0];
                        }
                        /* fitlters undifined elements from dfined elements.*/
                        DOMfilter[0] != undefined ? SkipErrorMaasge() : null;
                    });

                    function storeDataToDataBase() {
                        let elementData = {
                            status: false,
                            ElementID: DOMfilter[0].id,
                            newData: textboxeditor.value
                        };
                        const id = elementData.ElementID;

                        localStorage.setItem(`${elementData.ElementID}`, JSON.stringify(elementData));
                    }
                    /* thie exit button :: clears thie input elements */
                    exitbutton.addEventListener('click', function () {
                        EditorTextBox.classList.remove('dropBox');
                        shadowDroper.classList.remove('Shadow');

                        delete DOMfilter[0];
                    });
                }
            }
        }
    },
    UserAccountContral: function () { /*Handles the main app UI  */

        (function AccountContoller() {

            /*injecting thie DOM with thie html automaticallybto help make thie website more responsive and fast*/
            let AppElements = document.querySelector('.EditorApplicationDrower');
            let GetData = `<!-- main content window for thie editor --><div class="elementDrawerContainer"><div class="eleHeader">Choose any style by tapping on it</div><div class = "ChooseElement"><div class="el 0"><svg id="b41ad712-bfba-46e5-afc3-13e032690e6e" data-name="Layer 1" xmlns="http:/*www.w3.org/2000/svg" viewBox="0 0 988 629"><defs><style>.bcf303d2-70e4-4005-9025-74d4af88c324{fill:#ebe1ff;}.a67e735b-90c1-472c-aa70-d1e9fe8e4ba4{font-size:52px;font-family:MSReferenceSansSerif, MS Reference Sans Serif;}.a14041e7-ff4e-44b7-a6c2-ef63a47195fa{letter-spacing:-0.14em;}.aa49096c-e4c4-4d60-bcfd-9b7c05850b69{font-size:32px;fill:#515050;font-family:MyriadPro-Regular, Myriad Pro;}.aff0bb16-61a9-45f8-86f9-953bb9cd5a31{letter-spacing:-0.01em;}.a126e9d8-1db6-4ee8-9d96-a799ea0b9446{letter-spacing:-0.01em;}.ea7c3306-6b5b-420a-8ba4-9bd6768a2acd{letter-spacing:0em;}.b1dabdfc-40d9-4ba8-a1cb-503d1a0f449c{letter-spacing:-0.01em;}.ada4a532-f183-4dbb-86de-b3b84a0dd36a{letter-spacing:0.01em;}.efe7a5ed-15ff-4826-8064-0023851168fa{letter-spacing:-0.01em;}.b8a04d73-f0ba-4db5-8898-8633aed20b37{letter-spacing:-0.01em;}.b129b1a0-b157-40c2-8e3e-34b4ff4caf93{letter-spacing:0em;}.e6f0598f-3245-48f5-a1e2-24eab14d6db7{letter-spacing:-0.01em;}.ab2e10ab-13db-4bbd-9859-f6d95dc680d6{letter-spacing:-0.01em;}.b081e872-5ffb-4b21-b4cb-a3236d1d1a2e{letter-spacing:0em;}.ba78e84e-8523-4077-b771-317e6fb632cf{letter-spacing:-0.01em;}.e8c339a9-4d64-4a37-a7c4-0350f1b5d88d{letter-spacing:0em;}.a0a3e27c-4fd8-459e-8fa2-a2327c20347f{letter-spacing:0em;}.e757e2d1-fbda-457f-9f5e-4b50ad41bf6f{letter-spacing:0em;}</style></defs><rect class="bcf303d2-70e4-4005-9025-74d4af88c324" width="988" height="629" rx="34.21"/><text class="a67e735b-90c1-472c-aa70-d1e9fe8e4ba4" transform="translate(384.43 157.64)">Heade<tspan class="a14041e7-ff4e-44b7-a6c2-ef63a47195fa" x="164.66" y="0">r</tspan><tspan x="179.49" y="0">.</tspan></text><text class="aa49096c-e4c4-4d60-bcfd-9b7c05850b69" transform="translate(57.29 285.79)"><tspan class="aff0bb16-61a9-45f8-86f9-953bb9cd5a31">L</tspan><tspan x="14.66" y="0">o</tspan><tspan class="a126e9d8-1db6-4ee8-9d96-a799ea0b9446" x="32.22" y="0">r</tspan><tspan x="42.37" y="0">em ipsum dolor sit ame</tspan><tspan class="ea7c3306-6b5b-420a-8ba4-9bd6768a2acd" x="355" y="0">t</tspan><tspan x="365.5" y="0">, </tspan><tspan class="b1dabdfc-40d9-4ba8-a1cb-503d1a0f449c" x="378.91" y="0">c</tspan><tspan x="393.05" y="0">onse</tspan><tspan class="ada4a532-f183-4dbb-86de-b3b84a0dd36a" x="457.08" y="0">c</tspan><tspan class="efe7a5ed-15ff-4826-8064-0023851168fa" x="471.83" y="0">t</tspan><tspan x="482.23" y="0">etuer adipiscing eli</tspan><tspan class="ea7c3306-6b5b-420a-8ba4-9bd6768a2acd" x="734.42" y="0">t</tspan><tspan x="744.92" y="0">, sed </tspan><tspan x="0" y="38.4">diam nonum</tspan><tspan class="b8a04d73-f0ba-4db5-8898-8633aed20b37" x="171.84" y="38.4">m</tspan><tspan x="198.11" y="38.4">y nibh euismod tincidu</tspan><tspan class="b129b1a0-b157-40c2-8e3e-34b4ff4caf93" x="504.22" y="38.4">n</tspan><tspan x="521.85" y="38.4">t ut lao</tspan><tspan class="e6f0598f-3245-48f5-a1e2-24eab14d6db7" x="614.78" y="38.4">r</tspan><tspan x="624.92" y="38.4">eet dolo</tspan><tspan class="ab2e10ab-13db-4bbd-9859-f6d95dc680d6" x="735.09" y="38.4">r</tspan><tspan class="b081e872-5ffb-4b21-b4cb-a3236d1d1a2e" x="745.24" y="38.4">e ma</tspan><tspan class="ba78e84e-8523-4077-b771-317e6fb632cf" x="810.16" y="38.4">g</tspan><tspan x="827.86" y="38.4">na </tspan><tspan x="0" y="76.8">aliquam e</tspan><tspan class="e8c339a9-4d64-4a37-a7c4-0350f1b5d88d" x="131.04" y="76.8">r</tspan><tspan class="a0a3e27c-4fd8-459e-8fa2-a2327c20347f" x="141.34" y="76.8">a</tspan><tspan x="156.64" y="76.8">t </tspan><tspan class="a126e9d8-1db6-4ee8-9d96-a799ea0b9446" x="174.01" y="76.8">v</tspan><tspan x="189.09" y="76.8">olutp</tspan><tspan class="a0a3e27c-4fd8-459e-8fa2-a2327c20347f" x="260.64" y="76.8">a</tspan><tspan class="ea7c3306-6b5b-420a-8ba4-9bd6768a2acd" x="275.93" y="76.8">t</tspan><tspan x="286.43" y="76.8">. </tspan><tspan class="e757e2d1-fbda-457f-9f5e-4b50ad41bf6f" x="299.84" y="76.8">U</tspan><tspan x="320.67" y="76.8">t wisi enim ad minim </tspan><tspan class="ab2e10ab-13db-4bbd-9859-f6d95dc680d6" x="603.93" y="76.8">v</tspan><tspan class="b081e872-5ffb-4b21-b4cb-a3236d1d1a2e" x="619" y="76.8">eniam, quis </tspan></text></svg></div><div class="el 1"><svg id="ad2672a8-d996-4408-97b5-96dc00533333" data-name="Layer 1" xmlns="http:/*www.w3.org/2000/svg" viewBox="0 0 988 717.57"><defs><style>.b3edd1e2-28fd-452a-a582-9e456a905eb3{fill:#ebe1ff;}.a5612fcd-ebdb-4d0d-b5bf-2129027b7d80{font-size:52px;font-family:MSReferenceSansSerif, MS Reference Sans Serif;}.e5d91d0c-e949-4915-9d1f-bb6782d750a8{letter-spacing:-0.14em;}.a252ac42-3bfe-41d8-a539-f97338f98517{font-size:32px;fill:#515050;}.a252ac42-3bfe-41d8-a539-f97338f98517,.e22e5779-d300-4cf2-a5ba-13c9b6017afc{font-family:MyriadPro-Regular, Myriad Pro;}.e695da97-7081-4f06-846b-f7b3781f83dc{letter-spacing:-0.01em;}.edcd5a94-e1e9-40ae-b1b2-f0a882e25728{letter-spacing:-0.01em;}.bd3076be-891e-4189-a252-5ec560169ae2{letter-spacing:0em;}.f15a4e65-06bb-4da1-92a1-ad5680038c03{letter-spacing:-0.01em;}.a47aa073-6b11-482b-8e2a-eae2bea11184{letter-spacing:0.01em;}.acf63683-c19c-4116-8072-29db2e1baa07{letter-spacing:-0.01em;}.ac6d35c4-8a45-457c-8325-77d1816250ae{letter-spacing:-0.01em;}.b9393245-bba9-4545-a609-acf127225286{letter-spacing:0em;}.f9c02a9e-4e8f-4f8d-b52f-b5c37bf658d1{letter-spacing:-0.01em;}.f97666bb-fee9-4d75-ac0e-90d6e78340eb{letter-spacing:-0.01em;}.b927c781-2ac7-4659-ac73-99d25ad9aa1a{letter-spacing:0em;}.acf604fe-f980-47d3-b152-a24f4ac6fcf2{letter-spacing:-0.01em;}.f8539737-ac6f-4c78-b72c-86c377f8f494{letter-spacing:0em;}.a05f2564-4ff2-462c-97d6-f945b8f63d16{letter-spacing:0em;}.f0af9f96-de81-4097-909f-2b8ecaea1f91{letter-spacing:0em;}.e22e5779-d300-4cf2-a5ba-13c9b6017afc{font-size:36px;}</style></defs><rect class="b3edd1e2-28fd-452a-a582-9e456a905eb3" width="988" height="629" rx="34.21"/><text class="a5612fcd-ebdb-4d0d-b5bf-2129027b7d80" transform="translate(393.43 172.64)">Heade<tspan class="e5d91d0c-e949-4915-9d1f-bb6782d750a8" x="164.66" y="0">r</tspan><tspan x="179.49" y="0">.</tspan></text><text class="a252ac42-3bfe-41d8-a539-f97338f98517" transform="translate(55.29 352.79)"><tspan class="e695da97-7081-4f06-846b-f7b3781f83dc">L</tspan><tspan x="14.66" y="0">o</tspan><tspan class="edcd5a94-e1e9-40ae-b1b2-f0a882e25728" x="32.22" y="0">r</tspan><tspan x="42.37" y="0">em ipsum dolor sit ame</tspan><tspan class="bd3076be-891e-4189-a252-5ec560169ae2" x="355" y="0">t</tspan><tspan x="365.5" y="0">, </tspan><tspan class="f15a4e65-06bb-4da1-92a1-ad5680038c03" x="378.91" y="0">c</tspan><tspan x="393.05" y="0">onse</tspan><tspan class="a47aa073-6b11-482b-8e2a-eae2bea11184" x="457.08" y="0">c</tspan><tspan class="acf63683-c19c-4116-8072-29db2e1baa07" x="471.83" y="0">t</tspan><tspan x="482.23" y="0">etuer adipiscing eli</tspan><tspan class="bd3076be-891e-4189-a252-5ec560169ae2" x="734.42" y="0">t</tspan><tspan x="744.92" y="0">, sed </tspan><tspan x="0" y="38.4">diam nonum</tspan><tspan class="ac6d35c4-8a45-457c-8325-77d1816250ae" x="171.84" y="38.4">m</tspan><tspan x="198.11" y="38.4">y nibh euismod tincidu</tspan><tspan class="b9393245-bba9-4545-a609-acf127225286" x="504.22" y="38.4">n</tspan><tspan x="521.85" y="38.4">t ut lao</tspan><tspan class="f9c02a9e-4e8f-4f8d-b52f-b5c37bf658d1" x="614.78" y="38.4">r</tspan><tspan x="624.92" y="38.4">eet dolo</tspan><tspan class="f97666bb-fee9-4d75-ac0e-90d6e78340eb" x="735.09" y="38.4">r</tspan><tspan class="b927c781-2ac7-4659-ac73-99d25ad9aa1a" x="745.24" y="38.4">e ma</tspan><tspan class="acf604fe-f980-47d3-b152-a24f4ac6fcf2" x="810.16" y="38.4">g</tspan><tspan x="827.86" y="38.4">na </tspan><tspan x="0" y="76.8">aliquam e</tspan><tspan class="f8539737-ac6f-4c78-b72c-86c377f8f494" x="131.04" y="76.8">r</tspan><tspan class="a05f2564-4ff2-462c-97d6-f945b8f63d16" x="141.34" y="76.8">a</tspan><tspan x="156.64" y="76.8">t </tspan><tspan class="edcd5a94-e1e9-40ae-b1b2-f0a882e25728" x="174.01" y="76.8">v</tspan><tspan x="189.09" y="76.8">olutp</tspan><tspan class="a05f2564-4ff2-462c-97d6-f945b8f63d16" x="260.64" y="76.8">a</tspan><tspan class="bd3076be-891e-4189-a252-5ec560169ae2" x="275.93" y="76.8">t</tspan><tspan x="286.43" y="76.8">. </tspan><tspan class="f0af9f96-de81-4097-909f-2b8ecaea1f91" x="299.84" y="76.8">U</tspan><tspan x="320.67" y="76.8">t wisi enim ad minim </tspan><tspan class="f97666bb-fee9-4d75-ac0e-90d6e78340eb" x="603.93" y="76.8">v</tspan><tspan class="b927c781-2ac7-4659-ac73-99d25ad9aa1a" x="619" y="76.8">eniam, quis </tspan></text><text class="e22e5779-d300-4cf2-a5ba-13c9b6017afc" transform="translate(60.93 277.79)">Sub Header</text></svg></div></div><div class="elEditer"><div class="elEditer_Header">Simple Post</div><div class="elEditer_main"></div><div class="elEditer_footer"><button>Cancle</button><button>Add</button></div></div><div class ='EditorDrowerfooter'><div class='Credit'>designed by <a href='https:/*katoisa256.ga'>Katoisa256</a></div><div class='exit'>Exit</div></div></div></div><div class="editorContent"><div class="FlMSideBar"><h4 id="FlMelement">Edit Mode ACtive</h4><ul><li class="Save" id="FlMelement">Save</li><li class="AddElement" id="FlMelement">Add element</li></ul></div><div class='shadowDroper'></div><div class='EditorTextBox'><div class='EditBoxButtons'><button class='changeButton'><img width="40" class="FluidIMG" src="./FluidManager/icons/OK.gif" alt="OK"></button><button class='exitbutton'><img class="FluidIMG" width="40" src='./FluidManager/icons/cancle.gif' alt='exit'></button></div><div class='EditTextArea'><textArea class='textboxeditor'></textArea></div></div><div class="SectionContral"><div class="ToggleEditMode"><span></span><span></span><span></span></div><div class="AppHeader"></div></div></div><!-- thie main contnent window for thie website viewer --><div class="webisteView"></div><div class="Footer"> </div><!-- <a href="./main.html"></a> -->`;

            function Saving_website_data() {
                let websiteData = {
                    poupWindow: function (massage, status, webPage) {
                        let create = document.createElement('div');
                        create.className = 'PopUpWindow';
                        _.Select('.AppHeader').appendChild(create);
                        create.innerHTML = `
                          <style>
                          .data{
                              font-familly:"Roboto", sans-serif;
                              font-size: 18px;
                              color: #575555;
                              width: 50%;
                              background:#fff;
                              margin:auto;
                              padding:10px;
                              margin-top: 20px!important;
                              border-top: 15px solid ${status};
                              box-shadow: 3px 3px 20px 2px rgba(0,0,0,0.5);
                          }
                          .data button{
                            font-family: "Roboto", sans-serif;font-weight: 500;font-size: 14px;letter-spacing: 1px;
                            display: inline-block;padding: 10px 30px;border-radius: 4px;transition: 0.5s;line-height: 1;
                            color: #fff;background: #19f;width: fit-content;border:none;outline: none;transition: all .5s ease-in-out;}
                          </style>

                          <div class='data'>
                          <p>${massage}</p>
                          <a href='${webPage}'><button class='submit'>OK</button></a>
                          </div>
                        `;
                        create.style.textAlign = 'center';
                        create.style.top = `${0}px`;
                        create.style.left = `${0}%`;
                        create.style.zIndex = `${2000}`;
                        create.style.position = 'fixed';
                        create.style.width = `${100}vw`;
                        create.style.height = `${100}vh`;

                        let togglePopUpWindow = _.Select('.PopUpWindow');
                        _.Select('.submit').addEventListener('click', function () {
                            _.Select('.AppHeader').removeChild(togglePopUpWindow);
                        });
                    },
                    Saving_Data: function () {
                        let savingButton = _.Select('.Save')
                        savingButton.addEventListener('click', function () {/*saving button*/
                            websiteData.poupWindow('All the changes you made will be saved.', '#34fd02d5', 'index.html');
                        });

                        _.Event('.ToggleEditMode', 'click', () => {
                            _.Select('.FlMSideBar').classList.toggle('addWidth');
                        });
                    },
                }
                websiteData.Saving_Data();
            }

            let ElinyaEkulu = 'Kijura', indexPass = 'kijura@2021';

            let Name = _.Select('.UserName'), Password = _.Select('.UserPassword'), LogInButton = _.Select('#sign-up'), Ebuttons = _.Select('.Ebuttons'), errormassage = _.Select('.errormassage');
            errormassage.innerHTML = ' '; Name.value = ''; Password.value = ''; Name.style.transition = `${0.1}s all`; Password.style.transition = `${0.1}s all`;

            LogInButton.addEventListener('click', function () {
                if (Name.value == ElinyaEkulu) {
                    Name.style.borderLeft = `${2}px solid green`;
                    Name.style.color = `green`;
                };
                if (Password.value == indexPass) {
                    Password.style.borderLeft = `${2}px solid green`;
                    Password.style.color = `green`;
                    Password.type = 'password';
                };
                if (Name.value !== ElinyaEkulu) {
                    /* error.innerText += ' name incorect';*/
                    Name.style.borderLeft = `${2}px solid red`;
                    Name.style.borderBottom = `${2}px solid red!important`;
                    Name.style.color = `red`;
                    Name.placeHolder = 'User Name Is Incorect';
                }
                if (Password.value !== indexPass) {
                    Password.style.borderLeft = `${2}px solid red`;
                    Password.style.borderBottom = `${2}px solid red!important`;
                    Password.style.color = `red`;
                    Password.type = 'text';
                    Password.placeHolder = 'Password is incorect';
                };
                Password.addEventListener('focus', function () {
                    Password.type = 'password';
                    Password.value = '';
                });
                Name.addEventListener('focus', function () {
                    Name.style.color = 'green';
                    Name.value = '';
                });
                if (Name.value !== ElinyaEkulu || Password.value !== indexPass) {
                    errormassage.innerHTML = `<div class="error" style="color: red;font-size: 15px;"><tt>Error </tt></div> `
                    Name.value !== ElinyaEkulu && Password.value !== indexPass ? _.Select('.error').innerText += ' Name and password incorect' :
                        Name.value !== ElinyaEkulu ? _.Select('.error').innerText += ' Name incorect' : _.Select('.error').innerText += ' password incorect';
                } else {

                    errormassage.innerHTML = ` <div class="error" style="color: green;font-size: 15px;"><tt>Weclome...</tt></div>`;
                    Ebuttons.innerHTML = `<input type="button" value="log in" id="log-In">`;
                    let loginbutton = _.Select('#log-In');
                    loginbutton.addEventListener('click', function () {
                        _.Select('#OpenButton').style.display = 'none';
                        _.addClass(AppWindow, 'DrowWindow');
                        _.addClass(_.Select('.AppName'), 'Create');
                        _.removeClass(_.Select('#FormContainer'), 'addClass');

                        // _.addClass(_.Select('#header'), 'Hidden');
                        // _.addClass(_.Select('#topbar'), 'THidden');
                        AppElements.innerHTML = GetData;
                        /* _.addClass(_.Select('.hiddenElem'), 'ChangeBody');*/
                        Saving_website_data();
                        APP.Editing();/*Import code from Editing function*/
                        APP.ImageContralPack();/*Import code from imageContral function*/
                        APP.AddElements();/*add element function*/
                    });
                }
            });
        })();
    }
};
APP.loginPopUpWindow();
APP.UserAccountContral();