var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { CSS } from '../../util/dom';
/**
 * NO DOM
 */
export function processRecords(stopAtHeight, records, cells, headerFn, footerFn, data) {
    var record = void 0;
    var startRecordIndex = void 0;
    var previousCell = void 0;
    var tmpData = void 0;
    var lastRecordIndex = records.length - 1;
    if (cells.length) {
        // we already have cells
        previousCell = cells[cells.length - 1];
        if (previousCell.top + previousCell.height > stopAtHeight) {
            return;
        }
        startRecordIndex = previousCell.record + 1;
    } else {
        // no cells have been created yet
        previousCell = {
            row: 0,
            width: 0,
            height: 0,
            top: 0,
            left: 0,
            tmpl: -1
        };
        startRecordIndex = 0;
    }
    var processedTotal = 0;
    for (var recordIndex = startRecordIndex; recordIndex <= lastRecordIndex; recordIndex++) {
        record = records[recordIndex];
        if (headerFn) {
            tmpData = headerFn(record, recordIndex, records);
            if (tmpData !== null) {
                // add header data
                previousCell = addCell(previousCell, recordIndex, TEMPLATE_HEADER, tmpData, data.hdrWidth, data.hdrHeight, data.viewWidth);
                cells.push(previousCell);
            }
        }
        // add item data
        previousCell = addCell(previousCell, recordIndex, TEMPLATE_ITEM, null, data.itmWidth, data.itmHeight, data.viewWidth);
        cells.push(previousCell);
        if (footerFn) {
            tmpData = footerFn(record, recordIndex, records);
            if (tmpData !== null) {
                // add footer data
                previousCell = addCell(previousCell, recordIndex, TEMPLATE_FOOTER, tmpData, data.ftrWidth, data.ftrHeight, data.viewWidth);
                cells.push(previousCell);
            }
        }
        if (previousCell.record === lastRecordIndex) {
            previousCell.isLast = true;
        }
        // should always process at least 3 records
        processedTotal++;
        if (previousCell.top + previousCell.height + data.itmHeight > stopAtHeight && processedTotal > 3) {
            return;
        }
    }
}
function addCell(previousCell, recordIndex, tmpl, tmplData, cellWidth, cellHeight, viewportWidth) {
    var newCell = void 0;
    if (previousCell.left + previousCell.width + cellWidth > viewportWidth) {
        // add a new cell in a new row
        newCell = {
            record: recordIndex,
            tmpl: tmpl,
            row: previousCell.row + 1,
            width: cellWidth,
            height: cellHeight,
            top: previousCell.top + previousCell.height,
            left: 0,
            reads: 0
        };
    } else {
        // add a new cell in the same row
        newCell = {
            record: recordIndex,
            tmpl: tmpl,
            row: previousCell.row,
            width: cellWidth,
            height: cellHeight,
            top: previousCell.top,
            left: previousCell.left + previousCell.width,
            reads: 0
        };
    }
    if (tmplData) {
        newCell.data = tmplData;
    }
    return newCell;
}
/**
 * NO DOM
 */
