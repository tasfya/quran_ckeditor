CKEDITOR.dialog.add( 'quranDialog', function ( editor ) {
  return {
    title: 'Quran',
    minWidth: 400,
    minHeight: 200,
    contents: [
      {
        id: 'tab-basic',
        label: 'Basic Settings',
        elements: [{
                    // UI elements of the first tab will be defined here.
                    type: 'text',
                    id: 'quran',
                    label: 'Fill the number of Ayat preceded with the number of Sura, ie: 4:3-9',
                    validate: CKEDITOR.dialog.validate.notEmpty( "Abbreviation field cannot be empty." )
                  }]
      },
    ],
  };
});
