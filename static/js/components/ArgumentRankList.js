// fake data
var data = [
    {id: 1, author: "User1", text: "Argument1 text"},
    {id: 2, author: "User2", text: "Argument2 text"},
    {id: 3, author: "User1", text: "Argument3 text"}
];

var Argument = React.createClass({
    render: function() {
        return (
            <div>
                <p>{this.props.children}</p>
            </div>
        );
    }
});

var ArgumentRankList = React.createClass({
    getInitialState: function() {
        return {argument_index: 1};
    },
    next_argument: function() {
        for (var i=0; i < this.state.argument_index; i++) {
            if (!data[i].select || !data[i].rate) return;
            if (data[i].rate == "not_valid" && !data[i].not_valid) return;
        }

        this.setState(function(previousState, currentProps) {
            return {argument_index: previousState.argument_index + 1};
        });
    },
    handleSlider: function(id, e) {
        e.preventDefault();
        // TODO: search by id
        data[id-1].select = e.target.value;
        this.next_argument();
    },
    handleSupport: function(id, rate, e) {
        e.preventDefault();
        // TODO: search by id
        data[id-1].rate = rate;
        $('div.row[data-key="'+id+'"] .slider div').removeClass("selected");
        $(e.currentTarget).addClass("selected");
        this.next_argument();
        // re-render component
        this.forceUpdate();
    },
    handleNotValid: function(id, e) {
        e.preventDefault();
        data[id-1].not_valid = e.target.value;
        this.next_argument();
    },
    render: function() {
        var _this = this;

        var nextBtn;
        if (this.state.argument_index > data.length) {
            nextBtn = <Button>Rate arguments</Button>
        }

        var argumentNodes = this.props.data
            .slice(0, this.state.argument_index).map(function(argument) {


            var not_valid_select, layout;
            if (argument.rate == "not_valid") {
                layout = [{sm: 12, md: 4},{sm: 6, md: 2},{sm: 12, md: 4}];
                not_valid_select = (
                    <Col sm={6} md={2}>
                        <FormControl style={{height: '50px', backgroundColor: '#ccc', color: '#989898', marginBottom: '10px'}} componentClass="select" onChange={_this.handleNotValid.bind(this,argument.id)}>
                            <option value="" disabled selected style={{display: 'none'}}>...</option>
                            <option value="option1">Option1</option>
                            <option value="option2">Option2</option>
                        </FormControl>
                    </Col>
                );
            } else {
                layout = [{sm: 6, md: 6},{sm: 6, md: 2},{sm: 12, md: 4}];
                not_valid_select = null;
                if (argument.not_valid) {
                    delete argument.not_valid;
                }
            }
            
            return (
                <Row style={{marginBottom: '20px', minHeight: '50px'}} data-key={argument.id}>
                    <Col sm={layout[0].sm} md={layout[0].md} className="argumentNode text-center" style={{marginBottom: '10px'}}>
                        <Argument key={argument.id}>{argument.text}</Argument>
                    </Col>
                    <Col sm={layout[1].sm} md={layout[1].md}>
                        <FormControl style={{height: '50px', backgroundColor: '#ccc', color: '#989898', marginBottom: '10px'}} componentClass="select" onChange={_this.handleSlider.bind(this,argument.id)}>
                            <option value="" disabled selected style={{display: 'none'}}>...</option>
                            <option value="support">Supporting</option>
                            <option value="against">Against</option>
                        </FormControl>
                    </Col>
                    {not_valid_select}
                    <Col sm={layout[2].sm} md={layout[2].md}>
                        <div className="slider_labels text-center">
                            <div>Not valid</div>
                            <div>Irrelevant</div>
                            <div>Weak</div>
                            <div>Okay</div>
                            <div>Strong</div>
                        </div>
                        <div style={{position: 'relative'}} className="slider">
                            <div className="slider_track"></div>
                            <div className="not_valid_rate" onClick={_this.handleSupport.bind(this,argument.id, 'not_valid')}></div>
                            <div className="irrelevant_rate" onClick={_this.handleSupport.bind(this,argument.id, 'irrelevant')}></div>
                            <div className="weak_rate" onClick={_this.handleSupport.bind(this,argument.id, 'weak')}></div>
                            <div className="okay_rate" onClick={_this.handleSupport.bind(this,argument.id, 'okay')}></div>
                            <div className="strong_rate" onClick={_this.handleSupport.bind(this,argument.id, 'strong')}></div>
                        </div>
                    </Col>
                </Row>
            );
        });

        return (
            <Grid>
                {argumentNodes}
                <Row>
                    <Col xs={12} className="text-center">
                        {nextBtn}
                    </Col>
                </Row>
            </Grid>
        )
    }
});

var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Button = ReactBootstrap.Button;

var FormControl = ReactBootstrap.FormControl;

ReactDOM.render(
    <ArgumentRankList data={data}/>,
    document.getElementById('argument_list')
);