export function populateNodeData(startCellIndex, endCellIndex, viewportWidth, scrollingDown, cells, records, nodes, viewContainer, itmTmp, hdrTmp, ftrTmp, initialLoad) {
    var madeChanges = false;
    var node = void 0;
    var availableNode = void 0;
    var cell = void 0;
    var previousCell = void 0;
    var isAlreadyRendered = void 0;
    var lastRecordIndex = records.length - 1;
    var viewInsertIndex = null;
    var totalNodes = nodes.length;
    var templateRef = void 0;
    startCellIndex = Math.max(startCellIndex, 0);
    endCellIndex = Math.min(endCellIndex, cells.length - 1);
    for (var cellIndex = startCellIndex; cellIndex <= endCellIndex; cellIndex++) {
        cell = cells[cellIndex];
        availableNode = null;
        isAlreadyRendered = false;
        // find the first one that's available
        if (!initialLoad) {
            for (var i = 0; i < totalNodes; i++) {
                node = nodes[i];
                if (cell.tmpl !== node.tmpl || i === 0 && cellIndex !== 0) {
                    // the cell must use the correct template
                    // first node can only be used by the first cell (css :first-child reasons)
                    // this node is never available to be reused
                    continue;
                } else if (node.isLastRecord) {
                    // very last record, but could be a header/item/footer
                    if (cell.record === lastRecordIndex) {
                        availableNode = nodes[i];
                        availableNode.hidden = false;
                        break;
                    }
                    // this node is for the last record, but not actually the last
                    continue;
                }
                if (node.cell === cellIndex) {
                    isAlreadyRendered = true;
                    break;
                }
                if (node.cell < startCellIndex || node.cell > endCellIndex) {
                    if (!availableNode) {
                        // havent gotten an available node yet
                        availableNode = nodes[i];
                    } else if (scrollingDown) {
                        // scrolling down
                        if (node.cell < availableNode.cell) {
                            availableNode = nodes[i];
                        }
                    } else {
                        // scrolling up
                        if (node.cell > availableNode.cell) {
                            availableNode = nodes[i];
                        }
                    }
                }
            }
            if (isAlreadyRendered) {
                continue;
            }
        }
        if (!availableNode) {
            // did not find an available node to put the cell data into
            // insert a new node before the last record nodes
            if (viewInsertIndex === null) {
                viewInsertIndex = -1;
                for (var j = totalNodes - 1; j >= 0; j--) {
                    node = nodes[j];
                    if (node && !node.isLastRecord) {
                        viewInsertIndex = viewContainer.indexOf(node.view);
                        break;
                    }
                }
            }
            // select which templateRef should be used for this cell
            templateRef = cell.tmpl === TEMPLATE_HEADER ? hdrTmp : cell.tmpl === TEMPLATE_FOOTER ? ftrTmp : itmTmp;
            if (!templateRef) {
                console.error('virtual' + (cell.tmpl === TEMPLATE_HEADER ? 'Header' : cell.tmpl === TEMPLATE_FOOTER ? 'Footer' : 'Item') + ' template required');
                continue;
            }
            availableNode = {
                tmpl: cell.tmpl,
                view: viewContainer.createEmbeddedView(templateRef, new VirtualContext(null, null, null), viewInsertIndex)
            };
            totalNodes = nodes.push(availableNode);
        }
        // console.debug(`node was cell ${availableNode.cell} but is now ${cellIndex}, was top: ${cell.top}`);
        // assign who's the new cell index for this node
        availableNode.cell = cellIndex;
        // apply the cell's data to this node
        availableNode.view.context.$implicit = cell.data || records[cell.record];
        availableNode.view.context.index = cellIndex;
        availableNode.hasChanges = true;
        availableNode.lastTransform = null;
        madeChanges = true;
    }
    if (initialLoad) {
        // add nodes that go at the very end, and only represent the last record
        var lastNodeTempData = records[lastRecordIndex] || {};
        addLastNodes(nodes, viewContainer, TEMPLATE_HEADER, hdrTmp, lastNodeTempData);
        addLastNodes(nodes, viewContainer, TEMPLATE_ITEM, itmTmp, lastNodeTempData);
        addLastNodes(nodes, viewContainer, TEMPLATE_FOOTER, ftrTmp, lastNodeTempData);
    }
    return madeChanges;
}
function addLastNodes(nodes, viewContainer, templateType, templateRef, temporaryData) {
    if (templateRef) {
        var node = {
            tmpl: templateType,
            view: viewContainer.createEmbeddedView(templateRef),
            isLastRecord: true,
            hidden: true
        };
        node.view.context.$implicit = temporaryData;
        nodes.push(node);
    }
}
/**
 * DOM READ THEN DOM WRITE
 */
export function initReadNodes(nodes, cells, data) {
    if (nodes.length && cells.length) {
        // first node
        // ******** DOM READ ****************
        var firstEle = getElement(nodes[0]);
        cells[0].top = firstEle.clientTop;
        cells[0].left = firstEle.clientLeft;
        cells[0].row = 0;
        // ******** DOM READ ****************
        updateDimensions(nodes, cells, data, true);
        // ******** DOM READS ABOVE / DOM WRITES BELOW ****************
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].hidden) {
                // ******** DOM WRITE ****************
                getElement(nodes[i]).classList.add('virtual-hidden');
            }
        }
    }
}
/**
 * DOM READ
 */
