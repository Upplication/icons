<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8"> 
        <link rel="stylesheet" type="text/css" href="dist/<%- fontName %>.css" />
    </head>
    <body>
        <h2>Icons</h2>
        <% glyphs.forEach(function(glyph) { %>
        <div>
            <i class="<%- iconClass %> <%- iconClass %>-<%- glyph.name %> <%- iconClass %>-2x"></i>
            <span><%- glyph.name %></span>
        </div>
        <% }) %>
    </body>
</html>