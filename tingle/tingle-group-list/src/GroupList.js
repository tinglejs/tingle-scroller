/**
 * GroupList Component for tingle
 * @author gnosaij
 *
 * Copyright 2014-2015, Tingle Team, Alinw.
 * All rights reserved.
 */
var classnames = require('classnames');

class GroupList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var t = this;
        var items = React.Children.map(this.props.children ,function (Item, index) {
            return <li className="tGroupListItem">{Item}</li>;
        });

        return (
            <div>
                <h4 className="tFS12 tLH1_5 tPL10 tPR10 tOmit">{t.props.title}</h4>
                <ul className={classnames({
                    tGroupList: true,
                    [t.props.className]: !!t.props.className
                })} style={{
                    paddingLeft: t.props.itemIndent
                }}>
                    {items}
                </ul>
            </div>
        );
    }
}

GroupList.propTypes = {
    itemIndent: React.PropTypes.number
}

GroupList.defaultProps = {
    itemIndent: 0
}

module.exports = GroupList;
