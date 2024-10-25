function CheckCardTitleLength() {
    var cardTitle = document.getElementById("cardTitle").value;
    if (cardTitle.length > 35) {
        cardTitle = cardTitle.substring(0, 35);
        document.getElementById("cardTitle").value = cardTitle;
        cardTitle += '...';
    }
    
}