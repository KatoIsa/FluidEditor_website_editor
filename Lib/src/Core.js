/*
 File contains algorithym that chages and edits all content in the page.
 Like
 It besically manipulates the DOM.
       Author: Kato-Isa-Omoding
       Website: https:/*katoisa256.ga
*/

/* function adds html objects on the website.*/
(function DRAWHTMLELEMENTS() {
    
    /* re-usable function for creating different html elements.*/
    function HTML_ElementDrower(Header, SubHeader = false, Content, Type, index) {
        /* store inner contents of target html element*/
        let elements = [
            `<h2>${Header}</h2><p style="text-align: justify;">${Content}</p>`,
            `<h2>${Header}</h2><h3>${SubHeader}</h3><p style="text-align: justify;">${Content}</p>`
        ];

        let Parent = _.HTMLcreate('div');
        Parent.className = 'section-title';
        Parent.innerHTML = elements[Type];
        let AppendParent = _.Select('.ElementParent .allcontents');
        Parent.id = `NewElement${index}`;
        AppendParent.appendChild(Parent);
    }

    /*Handles element drawing.*/
    (function ElementDrawingAlgorithym() {
        let CurrentNoOfElements = JSON.parse(_.DB.Get('currentNum'));
        CurrentNoOfElements ?
            (() => {
                for (i = 0; i <= CurrentNoOfElements; i++) {
                    let Elements = JSON.parse(_.DB.Get(`HTMLElment${parseInt(i)}`));

                    /*
                     * element filter algorythim:
                     * collects elements info from dataBase and sorts it according to its type
                     * inorder to assign propertites to the element drawer function
                     */
                    if (Elements) { /*skips null elements stored in thie dataBase.*/
                        switch (parseInt(Elements.Type)) {
                            case 0:
                                let stracture = {
                                    Type: parseInt(Elements.Type),
                                    index: Elements.Index,
                                    Header: Elements.textContent[0],
                                    Content: Elements.textContent[1],
                                    DrawHTMLElement: () => {
                                        HTML_ElementDrower(stracture.Header, false, stracture.Content, stracture.Type, stracture.index);
                                    }
                                };
                                stracture.DrawHTMLElement();
                                break;
                            case 1:
                                let stracture2 = {
                                    Type: parseInt(Elements.Type),
                                    index: Elements.Index,
                                    Header: Elements.textContent[0],
                                    SubHeader: Elements.textContent[1],
                                    Content: Elements.textContent[2],
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
            })() : _.Print('No elements stored');

    })(); /*End of function*/
})();


const db = firebase.firestore();
/*array constaining all html tags except the image tags.*/
let ele = [
    ..._.Select('li', true), ..._.Select('p', true), ..._.Select('h1', true), ..._.Select('h2', true),
    ..._.Select('h3', true), ..._.Select('h4', true), ..._.Select('span', true)];
    
/*Array containing all image properties: to be used in the addmarker algorythm.*/
let websiteImagies = [
    ..._.Select('img', true), ..._.Select('div', true)
];

/*this adds Id tags to thie filtereed elements in the DOM.*/
(function addMarker() {
    /*element marking algorythm. images(imgTags, divWithBackgroundImage) all other html tags*/
    for (i = 0, img = 0; i < ele.length, img < websiteImagies.length; i++, img++) {
        /*this filters out, empty elements and thie nav bar:*/
        ele[i].innerText.length != 0 && ele[i].offsetTop > 50 ? clearEmptyElements() : null;
        /*For all img elements in thie DOM*/
        websiteImagies[img].tagName == 'img' || websiteImagies[img].tagName == 'IMG' ? InjectIdIntoImage() : null;
        /*For div with background image prototype*/
        websiteImagies[img].style.backgroundImage ? InjectIdIntoDiv() : null;
    }

    /**ID assignment function: inserts an id into the html elements. */
    function clearEmptyElements() {
        let marker = ele[i];
        marker.id += ` marker-${i}`;
    }

    /*for img tagged elements: inserts an id into image tags. */
    function InjectIdIntoImage() {
        let imgMarker = websiteImagies[img];
        imgMarker.id = ` imgMarker-${img}`;
    }

    /*for divs with background-imges: inserts an image id into divs with an image background. */
    function InjectIdIntoDiv() {
        let imgMarker = websiteImagies[img];
        imgMarker.id = ` imgMarker-${img}`;
    }
})();

/*Objects contains methods that sheep data from local storage to firebase*/
let retrive = {
    /*Saves text data to local storage.*/
    send_WriteToDataBase: function () {
        for (i = 0; i < ele.length; i++) {
            ele[i].innerText.length != 0 && ele[i].offsetTop > 50 ? emptyele() : null
            function emptyele() {
                let elementData = {
                    status: false,
                    ElementID: ele[i].id,
                    newData: ele[i].innerText
                }
                localStorage.setItem(`${elementData.ElementID}`, JSON.stringify(elementData));
            }
        }
    },

    /*retrives data from dataBase and writes to website*/
    get_writeToWebsite: function () {
        for (i = 0, img = 0; i < ele.length, img < websiteImagies.length; i++, img++) {
            ele[i].innerText.length != 0 && ele[i].offsetTop > 50 ? StartWriting() : null;

            //dealing with text documents
            function StartWriting() {
                db.collection(`${ele[i].id}`).doc(`${ele[i].id}`).get().then(function (doc) {
                    /* injecting data into localStorage.*/
                    _.DB.Create(doc.data().ElementID, JSON.stringify(doc.data()));
                }).catch(function (error) {
                    _.Print("couldn't retrieve data from dataBase: Core.js", error);
                });

                let database_pull = JSON.parse(_.DB.Get(ele[i].id));

                if (database_pull === null) {
                    /* alert('initializing site ....'); */
                } else {
                    /* writing to website: changing website text data.*/
                    database_pull.newData = ele[i].innerText ? ele[i].innerText = database_pull.newData : null;
                }
            }

            /*dealing with images that contain tags*/
            (function imagesWithTag() {
                /* currentSrc */
                websiteImagies[img].tagName == 'img' || websiteImagies[img].tagName == 'IMG' ?
                    (() => {
                        /*collects data from dataBase*/
                        async function CollectDataFromDataBase() {
                            /* inject data into dataBase.*/
                            return db.collection(`${websiteImagies[img].id}`).doc(`${websiteImagies[img].id}`).get().then(
                                function (doc) {
                                    let elementData = doc.data();
                                    _.DB.Create(`${elementData.data}`, JSON.stringify(elementData)), _.Print('Wait for data to load');
                                }).catch(function () {
                                    _.Print('Something went wrong couldnt write to LocalStorage: Core.js line -- 175');
                                });
                        };

                        /*Function executes once all data has been retrieved from thie dataBase*/
                        async function writeDataToWebsite() {
                            await CollectDataFromDataBase();
                            _.Print('Function finished executing');
                            let GetNewImageData = JSON.parse(_.DB.Get(`${websiteImagies[img].id}`));

                            if (GetNewImageData = undefined) { /* Catch and detect null values*/
                                if (GetNewImageData.NewImage) { /*catch and detect udefined values*/
                                    websiteImagies[img].src = GetNewImageData.NewImage;

                                    /*  new object to backUp-ImageData*/
                                    db.collection(`BackUp-${websiteImagies[img].id}`).doc(`BackUp-${websiteImagies[img].id}`).set({
                                        NewImage: GetNewImageData.NewImage,
                                        data: websiteImagies[img].id
                                    });

                                    /* write to localStorage. */
                                    db.collection(`BackUp-${websiteImagies[img].id}`).doc(`BackUp-${websiteImagies[img].id}`).get().then(
                                        function (doc) {
                                            let backedUpImage = doc.data();
                                            _.DB.Create(`BackUp-${backedUpImage.data}`, JSON.stringify(backedUpImage));
                                        }
                                    ).catch(function () {
                                        _.Print('could not save element to local storage---- line 113')
                                    });

                                } else {
                                    let backUpImage = JSON.parse(_.DB.Get(`BackUp-${websiteImagies[img].id}`));

                                    websiteImagies[img].src = backUpImage.NewImage
                                }
                            } else {
                                console.warn('Image(s) missing: website doesn\'t have  images');
                            }
                        } writeDataToWebsite();
                    })() : null;
            }
            )();

            /*dealing with div elements with background images*/
            (function divWithBg() {
                const identifier = websiteImagies[img].style;

                /*background-image*/
                identifier.backgroundImage ?
                    (() => {
                        /* inject data into dataBase. */
                        async function CollectDataFromDataBase() {
                            return db.collection(`${websiteImagies[img].id}`).doc(`${websiteImagies[img].id}`).get().then(
                                function (doc) {
                                    let elementData = doc.data();
                                    _.DB.Create(`${elementData.data}`, JSON.stringify(elementData));
                                }
                            ).catch(function () {
                                _.Print('Something went wrong couldn\'t write to LocalStorage line -- 140');
                            });
                        }

                        async function loadDataIntoDtaBase() {
                            await CollectDataFromDataBase();
                            _.Print('Function just finished executing');
                            let GetNewImageData = JSON.parse(_.DB.Get(`${websiteImagies[img].id}`));

                            if (GetNewImageData = undefined) {
                                if (GetNewImageData.NewImage) {
                                    websiteImagies[img].style.backgroundImage = `url(${GetNewImageData.NewImage})`;

                                    /*  new object to backUp-ImageData*/
                                    db.collection(`BackUp-${websiteImagies[img].id}`).doc(`BackUp-${websiteImagies[img].id}`).set({
                                        NewImage: GetNewImageData.NewImage,
                                        data: websiteImagies[img].id
                                    });

                                    /* write to localStorage. */
                                    db.collection(`BackUp-${websiteImagies[img].id}`).doc(`BackUp-${websiteImagies[img].id}`).get().then(
                                        function (doc) {
                                            let backedUpImage = doc.data();
                                            _.DB.Create(`BackUp-${backedUpImage.data}`, JSON.stringify(backedUpImage));
                                        }).catch(function () {
                                            _.Print('could not save element to local storage')
                                        });
                                } else {
                                    let backUpImage = JSON.parse(_.DB.Get(`BackUp-${websiteImagies[img].id}`));
                                    websiteImagies[img].style.backgroundImage = `url(${backUpImage.NewImage})`;
                                }
                            } else {
                                console.log('demnt there is a lot going on');
                            }
                        } loadDataIntoDtaBase();

                    })() : null;
            })();
        }
    },
}
retrive.get_writeToWebsite();

/*  end 🧐 */
// Dead or silent function: was used to stracture the dataBase.
// function excecutedatabase() {

//     for (i = 0; i < ele.length; i++) {
//         ele[i].innerText.length != 0 && ele[i].offsetTop > 50 ? emptyele() : null
//         function emptyele() {
//             let elementData = {
//                 status: false,
//                 ElementID: ele[i].id,
//                 newData: ele[i].innerText
//             }
//             db.collection(`${elementData.ElementID}`).doc(`${elementData.ElementID}`).set({
//                 newData: elementData.newData,
//                 ElementID: elementData.ElementID
//             }).then(function () {
//                 _.Print('data was successfully saved');
//             }).catch(function (error) {
//                 _.Print('Unable to save data', error);
//             });

//         }
//     }
// }

