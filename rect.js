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

module.exports = Rect;

var Point = require("./point"),
    Size = require("./size");

function Rect(x, y, width, height)
{
    this.origin = new Point(x || 0, y || 0);
    this.size = new Size(width || 0, height || 0);
};

Rect.ZeroRect = new Rect(0, 0, 0, 0);

Rect.rectFromClientRect = function(clientRect)
{
    return new Rect(clientRect.left, clientRect.top, clientRect.width, clientRect.height);
};

Rect.unionOfRects = function(rects)
{
    var union = rects[0];
    for (var i = 1; i < rects.length; ++i)
        union = union.unionWithRect(rects[i]);
    return union;
};

Rect.prototype = {
    constructor: Rect,

    toString: function()
    {
        return "Rect[" + [this.origin.x, this.origin.y, this.size.width, this.size.height].join(", ") + "]";
    },

    copy: function()
    {
        return new Rect(this.origin.x, this.origin.y, this.size.width, this.size.height);
    },

    equals: function(anotherRect)
    {
        return (this.origin.equals(anotherRect.origin) && this.size.equals(anotherRect.size));
    },

    inset: function(left, top, right, bottom)
    {
        return new Rect(
            this.origin.x + left,
            this.origin.y + top,
            this.size.width - left - right,
            this.size.height - top - bottom
        );
    },

    pad: function(padding)
    {
        return new Rect(
            this.origin.x - padding,
            this.origin.y - padding,
            this.size.width + padding * 2,
            this.size.height + padding * 2
        );
    },

    minX: function()
    {
        return this.origin.x;
    },

    minY: function()
    {
        return this.origin.y;
    },

    midX: function()
    {
        return this.origin.x + (this.size.width / 2);
    },

    midY: function()
    {
        return this.origin.y + (this.size.height / 2);
    },

    maxX: function()
    {
        return this.origin.x + this.size.width;
    },

    maxY: function()
    {
        return this.origin.y + this.size.height;
    },

    intersectionWithRect: function(rect)
    {
        var x1 = Math.max(this.minX(), rect.minX());
        var x2 = Math.min(this.maxX(), rect.maxX());
        if (x1 > x2)
            return Rect.ZeroRect;
        var intersection = new Rect;
        intersection.origin.x = x1;
        intersection.size.width = x2 - x1;
        var y1 = Math.max(this.minY(), rect.minY());
        var y2 = Math.min(this.maxY(), rect.maxY());
        if (y1 > y2)
            return Rect.ZeroRect;
        intersection.origin.y = y1;
        intersection.size.height = y2 - y1;
        return intersection;
    },

    unionWithRect: function(rect)
    {
        var x = Math.min(this.minX(), rect.minX());
        var y = Math.min(this.minY(), rect.minY());
        var width = Math.max(this.maxX(), rect.maxX()) - x;
        var height = Math.max(this.maxY(), rect.maxY()) - y;
        return new Rect(x, y, width, height);
    },

    round: function()
    {
        return new Rect(
            Math.floor(this.origin.x),
            Math.floor(this.origin.y),
            Math.ceil(this.size.width),
            Math.ceil(this.size.height)
        );
    }
};