export function updateDimensions(nodes, cells, data, initialUpdate) {
    var node = void 0;
    var element = void 0;
    var totalCells = cells.length;
    var cell = void 0;
    var previousCell = void 0;
    for (var i = 0; i < nodes.length; i++) {
        node = nodes[i];
        cell = cells[node.cell];
        // read element dimensions if they haven't been checked enough times
        if (cell && cell.reads < REQUIRED_DOM_READS && !node.hidden) {
            element = getElement(node);
            // ******** DOM READ ****************
            readElements(cell, element);
            if (initialUpdate) {
                // update estimated dimensions with more accurate dimensions
                if (cell.tmpl === TEMPLATE_HEADER) {
                    data.hdrHeight = cell.height;
                    if (cell.left === 0) {
                        data.hdrWidth = cell.width;
                    }
                } else if (cell.tmpl === TEMPLATE_FOOTER) {
                    data.ftrHeight = cell.height;
                    if (cell.left === 0) {
                        data.ftrWidth = cell.width;
                    }
                } else {
                    data.itmHeight = cell.height;
                    if (cell.left === 0) {
                        data.itmWidth = cell.width;
                    }
                }
            }
            cell.reads++;
        }
    }
    // figure out which cells are currently viewable within the viewport
    var viewableBottom = data.scrollTop + data.viewHeight;
    data.topViewCell = totalCells;
    data.bottomViewCell = 0;
    // completely realign position to ensure they're all accurately placed
    for (var i = 1; i < totalCells; i++) {
        cell = cells[i];
        previousCell = cells[i - 1];
        if (previousCell.left + previousCell.width + cell.width > data.viewWidth) {
            // new row
            cell.row++;
            cell.top = previousCell.top + previousCell.height;
            cell.left = 0;
        } else {
            // same row
            cell.row = previousCell.row;
            cell.top = previousCell.top;
            cell.left = previousCell.left + previousCell.width;
        }
        // figure out which cells are viewable within the viewport
        if (cell.top + cell.height > data.scrollTop && i < data.topViewCell) {
            data.topViewCell = i;
        } else if (cell.top < viewableBottom && i > data.bottomViewCell) {
            data.bottomViewCell = i;
        }
    }
}
/**
 * DOM READ
 */
function readElements(cell, element) {
    // ******** DOM READ ****************
    var styles = window.getComputedStyle(element);
    // ******** DOM READ ****************
    cell.left = element.offsetLeft - parseFloat(styles.marginLeft);
    // ******** DOM READ ****************
    cell.width = element.offsetWidth + parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    // ******** DOM READ ****************
    cell.height = element.offsetHeight + parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
}
/**
 * DOM WRITE
 */
export function writeToNodes(nodes, cells, totalRecords) {
    var node = void 0;
    var element = void 0;
    var cell = void 0;
    var totalCells = Math.max(totalRecords, cells.length).toString();
    var transform = void 0;
    for (var i = 0, ilen = nodes.length; i < ilen; i++) {
        node = nodes[i];
        if (!node.hidden) {
            cell = cells[node.cell];
            transform = 'translate3d(' + cell.left + 'px,' + cell.top + 'px,0px)';
            if (node.lastTransform !== transform) {
                element = getElement(node);
                if (element) {
                    // ******** DOM WRITE ****************
                    element.style[CSS.transform] = node.lastTransform = transform;
                    // ******** DOM WRITE ****************
                    element.classList.add('virtual-position');
                    if (node.isLastRecord) {
                        // its the last record, now with data and safe to show
                        // ******** DOM WRITE ****************
                        element.classList.remove('virtual-hidden');
                    }
                    // https://www.w3.org/TR/wai-aria/states_and_properties#aria-posinset
                    // ******** DOM WRITE ****************
                    element.setAttribute('aria-posinset', (node.cell + 1).toString());
                    // https://www.w3.org/TR/wai-aria/states_and_properties#aria-setsize
                    // ******** DOM WRITE ****************
                    element.setAttribute('aria-setsize', totalCells);
                }
            }
        }
    }
}
/**
 * NO DOM
 */
export function adjustRendered(cells, data) {
    // figure out which cells should be rendered
    var cell = void 0;
    var lastRow = -1;
    var cellsRenderHeight = 0;
    var maxRenderHeight = data.renderHeight - data.itmHeight;
    var totalCells = cells.length;
    var viewableRenderedPadding = data.itmHeight < 90 ? VIEWABLE_RENDERED_PADDING : 0;
    if (data.scrollDiff > 0) {
        // scrolling down
        data.topCell = Math.max(data.topViewCell - viewableRenderedPadding, 0);
        data.bottomCell = Math.min(data.topCell + 2, totalCells - 1);
        for (var i = data.topCell; i < totalCells; i++) {
            cell = cells[i];
            if (cell.row !== lastRow) {
                cellsRenderHeight += cell.height;
                lastRow = cell.row;
            }
            if (i > data.bottomCell) {
                data.bottomCell = i;
            }
            if (cellsRenderHeight >= maxRenderHeight) {
                break;
            }
        }
    } else {
        // scroll up
        data.bottomCell = Math.min(data.bottomViewCell + viewableRenderedPadding, totalCells - 1);
        data.topCell = Math.max(data.bottomCell - 2, 0);
        for (var i = data.bottomCell; i >= 0; i--) {
            cell = cells[i];
            if (cell.row !== lastRow) {
                cellsRenderHeight += cell.height;
                lastRow = cell.row;
            }
            if (i < data.topCell) {
                data.topCell = i;
            }
            if (cellsRenderHeight >= maxRenderHeight) {
                break;
            }
        }
    }
    // console.log(`adjustRendered topCell: ${data.topCell}, bottomCell: ${data.bottomCell}, cellsRenderHeight: ${cellsRenderHeight}, data.renderHeight: ${data.renderHeight}`);
}
/**
 * NO DOM
 */
