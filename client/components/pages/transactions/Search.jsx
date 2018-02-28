import React, { Component } from 'react';
import SearchInput from 'grommet/components/SearchInput';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      suggestions: [],
      filtered: [],
    }
    this.handleInput = this.handleInput.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.transactions) {
      let suggestions = nextProps.transactions.map(a => {
        return a.name;
      })
      suggestions = Array.from(new Set(suggestions));
      this.setState({
        suggestions,
        filtered: suggestions,
      })
    }
  }

  handleInput(e) {
    e.preventDefault();
    e.charCode == 13 ? this.props.search(searchString): null;
    let suggestions = this.state.suggestions;
    let filtered = suggestions.filter(a => a.toLowerCase().includes(e.target.value));
    this.setState({
      searchString: e.target.value,
      filtered
    })
  }

  render() {
    return (
      <div style={{float: 'right', position:'relative', display:'inline'}}>
        <SearchInput placeHolder='Search' 
         value={this.state.searchString}
         onDOMChange={ this.handleInput }
         onSelect={({ suggestion }) => {
          this.props.search(suggestion) 
        }}
         onSearch={()=>console.log('he')}
         suggestions={ this.state.filtered }/>
      </div>
    )
  }
}