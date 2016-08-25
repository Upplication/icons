@font-face {
    font-family: '<%- fontName %>';
    src: url(data:application/x-font-woff;charset=utf-8;base64,<%- base64font %>) format('woff');
    font-weight: normal;
    font-style: normal;
}

.<%- iconClass %> {
    &:before {
        font-family: '<%- fontName %>';
        font-size: 1em;
        font-style: normal;
        display: inline-block;
    }
}
<% glyphs.forEach(function(glyph) { %>
.<%- iconClass %>.<%- iconClass %>-<%- glyph.name %> {
    &:before {
        content: '<%- glyph.code %>';
    }
}
<% }) %>