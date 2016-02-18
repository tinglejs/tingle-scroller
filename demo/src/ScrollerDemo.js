/**
 * Scroller Component Demo for tingle
 * @author gbk
 *
 * Copyright 2014-2016, Tingle Team.
 * All rights reserved.
 */

let Scroller = require('../../src');
let GroupList = require('tingle-group-list');
let Group = require('tingle-group');

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    handleScrollEnd(scroller) {
        let { x, y } = scroller;
        console.log({ x, y });
    }

    render() {
        return (
            <Scroller mouseWheel={true} onScrollEnd={this.handleScrollEnd.bind(this)}>
                <Group>
                    <Group.Head>{"列表标题1"}</Group.Head>
                    <Group.List>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                    </Group.List>
                    <Group.Head>{"列表标题2"}</Group.Head>
                    <Group.List>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                        <div className="tLH44 tPL10">aa</div>
                    </Group.List>
                </Group>
            </Scroller>
        );
    }
}
module.exports = Demo;