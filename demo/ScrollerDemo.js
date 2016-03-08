/**
 * Scroller Component Demo for tingle
 * @author gbk
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
let Scroller = require('../src');
let GroupList = require('tingle-group-list');

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
            <Scroller className="page" mouseWheel={true} onScrollEnd={this.handleScrollEnd.bind(this)}>
                <GroupList title={"列表标题1"}>
                    <div className="tFBH">
                        {/*横向滚动 DEMO*/}
                        <Scroller className="tFB1" scrollX={true} scrollY={false}>
                            <div className="tLH44 nowrap">
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                                我可以横向滚动
                            </div>
                        </Scroller>
                    </div>
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
}
module.exports = Demo;
