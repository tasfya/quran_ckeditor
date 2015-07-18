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

      editor.insertElement(ayat);
      var suraIndex = getSuraIndex(ayateQueryInput);
      var ayatRange = 40;
      $.ajax({
        url: '/bower_components/ckeditor/plugins/quran/quran.xml',
      })
      .done(function(data){
        parseQuranData(data, suraIndex, ayatRange);
      })
      .fail(function(error) {
        console.log(error);
      })
      .always(function() {
        console.log("complete");
      });

    }
  };
  function parseQuranData (quranXml, suraIndex, ayatRange) {

    var aya = getAya(quranXml, suraIndex, 1);
    console.log(aya);
  }
  //helpers
  function getSuraIndex(query){
    var expression = query.split(':');
    return expression[0];
  }
  function getAyatRange(query){
    var expression = query.split(':');
    return expression[1];
  }
  function getAyatRangeStart(ayatRange){
    var expression = query.split('-');
    return expression[0];
  }

  function getAyatRangeEnd(ayatRange){
    var expression = query.split('-');
    return expression[1];
  }

  function getAya(quranXml, suraIndex, ayaIndex){
    return $(quranXml).find("sura[index='" + suraIndex  +"']")
                      .find("aya[index='" + ayaIndex  +"']")
                      .attr('text');
  }

});
