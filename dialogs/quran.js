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
                    label: 'Fill the number of Ayat preceded by the number of Sura, ie: 4:3-9',
                    validate: CKEDITOR.dialog.validate.notEmpty( "Abbreviation field cannot be empty." )
                  }]
      },
    ],
    onOk: function() {

      var dialog = this;
      var ayat = editor.document.createElement( 'span' );

      var ayateQueryInput = dialog.getValueOf( 'tab-basic', 'quran' );
      ayat.setText(ayateQueryInput);
      console.log(ayat);
      editor.insertElement(ayat);
      // $.ajax({
      //   url: '/bower_components/ckeditor/plugins/quran/quran.xml',
      // })
      // .done(function(data) {
      //   console.log($(data).find( "[index='1']" ));
      // })
      // .fail(function(error) {
      //   console.log(error);
      // })
      // .always(function() {
      //   console.log("complete");
      // });

    }
  };
  //helpers
  function getSuraIndex(query){
    var expression = query.split(':');
    return expression[0];
  }
  function getAyatRange(query){
    var expression = query.split(':');
    var ayatRangeExpression = expression[1];
    for (var i = Things.length - 1; i >= 0; i--) {
      Things[i]
    };
  }

});
