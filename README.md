# Full Width Headlines
A [jQuery](jq) plugin for creating headlines that span the full width. See some examples here: https://flekschas.github.io/FullWidthHeadline

## Installation

```
bower install --save-dev FullWidthHeadline.js
```

## Usage

**CSS**:

```
h1 {
    font-size: 2.5em;
    text-align: center;
    text-transform: uppercase;
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
* Firefox >= 20
* Safari >= 6
* Opera >= 26
* Internet Exploror >= 11

**Node**: The plugin potentially works in other browser too. The ones named above have been tested explicitely.

jq: https://jquery.com/
