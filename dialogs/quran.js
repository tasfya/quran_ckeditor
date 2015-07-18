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
      var abbr = editor.document.createElement( 'abbr' );

      // abbr.setAttribute( 'title', dialog.getValueOf( 'tab-basic', 'title' ) );
      // abbr.setText( dialog.getValueOf( 'tab-basic', 'abbr' ) );

      // var id = dialog.getValueOf( 'tab-adv', 'id' );
      // if ( id )
      //     abbr.setAttribute( 'id', id );

      // editor.insertElement( abbr );
      var ayate = dialog.getValueOf( 'tab-basic', 'quran' );
      $.ajax({
        url: '/bower_components/ckeditor/plugins/quran/quran.xml',
      })
      .done(function(data) {
        console.log($(data).find( "[index='1']" ));
      })
      .fail(function(error) {
        console.log(error);
      })
      .always(function() {
        console.log("complete");
      });

    }
  };
});
