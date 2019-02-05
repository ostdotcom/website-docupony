(function (){
  ((window.gitter = {}).chat = {}).options = {
    room: 'OpenSTFoundation/SimpleToken'
  };
  if ( window.location.pathname == '/') window.location.pathname = '/docs/kit';

  if(window.location.pathname.indexOf("/docs/kit/") > -1) {
    var head = document.getElementsByTagName('head')[0],
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://sidecar.gitter.im/dist/sidecar.v1.js';
    head.appendChild(script);

  }
 // <button class="gitter-chat-embed-action-bar-item gitter-chat-embed-action-bar-item-collapse-chat" aria-label="Collapse Gitter Chat"></button>
})();
