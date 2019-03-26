var fixmeTop = 50;
$(window).scroll(function() {                  // assign scroll event listener

    var currentScroll = $(window).scrollTop(); // get current position

    if (currentScroll >= fixmeTop) {           // apply position: fixed if you
        $('.sub-nav').css({                      // scroll to that element or below it
            position: 'fixed',
            width: '100%',
            'z-index': 9999,
            top:0,
            left:0
        });
        $('.toc-wrapper').css({
            top: '50px'
        });
    } else {                                   // apply position: static
        $('.sub-nav').css({                      // if you scroll above it
            position: 'relative',
            'z-index': 99
        });
        var attachHieght = 101-currentScroll;
        $('.toc-wrapper').css({
            top: attachHieght
        });
    }

});


$(document).ready(function() {
    var pathArray = location.href.split('/');
    var lastPath = pathArray[4];
    var productName = pathArray[3];

    if( lastPath && productName) {
        // Making primary Nav li element active based on 
        var primaryNavLinkArray = $('.slidingNav ul li'); 
        if(primaryNavLinkArray) {
            var j=0;
            for (j=0; j<primaryNavLinkArray.length; j++) {
                if(primaryNavLinkArray[j].innerText.trim().toLowerCase().indexOf(productName.toLowerCase()) !== -1){
                    $(primaryNavLinkArray[j]).addClass('siteNavItemActive');
                }
                else {
                    $(primaryNavLinkArray[j]).removeClass('siteNavItemActive');
                }
            }
        }
        

        var secondryNavLinkArray = $('.slidingNav ul li');
        if(secondryNavLinkArray) {
            if(pathArray.length >= 6) {
                var path = pathArray[5].toLowerCase();
            
                if( path === 'api' || path === 'sdks' ) {
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
        }
    }


    var toggles = $('.child-table-toggle');

    var i;
    for (i=0; i<toggles.length; i++) {
        var toggle = toggles[i];
        var dataId = $(toggle).attr("data-target");
        var selector = "#" + dataId + " tbody";
        $(toggle).closest('tr').after($(selector).html());
        $("." + dataId).css("display", "none");
    }

    $('.child-table-toggle').click(function (event){
        console.log(event)
        var toggleBtn = $(event.target);
        var dataId = $(toggleBtn).attr('data-target');
        var trSelector = "." + dataId;

        if($(trSelector).css("display") !=="none") {
            console.log('present');
            $(event.target).html("Show child attributes");
            $(trSelector).css("display", "none");
        }   
        else {
            console.log('Not present');
            $(event.target).html("Hide child attributes");
            $(trSelector).css("display", "table-row");
        }
    });



   
 
    
})