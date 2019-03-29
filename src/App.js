import React, { PureComponent } from "react";
import "./App.css";
import {
    TextInput,
    Row,
    Col,
    Collection,
    CollectionItem
} from "react-materialize";

class App extends PureComponent {
    state = {
        value: "",
        filteredNames: ["Loading names..."]
    };

    // Getting data from the names.json and setting the state
    componentDidMount() {
        const postPromise = fetch("./names.json");
        postPromise
            .then(response => {
                return response.json();
            })
            .then(names => {
                //this.names = names;
                this.setState({ filteredNames: names });
            });
    }

    // Putting the input value inside the state
    handleChange = e => {
        const value = e.target.value;
        this.setState({ value });
    };
    render() {
        return (
            <div className="App">
                <TextInput
                    placeholder="Search Names"
                    onChange={this.handleChange}
                />
                <Row className="name-list-container">
                    <Col m={12} s={12}>
                        <Collection>
                            {/* Bad performance when rendering all items */}
                            {this.state.filteredNames
                                .filter(name =>
                                    name
                                        .toUpperCase()
                                        .includes(
                                            this.state.value.toUpperCase()
                                        )
                                )
                                .map((name, i) => (
                                    <CollectionItem key={name + i} href="#">
                                        {name}
                                    </CollectionItem>
                                ))}
                        </Collection>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default App;