export function getVirtualHeight(totalRecords, lastCell) {
    if (lastCell.record >= totalRecords - 1) {
        return lastCell.top + lastCell.height;
    }
    var unknownRecords = totalRecords - lastCell.record - 1;
    var knownHeight = lastCell.top + lastCell.height;
    return Math.ceil(knownHeight + knownHeight / (totalRecords - unknownRecords) * unknownRecords);
}
/**
 * NO DOM
 */
export function estimateHeight(totalRecords, lastCell, existingHeight, difference) {
    var newHeight = getVirtualHeight(totalRecords, lastCell);
    var percentToBottom = lastCell.record / (totalRecords - 1);
    var diff = Math.abs(existingHeight - newHeight);
    if (diff > newHeight * difference || percentToBottom > .995) {
        return newHeight;
    }
    return existingHeight;
}
/**
 * DOM READ
 */
export function calcDimensions(data, viewportElement, approxItemWidth, approxItemHeight, appoxHeaderWidth, approxHeaderHeight, approxFooterWidth, approxFooterHeight, bufferRatio) {
    // get the parent container's viewport height
    // ******** DOM READ ****************
    data.viewWidth = viewportElement.offsetWidth;
    // ******** DOM READ ****************
    data.viewHeight = viewportElement.offsetHeight;
    // the height we'd like to render, which is larger than viewable
    data.renderHeight = data.viewHeight * bufferRatio;
    if (data.viewWidth > 0 && data.viewHeight > 0) {
        data.itmWidth = calcWidth(data.viewWidth, approxItemWidth);
        data.itmHeight = calcHeight(data.viewHeight, approxItemHeight);
        data.hdrWidth = calcWidth(data.viewWidth, appoxHeaderWidth);
        data.hdrHeight = calcHeight(data.viewHeight, approxHeaderHeight);
        data.ftrWidth = calcWidth(data.viewWidth, approxFooterWidth);
        data.ftrHeight = calcHeight(data.viewHeight, approxFooterHeight);
        data.valid = true;
    }
}
/**
 * NO DOM
 */
function calcWidth(viewportWidth, approxWidth) {
    if (approxWidth.indexOf('%') > 0) {
        return viewportWidth * (parseFloat(approxWidth) / 100);
    } else if (approxWidth.indexOf('px') > 0) {
        return parseFloat(approxWidth);
    }
    throw 'virtual scroll width can only use "%" or "px" units';
}
/**
 * NO DOM
 */
function calcHeight(viewportHeight, approxHeight) {
    if (approxHeight.indexOf('px') > 0) {
        return parseFloat(approxHeight);
    }
    throw 'virtual scroll height must use "px" units';
}
/**
 * NO DOM
 */
function getElement(node) {
    var rootNodes = node.view.rootNodes;
    for (var i = 0; i < rootNodes.length; i++) {
        if (rootNodes[i].nodeType === 1) {
            return rootNodes[i];
        }
    }
    return null;
}
export var VirtualContext = function () {
    function VirtualContext($implicit, index, count) {
        _classCallCheck(this, VirtualContext);

        this.$implicit = $implicit;
        this.index = index;
        this.count = count;
    }

    _createClass(VirtualContext, [{
        key: 'first',
        get: function get() {
            return this.index === 0;
        }
    }, {
        key: 'last',
        get: function get() {
            return this.index === this.count - 1;
        }
    }, {
        key: 'even',
        get: function get() {
            return this.index % 2 === 0;
        }
    }, {
        key: 'odd',
        get: function get() {
            return !this.even;
        }
    }]);

    return VirtualContext;
}();
var TEMPLATE_ITEM = 0;
var TEMPLATE_HEADER = 1;
var TEMPLATE_FOOTER = 2;
var VIEWABLE_RENDERED_PADDING = 3;
var REQUIRED_DOM_READS = 2;