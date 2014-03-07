/*
 * Copyright (C) 2013 Apple Inc. All rights reserved.
 * Copyright (C) 2014 Antoine Quint. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. AND ITS CONTRIBUTORS ``AS IS''
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL APPLE INC. OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */

module.exports = Point;

function Point(x, y)
{
    this.x = x || 0;
    this.y = y || 0;
};

Point.fromEvent = function(event)
{
    var item = (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) ? event.targetTouches[0] : event;
    return new Point(item.pageX, item.pageY);
};

Point.fromEventInElement = function(event, element)
{
    var item = (typeof TouchEvent !== "undefined" && event instanceof TouchEvent) ? event.targetTouches[0] : event;
    var wkPoint = window.webkitConvertPointFromPageToNode(element, new WebKitPoint(item.pageX, item.pageY));
    return new Point(wkPoint.x, wkPoint.y);
};

Point.prototype = {
    constructor: Point,

    toString : function()
    {
        return "Point[" + this.x + ", " + this.y + "]";
    },

    copy: function()
    {
        return new Point(this.x, this.y);
    },

    equals: function(anotherPoint)
    {
        return (this.x === anotherPoint.x && this.y === anotherPoint.y);
    },

    distanceToPoint: function(anotherPoint)
    {
        return Math.sqrt(Math.pow(this.x - anotherPoint.x, 2) + Math.pow(this.y - anotherPoint.y, 2));
    }
};
