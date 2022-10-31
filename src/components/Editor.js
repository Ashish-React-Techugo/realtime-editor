import React, { Component } from "react";
import './Editor.css'; 
// import loadTypo from '../helper/loadType'
// var Typo = require("typo-js");
// var dictionary = new Typo(lang_code);

let firepad
class Editor extends Component {
  componentDidMount() {
    
    var config = {
      apiKey: 'AIzaSyD5mqrqyZCr9_hKZEg6p6oUcFOk5FrJhGA',
      authDomain: "editor-183f8.firebaseapp.com",
      databaseURL: "https://editor-183f8-default-rtdb.firebaseio.com"
    };
    window.firebase.initializeApp(config);

    //// Get Firebase Database reference.
    var firepadRef = this.getExampleRef();

  var codeMirror = window.CodeMirror(document.getElementById('firepad-container'), { 
    lineWrapping: true,
    mode: "spell-checker",
    backdrop: "gfm" // Your desired mode
  });
  
    window.CodeMirrorSpellChecker({
      codeMirrorInstance: codeMirror,
  });

    var userId = Math.floor(Math.random() * 9999999999).toString();

    //// Create Firepad (with rich text features and our desired userId).
    firepad = window.Firepad.fromCodeMirror(firepadRef, codeMirror,
        { richTextToolbar: true, richTextShortcuts: true});

    //// Create FirepadUserList (with our desired userId).
    var firepadUserList = window.FirepadUserList.fromDiv(firepadRef.child('users'),
        document.getElementById('firepad-userlist'), userId);

    //// Initialize contents.
    firepad.on('ready', function() {
      if (firepad.isHistoryEmpty()) {
        firepad.setHtml('<p>Ashish</p>');
      }
    });
    // firepad.on('change',function(){
    //   console.log("changing")
    // })
  }
  // aff = 'https://cdn.rawgit.com/kofifus/Typo.js/312bf158a814dda6eac3bd991e3a133c84472fc8/typo/dictionaries/en_US/en_US.aff';
  // dic = 'https://cdn.rawgit.com/kofifus/Typo.js/312bf158a814dda6eac3bd991e3a133c84472fc8/typo/dictionaries/en_US/en_US.dic';
  // typoLoaded=loadTypo(this.aff, this.dic);
  // this.typoLoaded.then(typo => startSpellCheck(firepad, typo));
  helper(){
    let html = firepad.getHtml();
    html+=`<textarea>Ashish</textarea>`
    // html+=`<img src="${"https://ik.imagekit.io/yfeaxn7q0f/basic-bar_a5DrwOiY_.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665473988365"}" alt="" width="200px" height="200px" />`;
    console.log(firepad.setHtml(html));
  }
  // Helper to get hash from end of URL or generate a random one.
  getExampleRef() {
    var ref = window.firebase.database().ref();
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
      ref = ref.child(hash);
    } else {
      ref = ref.push(); // generate unique location.
      window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }
    if (typeof console !== 'undefined') {
      console.log('Firebase data: ', ref.toString());
    }
    return ref;
  }
  render() {
    return (
        <div>
            <div contentEditable="true" id="firepad-container"></div>
            <div id="firepad-userlist"></div>
            <div></div>
            <button onClick={this.helper}>get HTML</button>
        </div>
        
    );
  }
}
export default Editor;