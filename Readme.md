
# geometry

  JavaScript geometry types: point, size, rectangle, etc.

## Installation

  Install with [component(1)](http://component.io):

    $ component install graouts/geometry

## API

### Point

```javascript
var Point = require("geometry/point");

// Basic API.
var point = new Point(10, 10);
point.x;                    // 10
point.y;                    // 10
point.toString();           // -> Point[10, 10]
point.equals(point.copy())  // -> true

// Create a Point from a MouseEvent using page coordinates.
var pagePoint = Point.fromEvent(event);

// Create a Point from a MouseEvent with coordinates local to a given elememt.
var localPoint = Point.fromEventInElement(event, event.target);
```

### Size

```javascript
var Size = require("geometry/size");

// Basic API.
var size = new Size(100, 100);
size.width;              // 100
size.height;             // 100
size.toString();         // -> Size[100, 100]
size.equals(size.copy()) // -> true
```

### Rect

```javascript
var Rect = require("geometry/rect");

// Basic API.
var rect = new Rect(10, 10, 100, 100);
rect.origin.x;           // 10
rect.origin.y;           // 10
rect.size.width;         // 100
rect.size.height;        // 100
rect.toString();         // -> Rect[10, 10, 100, 100]
rect.equals(rect.copy()) // -> true

// Add a little extra room around the rect.
var paddedRect = rect.pad(10); // -> Rect[0, 0, 120, 120]

// Inset the rect providing dimensions at left, top, right and bottom.
var insetRect = rect.inset(10, 20, 30, 40); // -> Rect[10, 20, 80, 60]

// Get the union with another rect.
var union = rect.unionWithRect(new Rect(50, 50, 100, 100)); // -> Rect[0, 0, 150, 150]

// Get the intersection with another rect.
var intersection = rect.intersectionWithRect(new Rect(0, 0, 20, 20)); // -> Rect[10, 10, 10, 10]

// Ensure the rect has integers for all dimensions.
var roundedRect = rect.round();

// Get a Rect that's the union of several rectangles.
var rect = Rect.unionOfRects([aRect, anotherRect, yetAnotherRect]);

// Create a Rect from a ClientRect as returned from Element.getBoundingClientRect();
var rect = Rect.rectFromClientRect(clientRect);
```

### All-in-one

You can require all geometry types at one by calling `require("geometry")` returns an object with members `Point`, `Size` and `Rect`.
