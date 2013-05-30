/******************************************************************************
*
* jQuery tsBorder
* @copyright Tim Swann https://bitbucket.org/faffyman
* @version 0.1.1
*
* *************************************************************
*
* Do NOT Remove this licensing text.
* Licensed under Creative Commons 3.0 (Attribution / Share Alike)
* You Are Free to:
* to Share — to copy, distribute and transmit the work
* to Remix — to adapt the work
* to make commercial use of the work
*
* http://creativecommons.org/licenses/by-sa/3.0/
*
* *****************************************************************************
*
* Simple jQuery plugin to apply a semi transparent border overlay to an element
* by means of adding 4 divs - top, right, bottom, left
*
* Three parameters
* -----------------
* color: hex code including the '#' OR rgb(0,0,0) definition
*        i.e. the background/color of the border
* thickness: integer
* opacity: decimal
*
*
* Example Usage
* ----------------
* <div id="mydiv"><img src="../img/myimage" /></div>
*
* <script type="text/javascript">
*  $(document).ready(function(){
*
*    $('#mydiv').tsBorder();
*
*  // OR Extended options
*
*    $('#mydiv').tsBorder({
*        opacity:0.4,
*        color:'#000000',
*        thickness:4
*     });
*  });
*
* </script>
*
/******************************************************************************/
  (function($){


    $.fn.tsBorder = function(options){

      $(this).parent().css('position','relative');

       var opts = $.extend({}, $.fn.tsBorder.defaults, options);

	     var n = 0;
  		 return this.each(function()
        {
            // get position of this element.
            // .offset = position relative to document
            // .position = position relative to the offset parent

            oPos = $(this).position();
            
            var nLeftBorder = $(this).css('border-left-width');
            var nTopBorder = $(this).css('border-top-width');
            nTopBorder = parseInt(nTopBorder);
            nLeftBorder = parseInt(nLeftBorder);
            

            var nWidth = $(this).width();
            var nHeight = $(this).height();
            
            // auto adjust for css border OVERLAP the css border
            if (opts.autoAdjustForBorder && opts.tsBorderPosition=='outside' ) {
              nWidth = nWidth + (nLeftBorder * 2);
              nHeight = nHeight + (nTopBorder * 2);
            }

            // auto adjust for css border - BUT keep INSIDE the border.
            // do this by amending the offset options with the border widths.
			if(opts.autoAdjustForBorder && opts.tsBorderPosition=='inside' ) {
			  opts.offsetTop = opts.offsetTop + nTopBorder;
			  opts.offsetLeft = opts.offsetLeft + nLeftBorder;
			}
			
            n++;


            //top border
            var dt = $("<div id=\"dt"+n+"\">");
                dt.css('position','absolute');
                dt.css('zIndex',99);
                dt.css('width', nWidth+'px');
                dt.css('height', opts.thickness + 'px');
                dt.css('backgroundColor',  opts.color );
                dt.css('opacity' , opts.opacity );

                dt.offset({
                  top: (oPos.top + opts.offsetTop),
                  left: (oPos.left  + opts.offsetLeft)
                });
                
             //border radius defined?
             if(opts.borderTopLeftRadius ) {
                dt.css('border-top-left-radius',parseInt(opts.borderTopLeftRadius) + 'px');
             } else if (opts.borderRadius>=1) {
                dt.css('border-top-left-radius',parseInt(opts.borderRadius) + 'px');
             }
             // top right
             if(opts.borderTopRightRadius ) {
                dt.css('border-top-right-radius',parseInt(opts.borderTopRightRadius) + 'px');
             } else if (opts.borderRadius>=1) {
                dt.css('border-top-right-radius',parseInt(opts.borderRadius) + 'px');
             }

            // bottom border
            var db = $("<div id=\"db"+n+"\">");
                db.css('position','absolute');
                db.css('zIndex',100);
                db.css('width', nWidth+'px');
                db.css('height', opts.thickness + 'px');
                db.css('backgroundColor',  opts.color );
                db.css('opacity' , opts.opacity );

                dbtop = parseInt( (oPos.top + nHeight  + opts.offsetTop) - (opts.thickness) );
                dbleft = Math.ceil(oPos.left  + opts.offsetLeft);
                db.offset({
                  top: dbtop,
                  left: dbleft
                });
                
             if(opts.borderBottomLeftRadius ) {
                db.css('border-bottom-left-radius',parseInt(opts.borderBottomLeftRadius) + 'px');
             } else if (opts.borderRadius>=1) {
                db.css('border-bottom-left-radius',parseInt(opts.borderRadius) + 'px');
             }
             // bottom right
             if(opts.borderBottomRightRadius ) {
                db.css('border-bottom-right-radius',parseInt(opts.borderBottomRightRadius) + 'px');
             } else if (opts.borderRadius>=1) {
                db.css('border-bottom-right-radius',parseInt(opts.borderRadius) + 'px');
             }


            // left border
            var dl = $("<div id=\"dl"+n+"\">");
                dl.css('position','absolute');
                dl.css('zIndex',101)
                  .css('width', opts.thickness + 'px')
                  .css('height', (nHeight - (opts.thickness * 2) ) + 'px')
                  .css('backgroundColor',  opts.color )
                  .css('opacity' , opts.opacity )
                  .offset({
                    top: (oPos.top + opts.thickness  + opts.offsetTop),
                    left: Math.ceil(oPos.left  + opts.offsetLeft)
                  })



            // right border
            var dr = $("<div id=\"dr"+n+"\">");
                dr.css('position','absolute');
                dr.css('zIndex',102)
                .css('width', opts.thickness + 'px')
                .css('height', (nHeight - (opts.thickness * 2) ) + 'px')
                .css('backgroundColor',  opts.color )
                .css('opacity' , opts.opacity )
                .offset({
                  top:(oPos.top + opts.thickness + opts.offsetTop),
                  left:Math.ceil( (oPos.left + nWidth + opts.offsetLeft) - opts.thickness)
                });


            $(this).parent().append(dt)
                   .append(db)
                   .append(dl)
                   .append(dr);

        });


	}

	// PUBLIC ACCESS TO DEFAULT PROPERTIES
  $.fn.tsBorder.defaults = {
    color: '#ffffff',
    opacity:1,
    thickness: 15,
    offsetLeft:0,
    offsetTop:0,
    autoAdjustForBorder: false,  // default is false for backwards compatabiliy
    tsBorderPosition: 'inside',
    borderRadius:0, // default is 0 (square) 
    borderTopLeftRadius: false, //optional
    borderTopRightRadius: false, //optional
    borderBottomRightRadius: false, //optional
    borderBottomLeftRadius: false //optional
                
  };


})(jQuery);