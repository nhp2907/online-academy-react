import React, {useEffect} from 'react'

const FbChat = ({}) => {
    useEffect(() => {
        const script = document.createElement("script");

        script.innerHTML =
            `var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", "102907425416919");
            chatbox.setAttribute("attribution", "biz_inbox");
        
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v11.0'
              });
            };
        
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
    `
        script.async = true;

        document.body.appendChild(script);
    }, [])
    return (
        <>
            <div id="fb-root"></div>
            <div id="fb-customer-chat" className="fb-customerchat">
            </div>
        </>
    )
}

export default FbChat;