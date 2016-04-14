<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>WebFont: <%- fontName %></title>
        <link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="<%- fontName %>.css" />
        <style type="text/css">
            body {
                font-family: Lato;
                text-align: center;
            }

            .icon::before {
                border: 1px solid #eee;
                padding: 0.3em;
            }

            .icon-container {
                display: inline-block;
                border: 1px dashed #CCC;
                padding: 5px 13px;
                transition: all ease 0.15s;
                cursor: pointer;
            }

            .icon-container:hover {
                color: #00C86B;
            }
        </style>
        <script type="text/javascript">
            function glyphPrompt(glyph) {
                var iClass = '<%- iconClass %> <%- iconClass %>-' + glyph;
                var iTag = '<i class="' + iClass + '"></i>';
                window.prompt("Copy to clipboard: Ctrl+C, Enter", iTag);
            }
        </script>
    </head>
    <body>
        <h2>WebFont: <%- fontName %></h2>
        <% glyphs.forEach(function(glyph) { %>
        <div class="icon-container" onclick="glyphPrompt('<%- glyph.name %>')">
            <div class="<%- iconClass %> <%- iconClass %>-<%- glyph.name %> <%- iconClass %>-2x"></div>
            <div class="glyph-name"><%- glyph.name %></div>
            <!-- <span>.<%- iconClass %>.<%- iconClass %>-<%- glyph.name %></span> -->
        </div>
        <% }) %>
    </body>
</html>