CKEDITOR.plugins.add( 'quran', {
  icons: 'quran',
  init: function( editor ) {
    // Plugin logic goes here...
    editor.addCommand( 'quran', new CKEDITOR.dialogCommand( 'quranDialog' ) );
    editor.ui.addButton( 'Quran', {
      label: 'Insert Quran',
      command: 'quran',
      toolbar: 'insert'
    });
    CKEDITOR.dialog.add( 'quranDialog', this.path + 'dialogs/quran.js' );

  }

});
