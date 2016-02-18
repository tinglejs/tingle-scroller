/**
 * Scroller Component Demo for tingle
 * @author gbk
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */
require('tingle-context');
window.FastClick && FastClick.attach(document.body);
var Demo = require('./ScrollerDemo');
ReactDOM.render(<Demo/>, document.getElementById('TingleDemo'));
