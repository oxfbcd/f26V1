  $(document).ready(function () {
    const drinks = [
      { name: 'Consigne Gobelet',     type:'glass', price: 1.0, icon: '../img/b_consigneverre.png' },
      { name: 'Consigne Pichet',      type:'glass', price: 2.0, icon: '../img/b_consignepichet.png' },
      { name: 'Café',                 type:'drink', price: 1.0, icon: '../img/b_cafe.png' },
      { name: 'Vin 12cl',             type:'drink', price: 2, icon: '../img/b_vin.png' },
      { name: 'Soft 25cl',            type:'drink', price: 2.0, icon: '../img/b_soft25.png' },
      { name: 'Soft 50cl',            type:'drink', price: 4.0, icon: '../img/b_soft50.png' },
      { name: 'Kombucha 25cl',        type:'drink', price: 3.5, icon: '../img/b_kbucha25.png' },
      { name: 'Kombucha 50cl',        type:'drink', price: 7, icon: '../img/b_kbucha50.png' },
      { name: 'Lancelot 25cl',        type:'drink', price: 3.0, icon: '../img/b_lancelot25.png' },
      { name: 'Morgane BIO 25cl',     type:'drink', price: 3.5, icon: '../img/b_morgane25.png' },
      { name: 'Blanche Hermine 25cl', type:'drink', price: 3.5, icon: '../img/b_hermine25.png' },
      { name: 'Cidre 25cl',           type:'drink', price: 3.0, icon: '../img/b_cidre25.png' },
      { name: 'Lancelot 50cl',        type:'drink', price: 6, icon: '../img/b_lancelot50.png' },
      { name: 'Morgane BIO 50cl',     type:'drink', price: 7, icon: '../img/b_morgane50.png' },
      { name: 'Blanche Hermine 50cl', type:'drink', price: 7, icon: '../img/b_hermine50.png' },
      { name: 'Cidre 50cl',           type:'drink', price: 6, icon: '../img/b_cidre50.png' },
      { name: 'Lancelot 1.5L',        type:'drink', price: 18, icon: '../img/b_lancelot15.png' },
      { name: 'Morgane BIO 1.5L',     type:'drink', price: 20, icon: '../img/b_morgane15.png' },
      { name: 'Blanche Hermine 1.5L', type:'drink', price: 20, icon: '../img/b_hermine15.png' },
      { name: 'Cidre 1.5L',           type:'drink', price: 18, icon: '../img/b_cidre15.png' },
      { name: 'Tote Bag du Festival', type:'', price: 5, icon: '../img/a_toteBag.png' },
      { name: 'Chapeau du Festival',  type:'', price: 5, icon: '../img/a_chapeau.png' },
      { name: 'Badge de soutien',     type:'', price: 2, icon: '../img/a_pins.png' }



        // ... Ajoutez d'autres boissons ici
    ];

    let totalPrice = 0;
    let glassCount = 0;
    let nbVerres = 0;
    let nbBoissons = 0;

    const drinksContainer = $('.drinks-container');
    const glassCountElement = $('#glass-count');
    const resetButton = $('#reset-btn');

drinks.forEach((drink, index) => {
    const drinkDiv = $('<div>', { class: 'drink' });
    const drinkImg = $('<div>', { class: 'drink-image', style: `background-image: url('${drink.icon}')` });
    const drinkName = $('<div>', { class: 'drink-name', text: drink.name + " - " + drink.price + "€" });
    const badge = $('<div>', { class: 'badge hidden', text: '0' });
  initializeBadges();


    drinkDiv.data('count', 0); // Initialize drink count for each item

    drinkDiv.append(drinkImg, drinkName, badge);
    drinksContainer.append(drinkDiv);

  
    drinkDiv.on('click', function (e) {
        totalPrice += drink.price;
        glassCount++;
        if(drink.type == "drink"){nbBoissons ++;}
        if(drink.type == "glass"){nbVerres ++;}
        const drinkCount = drinkDiv.data('count') + 1;
        drinkDiv.data('count', drinkCount); // Update drink count in data attribute
        updateInfo();
        updateBadge(badge, drinkCount);
     
      if (navigator.vibrate) {
            navigator.vibrate(100); // 100 ms de vibration
        }
    });

    let timer;
    drinkDiv.contextmenu(function (e) {
    e.preventDefault(); // Empêche le menu contextuel par défaut
    if (drinkDiv.data('count') > 0) {
        removeGlass(index);
        const drinkCount = drinkDiv.data('count') - 1;
        drinkDiv.data('count', drinkCount);
        updateBadge(badge, drinkCount);
    }
      return false;
});
  return false;
});

    function updateInfo() {
        $('#total-price').text(totalPrice);
        $('#total-drinks').text(nbBoissons);
        $('#total-glasses').text(nbVerres);
        glassCountElement.text(glassCount);
    }

    function removeGlass(drinkIndex) { // Accept the index as a parameter
        if (glassCount > 0) {
            totalPrice -= drinks[drinkIndex].price;
            glassCount--;
          
            if(drinks[drinkIndex].type == "drink"){nbBoissons --;}
            if(drinks[drinkIndex].type == "glass"){nbVerres --;}
            updateInfo();
        }
    }
    function updateBadge(badge, count) {
        badge.text(count);
        badge.toggleClass('hidden', count === 0); // Masque la pastille si count est égal à 0
    }
  
  resetButton.click(function () {
    totalPrice = 0;
    nbBoissons = 0;
    nbVerres = 0;
    updateInfo();
    resetBadge();
});
  
  function resetBadge() {
    $('.badge').addClass('hidden').text('0');
    $('.drink').each(function () {
        $(this).data('count', 0); // Réinitialiser les compteurs de boisson
    });
}
  
  $('a').click(function (obj){
    obj.preventDefault();
    $(this).attr("href");

});
  
  function initializeBadges() {
    $('.badge').each(function () {
        const count = parseInt($(this).text(), 10);
        $(this).toggleClass('hidden', count === 0);
    });
}
  $(".ouvrirNourriture").on('click',function(){
    window.location.replace("../nourriture/index.html");
  });
  
   $(".ouvrirBoissons").on('click',function(){
    window.location.replace("../boissons/index.html");
  });
   
  
  $(".ouvrirParams").on('click',function(e){
    e.stopPropagation();
    $('#modal-conseils').fadeIn(200);
    $('.faq-answer').slideUp(0);
    $('.faq-question').removeClass('active');
    $('.modal-scrollable-content').scrollTop(0);
  });
  
  
  $('#modal-conseils .close-btn, #modal-conseils').on('click', function (e) {
    if (e.target !== this) return; // évite de fermer en cliquant dans le contenu
    $('#modal-conseils').fadeOut(200);
});
    
    
  $('.faq-question').on('click', function () {
    const $this = $(this);
    const $answer = $this.next('.faq-answer');

    // Ferme les autres
    $('.faq-answer').not($answer).slideUp();
    $('.faq-question').not($this).removeClass('active');

    // Toggle celle cliquée
    $answer.slideToggle();
    $this.toggleClass('active');
  });
  
  
  // Affichage du prix total en grand
$('#sumTot').on('click', function () {
    $('#modal-price-value').text($("#total-price").text() + ' €');
    $('#modal-price').fadeIn(200);
});

// Fermer la modale quand on clique sur la croix ou l’extérieur
$('#modal-price .close-btn, #modal-price').on('click', function (e) {
    if (e.target !== this) return; // évite de fermer en cliquant dans le contenu
    $('#modal-price').fadeOut(200);
});

  
  
  
});


  
  
  
 
