/******************************************************************************
*
* jQuery tsBorder
* @copyright Tim Swann https://bitbucket.org/faffyman
* @version 0.1
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
	     /*
	     options = options.extend({
	       className = '',
	       borderSize = 15,
	       borderColor = '#ffffff',
	       borderOpacity =
	       0.9
	     });
	     */


	     var n = 0;
		 return this.each(function()
        {
            //alert(this.vari);    // would output `undefined`
            //alert($(this).attr('id')); // would output `$.fn.vari`
            // get position of this element.

            // .offset = position relative to document
            // .position = position relative to the offset parent

            oPos = $(this).position(); //get absolute position relative to the page as a whole.

            //alert(oPos.top + '\n' + oPos.left);
            var nWidth = $(this).width();
            var nHeight = $(this).height();

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



            // add bottom border div
            //$(this).after('<div class="brdr" style="position:absolute;z-index:99;top:'+( (oPos.top+nHeight) - 15)+'px;left:'+oPos.left+'px;height:15px;width:'+nWidth+'px;background:#ffffff;opacity:0.9;"></div>');

            // add left border div
            // add right border div
            // apply styles to border divs
        });


	}

	// PUBLIC ACCESS TO DEFAULT PROPERTIES
  $.fn.tsBorder.defaults = {
    color: '#ffffff',
    opacity:1,
    thickness: 15,
    offsetLeft:0,
    offsetTop:0
  };


})(jQuery);