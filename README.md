# Full Width Headlines
A [jQuery][jq] plugin for creating headlines that span the full width utilizing the CSS flexbox model. See some examples here: https://flekschas.github.io/FullWidthHeadline

## Usage

**CSS**:

```
.full-width-hl .container {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    /* Old Syntax */
    -webkit-box-orient: horizontal;
       -moz-box-orient: horizontal;
            box-orient: horizontal;
    -webkit-box-align: center;
       -moz-box-align: center;
            box-align: center;
    -webkit-box-pack: center;
       -moz-box-pack: center;
            box-pack: center;

    /* New syntax */
    -webkit-flex-flow: row nowrap;
        -ms-flex-flow: row nowrap;
            flex-flow: row nowrap;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
            justify-content: space-between;
    text-align: center;
    text-transform: uppercase;
    line-height: 1;
    overflow: hidden;
    white-space: nowrap;
}

.full-width-hl .centered-words {
    -webkit-justify-content: center;
            justify-content: center;
}

.full-width-hl .container span {
    margin-left: 0.25em;
}

.full-width-hl .container span:first-child {
    margin-left: 0;
}

.full-width-hl:hover .container span {
    color: #000;
    background: yellow;
}
```

**HTML**:

```
<h1 class="full-width-hl">A full width headline</h1>
```

**JavaScript**:

```
$('.full-width-hl').fullWidthHeadline();
```

## Browser Support

* Chrome >= 19
* Firefox >= 5
* Safari >= 6
* Opera >= 12.15
* Internet Exploror >= 10

**Node**: The plugin potentially works in other browser too. The ones named above have been tested explicitely.

[jq]: https://jquery.com/
