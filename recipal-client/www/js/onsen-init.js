ons.bootstrap();
ons.ready(function() {
            // Add another Onsen UI element
            var content = document.getElementById("my-content");
            content.innerHTML="<ons-button>Another Button</ons-button>";
            ons.compile(content);
});
