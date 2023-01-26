import React from "react";

export class Test extends React.Component {
constructor() {
    super();
    this.state = {
    value: 0
    };
}
shouldComponentUpdate(nextProps,nextState) {
    if (nextState.value > 5) return false;
    return true;
}
componentDidMount() {
    setInterval(() => {
    this.setState((prevState) => {
        //console.log('ff',prevState.value);
        return {
        value: prevState.value + 1
        };
    });
    });
}
render() {
    console.log('here',this.state.value);
    return <div>{this.state.value} fh</div>;
}
}

export default Test