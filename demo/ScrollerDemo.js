/**
 * Scroller Component Demo for tingle
 * @auther caoke.ck
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
var Scroller = require('../src');
var GroupList = require('tingle-group-list');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleScrollEnd(scroller) {
        var { x, y } = scroller;
        console.log({ x, y });
    }

    render() {
        return (
            <Scroller mouseWheel={true} onScrollEnd={this.handleScrollEnd.bind(this)}>
                <GroupList title={"列表标题1"}>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                </GroupList>
                <GroupList title={"列表标题2"}>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                    <div className="tLH44 tPL10">aa</div>
                </GroupList>
            </Scroller>
        );
    }
};

module.exports = Demo;