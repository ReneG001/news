/* * * * * * * * * * * * * * * * * * * * * * *
 * Allgemein
 * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Die globale Variable "what" notiert, welche Menüinhalt 
 * zuletzt abgerufen wurde, damit beim Suchen, der Suchbegriff 
 * im selben Content durchgeführt und aktualisiert wird.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

let what = 0;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Sobald ein Menüpunkt angeklickt wird, so werden die 
 * möglichen Formatierungen aller Menüpunkte zurückgesetzt und
 * die Formatierung der aktuellen Menüpunkt festgesetzt, sodass
 * jederzeit bekannt ist, auf welchem Content man sich gerade
 * befindet.
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function switch_menu_item( id )
{

    const menuNEW = document.getElementById("new");
    const menuPAST = document.getElementById("past");
    const menuCOMMENT = document.getElementById("comment");
    const menuASK = document.getElementById("ask");

    const menuCURRENT = document.getElementById(id);

    if ( menuNEW && menuPAST && menuCOMMENT && menuASK )
    {

        menuNEW.style.backgroundColor = "";
        menuNEW.style.color = "";

        menuPAST.style.backgroundColor = "";
        menuPAST.style.color = "";

        menuCOMMENT.style.backgroundColor = "";
        menuCOMMENT.style.color = "";

        menuASK.style.backgroundColor = "";
        menuASK.style.color = "";

    }

    if ( menuCURRENT )
    {

        menuCURRENT.style.backgroundColor = "rgba(23, 23, 23, 0.9)";
        menuCURRENT.style.color = "#ffffff";

    }

}

/* * * * * * * * * * * * * * * * * * * * * * *
 * Rene
 * * * * * * * * * * * * * * * * * * * * * * */

// Ladet den Inhalt von "NEW"

function menu_new(filter = "")
{
    // Markieren den Tab "NEW"
    what = 1;
    // *** //
    switch_menu_item("new");
    // *** //
    grap( "http://hn.algolia.com/api/v1/search_by_date?tags=story" + filter, 
          function(data) 
          {
                for( let peace of data.hits )
                    addType1( peace );
          }
    );
}

// Ladet den Inhalt von "PAST"

function menu_past(filter = "")
{
    // Markieren den Tab "PAST"
    what = 2;
    // *** //
    switch_menu_item("past");
    // *** //
    grap( "http://hn.algolia.com/api/v1/search_by_date?tags=story" + filter, 
          function(data) 
          {
                for( let peace of data.hits )
                    addType1( peace );
          }
    );
}

// Ladet den Inhalt von "COMMENT"

function menu_comment(filter = "")
{
    // Markieren den Tab "COMMENT"
    what = 3;
    // *** //
    switch_menu_item("comment");
    // *** //
    grap( "http://hn.algolia.com/api/v1/search_by_date?tags=story" + filter, 
          function(data) 
          {
                for( let peace of data.hits )
                    addType1( peace );
          }
    );
}

// Ladet den Inhalt von "ASK"

function menu_ask(filter = "")
{
    // Markieren den Tab "ASK"
    what = 4;
    // *** //
    switch_menu_item("ask");
    // *** //
    grap( "http://hn.algolia.com/api/v1/search_by_date?tags=story" + filter, 
          function(data) 
          {
                for( let peace of data.hits )
                    addType1( peace );
          }
    );
}

/* * * * * * * * * * * * * * * * * * * * * * *
 * Karim
 * * * * * * * * * * * * * * * * * * * * * * */

function filterResult( event )
{

    // Der eingegegebene Wert wird in die Variable
    // "filter" ausgelesen
    let filter = "&query=" + event.target.value;

    // Je nach dem im welchem Menüpunkt wir 
    // uns befinden, wir rufen den betroffenen
    // Menüfunktion erneut auf und übergeben ihm
    // den Suchbegriff, um den Inhalt entsprechend
    // zu filtern.
    switch ( what )
    {
        case 1: menu_new( filter ); break;
        case 2: menu_past( filter ); break;
        case 3: menu_comment( filter ); break;
        case 4: menu_ask( filter ); break;
    }

    // Der Inhalt des Eingabefelds wird geleert
    event.target.value = "";

}

/* * * * * * * * * * * * * * * * * * * * * * *
 * Abdülaziz
 * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Fügt einen neuen Eintrag in den MAIN-Tag unter BODY-Tag
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function streamIn( value )
{
    // Verbindung zum Inhalts-Element "main" aufbauen
    const main = document.querySelector("main");
    // Den Inhalt um einen weiteren Eintrag erweitern
    if ( main )
        main.innerHTML += '<div class = "resitem">' + value + '</div>';
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Erzeugt einen neuen Eintrag von Typ1 & sendet es an streamIn
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function addType1( { url, author, created_at, title } )
{
    streamIn( `<a href="${url}" target = "_blank">`  +
            '<div class = "layout_1">'  +
            `<div class = "author"><b>Von</b> ${author}</div>`  +
            `<div class = "crdate"><b>Datum</b> ${created_at}</div>`  +
            '</div>'  +
            '<div class = "layout_2">'  +
            `<div class = "headline">${title}</div>` +
            '</div>' +
            '</a>' );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Erzeugt einen neuen Eintrag von Typ2 & sendet es an streamIn
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function addType2( { url, author, created_at, comment_text } )
{
    streamIn( `<a href="${url}" target = "_blank">` +
            '<div class = "layout_1">' +
            `<div class = "author"><b>Von</b> ${author}</div>` +
            `<div class = "crdate"><b>Datum</b> ${created_at}</div>` +
            '</div>' +
            '<div class = "layout_3">' +
            `${comment_text}` +
            '</div>' +
            '</a>' );
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Macht den Inhalt vom MAIN-Tag vollständig leeren, damit ein
 * neuer Inhalt in den MAIN-Tag geladen werden kann und holt 
 * das JSON-Objekt von einer URL ab und leitet es an eine
 * Callback-Funktion weiter.
 * url -> Die Webseite von dem was ausgelesen wird
 * cbk -> Ist die Callbackfunktion die das Ergebnis erhält
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function grap(url, cbk)
{
    // Verbindung zum Inhalts-Element "main" aufbauen
    const main = document.querySelector("main");
    // Inhalt des Elements leeren
    if ( main )
        main.innerHTML = "";
    // Anfrage an die URL wenden...
    fetch(url).then(res => 
            // Die Antwort in ein JSON umwandeln und an Funktion weiterreichen
            res.json()).then((out) => 
                    // Beim Erfolg, Callback-Funktion aurufen
                    cbk(out)).catch(err => 
                            // Andernfalls Fehler auf der Konsole ausgeben
                            console.error(err));
}

