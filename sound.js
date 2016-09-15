

jQuery('#mubert_control, #styles_menu').live('click', function(){

    if (typeof yaCounter33140563 !== 'undefined') {
        yaCounter33140563.reachGoal('styles_open');
    }

    jQuery('#styles_container').remove();

    jQuery('#styles').html('' +
        '<div id="styles_container">' +
        '<div id="psytrance" data-bpm="1440" data-safari-bpm="145" class="mubert_alchemy psytrance">c' +
        '<span>psytrance</span></div>' +
        '<div id="chillstep" data-bpm="1400" data-safari-bpm="140" class="mubert_alchemy chillstep">a<span>chillstep</span>' +
        '</div><div id="liquidfunk" data-bpm="1750" data-safari-bpm="175" class="mubert_alchemy liquidfunk">e<span>liquidfunk</span>' +
        '</div><div id="deephouse" data-bpm="1225" data-safari-bpm="122" class="mubert_alchemy deephouse">b<span>deephouse</span>' +
        '</div><div id="trap"      data-bpm="1500" data-safari-bpm="150" class="mubert_alchemy trap">     d<span>trap</span>' +
        '</div><div id="ambient" data-bpm="600" class="mubert_alchemy ambient">g<span>ambient</span></div><div id="drop_area">' +
        '</div></div><div id="styles_overlay"></div>');

    jQuery('#styles').fadeToggle('fast');


    var symbol = jQuery('#styles_container').find('.mubert_alchemy');


    symbol.click(function(){

        var ID = jQuery(this).attr('id');
        var alchemy = jQuery(this).attr('data-bpm');
        jQuery(".mubert_alchemy:not(#"+ID+")").fadeOut();
        jQuery(this).delay(300).queue(function(){
            jQuery(this).addClass('active') ;
            jQuery(this).dequeue();
        });
        if (typeof yaCounter33140563 !== 'undefined') {
            yaCounter33140563.reachGoal(ID);
        }
        changeStyle(alchemy);
        jQuery('#styles_container').delay(3000).fadeOut('fast');
        jQuery('#styles').delay(3300).fadeOut('fast');

    });

});

jQuery(function() {

    jQuery('#styles').on("click", "#styles_overlay",function(){
        jQuery('#styles').fadeOut('fast');
    });

});



