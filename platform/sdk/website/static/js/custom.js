var fixmeTop = 50;
$(window).scroll(function() {                  // assign scroll event listener

    var currentScroll = $(window).scrollTop(); // get current position

    if (currentScroll >= fixmeTop) {           // apply position: fixed if you
        $('.sub-nav').css({                      // scroll to that element or below it
            position: 'fixed',
            width: '100%',
            'z-index': 9999
        });
    } else {                                   // apply position: static
        $('.sub-nav').css({                      // if you scroll above it
            position: 'relative',
            'z-index': 99
        });
    }

});


$(document).ready(function() {
    var pathArray = location.href.split('/');
    var lastPath = pathArray[4];
    var productName = pathArray[3];

    // Making primary Nav li element active based on 
    var primaryNavLinkArray = $('.slidingNav ul li'); 
    var j=0;
    for (j=0; j<primaryNavLinkArray.length; j++) {
        if(primaryNavLinkArray[j].innerText.trim().toLowerCase().indexOf(productName.toLowerCase()) !== -1){
            $(primaryNavLinkArray[j]).addClass('siteNavItemActive');
        }
        else {
            $(primaryNavLinkArray[j]).removeClass('siteNavItemActive');
        }
    }

    var secondryNavLinkArray = $('.sub-nav li');
    if(pathArray.length >= 6) {
        var path = pathArray[5].toLowerCase();
    
        if( path === 'api' || path === 'sdk' ) {
            lastPath = path;
        }
    }
    

    var i=0;
    for (i=0; i<secondryNavLinkArray.length; i++) {
        if( secondryNavLinkArray[i].innerText.trim().toLowerCase().indexOf(lastPath.toLowerCase()) !== -1 ){
            $(secondryNavLinkArray[i]).addClass('active');
        }
        else {
            $(secondryNavLinkArray[i]).removeClass('active');

        }
    }

    $('code').addClass('prettyprint');

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js';
    document.head.appendChild(script);
})