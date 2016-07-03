// fake data
var data = [
    {id: 1, author: "User1", text: "Argument1 text sasadasf asfjhhasjfhas fhjsabfjkashkjf asjkfa"},
    {id: 2, author: "User2", text: "Argument2 text"},
    {id: 3, author: "User1", text: "Argument3 text"}
];

var Argument = React.createClass({
    render: function() {
        return (
            <div data-id={this.props.children.id} className="argumentNode text-center">
                <p>{this.props.children.text}</p>
            </div>
        );
    }
});


var ArgumentRateList = React.createClass({
    render: function() {
        var argumentNodes = this.props.data.map(function(argument) {
            return (
                <Argument key={argument.id}>{argument}</Argument>
            )
        });

        return (
            <Grid>
                <Row>
                    <Col xs={6}>
                        <div id="argument_unordered_list">
                            {argumentNodes}
                        </div>
                    </Col>
                    <Col xs={6}>
                        <div id="argument_rate_list">
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} xsOffset={6}>
                        <div id="trash">
                        </div>
                    </Col>
                </Row>
            </Grid>
        )
    }
});

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

ReactDOM.render(
    <ArgumentRateList data={data}/>,
    document.getElementById('arguments')
);

var drake = dragula([
    document.getElementById('argument_unordered_list'),
    document.getElementById('argument_rate_list'),
    document.getElementById('trash')
]);

drake.on("drop", function(el, container, source) {
    console.log(container.id);
    if (container.id == "trash") {
        el.parentNode.removeChild(el);
    }
});
