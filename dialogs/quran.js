CKEDITOR.dialog.add( 'quranDialog', function ( editor ) {

  var quranDataCache;

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
      }
    ],
    onOk: function() {

      var dialog = this;
      var ayateQueryInput = dialog.getValueOf( 'tab-basic', 'quran' );
      var suraIndex = getSuraIndex(ayateQueryInput);
      var ayatRange = getAyatRange(ayateQueryInput);

      if (!quranDataCached()) {
        fetchQuranData(suraIndex, ayatRange, insertQurantSegment);
      } else {
        getQuranDataFromCache(suraIndex, ayatRange, insertQurantSegment);
      }
    }
  };

  function quranDataCached() {
    return !!quranDataCache;
  }

  function getQuranDataFromCache(suraIndex, ayatRange, callBack) {
    var segmentToInsert = parseQuranData(quranDataCache, suraIndex, ayatRange);
    callBack(segmentToInsert);
  }

  function fetchQuranData(suraIndex, ayatRange, callBack) {

    $.ajax({
      url: CKEDITOR.plugins.getPath('quran')+'quran.xml'
    })
      .done(function(data){
        var segmentToInsert = parseQuranData(data, suraIndex, ayatRange);
        quranDataCache = data;
        callBack(segmentToInsert);
      })
      .fail(function(error) {
        console.log(error);
      })
      .always(function() {

      });
  }

  function insertQurantSegment(segment) {
    var ayatElement = editor.document.createElement( 'span' );
    ayatElement.addClass('ayat');
    ayatElement.setHtml(segment);
    editor.insertElement(ayatElement);
  }

  function parseQuranData (quranXml, suraIndex, ayatRange) {

    var aya, ayat;
    var ayatRangeStart = getAyatRangeStart(ayatRange);
    var ayatRangeEnd = getAyatRangeEnd(ayatRange);

    ayat ='<span style="display:inline-block; text-align:right; direction:rtl;">';
    for (var i = ayatRangeStart; i <= ayatRangeEnd; i++) {
      aya = getAya(quranXml, suraIndex, i);
      ayat += renderAya(aya) +' '+ renderAyaNumber(i) +' ';
    }
    ayat += '</span>';
    return ayat;
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
    var expression = ayatRange.split('-');
    return expression[0];
  }

  function getAyatRangeEnd(ayatRange){
    var expression = ayatRange.split('-');
    return expression[1];
  }

  function getAya(quranXml, suraIndex, ayaIndex){
    return $(quranXml).find("sura[index='" + suraIndex  +"']")
                      .find("aya[index='" + ayaIndex  +"']")
                      .attr('text');
  }

  function renderAya(aya){
    return '<span class="aya">'+ aya +'</span>';
  }

  function renderAyaNumber(number){
    return '<span class="aya-number number-'+ number +'">('+ number +')</span>';
  }

});
